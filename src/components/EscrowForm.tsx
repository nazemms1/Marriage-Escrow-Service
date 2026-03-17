import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useForm } from '@mantine/form'
import {
  Stack,
  SimpleGrid,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Checkbox,
  Button,
  Box,
  Text,
  Alert,
} from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { FormSection } from './FormSection'
import { SuccessScreen } from './SuccessScreen'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

interface FormValues {
  // Groom
  groomName: string
  groomDob: string
  groomNationality: string
  groomId: string
  groomPhone: string
  groomEmail: string
  groomAddress: string
  // Bride
  brideName: string
  brideDob: string
  brideNationality: string
  brideId: string
  bridePhone: string
  brideEmail: string
  brideAddress: string
  // Marriage Details
  marriageDate: string
  marriageLocation: string
  contractType: string
  mahrAmount: number | ''
  deferredMahrAmount: number | ''
  // Escrow Conditions
  conditions: string
  financialTerms: string
  priorAgreements: string
  // Witnesses
  witness1Name: string
  witness1Phone: string
  witness2Name: string
  witness2Phone: string
  // Submission
  submitterRole: string
  submitterName: string
  submitterPhone: string
  submitterEmail: string
  additionalNotes: string
  consent: boolean
}

const phoneRegex = /^[+\d\s\-(). ]{7,25}$/

const inputStyles = {
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 600 as const,
    color: '#1e2b4a',
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    marginBottom: '5px',
  },
  input: {
    borderColor: '#e2d9cc',
    borderRadius: '6px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '15px',
    color: '#2a2a3e',
    backgroundColor: '#ffffff',
  },
}

export function EscrowForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    initialValues: {
      groomName: '', groomDob: '', groomNationality: '', groomId: '',
      groomPhone: '', groomEmail: '', groomAddress: '',
      brideName: '', brideDob: '', brideNationality: '', brideId: '',
      bridePhone: '', brideEmail: '', brideAddress: '',
      marriageDate: '', marriageLocation: '', contractType: '',
      mahrAmount: '', deferredMahrAmount: '',
      conditions: '', financialTerms: '', priorAgreements: '',
      witness1Name: '', witness1Phone: '', witness2Name: '', witness2Phone: '',
      submitterRole: '', submitterName: '', submitterPhone: '', submitterEmail: '',
      additionalNotes: '', consent: false,
    },
    validate: {
      groomName: (v) => v.trim().length < 2 ? 'Full name is required (min 2 characters)' : null,
      groomPhone: (v) => v && !phoneRegex.test(v) ? 'Enter a valid phone number' : null,
      groomEmail: (v) => v && !/^\S+@\S+\.\S+$/.test(v) ? 'Enter a valid email address' : null,
      brideName: (v) => v.trim().length < 2 ? 'Full name is required (min 2 characters)' : null,
      bridePhone: (v) => v && !phoneRegex.test(v) ? 'Enter a valid phone number' : null,
      brideEmail: (v) => v && !/^\S+@\S+\.\S+$/.test(v) ? 'Enter a valid email address' : null,
      marriageDate: (v) => !v ? 'Proposed marriage date is required' : null,
      contractType: (v) => !v ? 'Please select a contract type' : null,
      conditions: (v) => v.trim().length < 20 ? 'Please describe the conditions in detail (min 20 characters)' : null,
      submitterRole: (v) => !v ? 'Please select your role' : null,
      submitterName: (v) => v.trim().length < 2 ? 'Your full name is required' : null,
      submitterPhone: (v) => !phoneRegex.test(v) ? 'Enter a valid phone number' : null,
      submitterEmail: (v) => !/^\S+@\S+\.\S+$/.test(v) ? 'Enter a valid email address' : null,
      consent: (v) => !v ? 'You must confirm the accuracy of the information to proceed' : null,
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    setSendError(null)

    const templateParams = {
      submission_date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      // Groom
      groom_name: values.groomName,
      groom_dob: values.groomDob || '—',
      groom_nationality: values.groomNationality || '—',
      groom_id: values.groomId || '—',
      groom_phone: values.groomPhone || '—',
      groom_email: values.groomEmail || '—',
      groom_address: values.groomAddress || '—',
      // Bride
      bride_name: values.brideName,
      bride_dob: values.brideDob || '—',
      bride_nationality: values.brideNationality || '—',
      bride_id: values.brideId || '—',
      bride_phone: values.bridePhone || '—',
      bride_email: values.brideEmail || '—',
      bride_address: values.brideAddress || '—',
      // Marriage
      marriage_date: values.marriageDate,
      marriage_location: values.marriageLocation || '—',
      contract_type: values.contractType,
      mahr_amount: values.mahrAmount !== '' ? String(values.mahrAmount) : '—',
      deferred_mahr: values.deferredMahrAmount !== '' ? String(values.deferredMahrAmount) : '—',
      // Conditions
      conditions: values.conditions,
      financial_terms: values.financialTerms || '—',
      prior_agreements: values.priorAgreements || '—',
      // Witnesses
      witness1_name: values.witness1Name || '—',
      witness1_phone: values.witness1Phone || '—',
      witness2_name: values.witness2Name || '—',
      witness2_phone: values.witness2Phone || '—',
      // Submitter
      submitter_role: values.submitterRole,
      submitter_name: values.submitterName,
      submitter_phone: values.submitterPhone,
      submitter_email: values.submitterEmail,
      additional_notes: values.additionalNotes || '—',
      // Recipient
      to_email: 'nazem.msouti@gmail.com',
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      setSubmitted(true)
    } catch {
      setSendError('Failed to send the form. Please check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <SuccessScreen
        submitterName={form.values.submitterName}
        onReset={() => { form.reset(); setSubmitted(false) }}
      />
    )
  }

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ padding: '40px 24px 64px', maxWidth: '780px', margin: '0 auto' }}
    >
      <Stack gap={24}>
        {/* Section 01 — Groom */}
        <FormSection number="01" title="Groom's Information">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Full Legal Name"
              placeholder="Enter full name"
              required
              styles={inputStyles}
              {...form.getInputProps('groomName')}
            />
            <TextInput
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              styles={inputStyles}
              {...form.getInputProps('groomDob')}
            />
            <TextInput
              label="Nationality"
              placeholder="e.g. Jordanian"
              styles={inputStyles}
              {...form.getInputProps('groomNationality')}
            />
            <TextInput
              label="National ID / Passport No."
              placeholder="ID or passport number"
              styles={inputStyles}
              {...form.getInputProps('groomId')}
            />
            <TextInput
              label="Phone Number"
              placeholder="+962 7x xxx xxxx"
              styles={inputStyles}
              {...form.getInputProps('groomPhone')}
            />
            <TextInput
              label="Email Address"
              placeholder="groom@example.com"
              type="email"
              styles={inputStyles}
              {...form.getInputProps('groomEmail')}
            />
          </SimpleGrid>
          <Textarea
            label="Current Address"
            placeholder="Full residential address"
            minRows={2}
            styles={inputStyles}
            {...form.getInputProps('groomAddress')}
          />
        </FormSection>

        {/* Section 02 — Bride */}
        <FormSection number="02" title="Bride's Information">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Full Legal Name"
              placeholder="Enter full name"
              required
              styles={inputStyles}
              {...form.getInputProps('brideName')}
            />
            <TextInput
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              styles={inputStyles}
              {...form.getInputProps('brideDob')}
            />
            <TextInput
              label="Nationality"
              placeholder="e.g. Jordanian"
              styles={inputStyles}
              {...form.getInputProps('brideNationality')}
            />
            <TextInput
              label="National ID / Passport No."
              placeholder="ID or passport number"
              styles={inputStyles}
              {...form.getInputProps('brideId')}
            />
            <TextInput
              label="Phone Number"
              placeholder="+962 7x xxx xxxx"
              styles={inputStyles}
              {...form.getInputProps('bridePhone')}
            />
            <TextInput
              label="Email Address"
              placeholder="bride@example.com"
              type="email"
              styles={inputStyles}
              {...form.getInputProps('brideEmail')}
            />
          </SimpleGrid>
          <Textarea
            label="Current Address"
            placeholder="Full residential address"
            minRows={2}
            styles={inputStyles}
            {...form.getInputProps('brideAddress')}
          />
        </FormSection>

        {/* Section 03 — Marriage Details */}
        <FormSection number="03" title="Marriage Details">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Proposed Marriage Date"
              placeholder="DD/MM/YYYY"
              required
              styles={inputStyles}
              {...form.getInputProps('marriageDate')}
            />
            <TextInput
              label="Marriage Location / City"
              placeholder="e.g. Amman, Jordan"
              styles={inputStyles}
              {...form.getInputProps('marriageLocation')}
            />
            <Select
              label="Type of Marriage Contract"
              placeholder="Select contract type"
              required
              data={['Civil', 'Religious', 'Civil & Religious']}
              styles={inputStyles}
              {...form.getInputProps('contractType')}
            />
          </SimpleGrid>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <NumberInput
              label="Mahr (Dowry) Amount — JOD"
              placeholder="0"
              min={0}
              styles={inputStyles}
              {...form.getInputProps('mahrAmount')}
            />
            <NumberInput
              label="Deferred Mahr Amount — JOD"
              placeholder="0"
              min={0}
              styles={inputStyles}
              {...form.getInputProps('deferredMahrAmount')}
            />
          </SimpleGrid>
        </FormSection>

        {/* Section 04 — Escrow Conditions */}
        <FormSection number="04" title="Escrow Conditions &amp; Agreements">
          <Textarea
            label="Special Conditions / Stipulations"
            placeholder="Describe all conditions and stipulations to be registered under this escrow arrangement..."
            required
            minRows={5}
            styles={inputStyles}
            {...form.getInputProps('conditions')}
          />
          <Textarea
            label="Agreed Financial Terms"
            placeholder="Any financial arrangements, obligations, or terms agreed upon by both parties..."
            minRows={3}
            styles={inputStyles}
            {...form.getInputProps('financialTerms')}
          />
          <Textarea
            label="Pre-existing Agreements to Reference"
            placeholder="Reference to any prior agreements, contracts, or documents relevant to this escrow..."
            minRows={2}
            styles={inputStyles}
            {...form.getInputProps('priorAgreements')}
          />
        </FormSection>

        {/* Section 05 — Witnesses */}
        <FormSection number="05" title="Witnesses">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <TextInput
              label="Witness 1 — Full Name"
              placeholder="Full legal name"
              styles={inputStyles}
              {...form.getInputProps('witness1Name')}
            />
            <TextInput
              label="Witness 1 — Phone Number"
              placeholder="+962 7x xxx xxxx"
              styles={inputStyles}
              {...form.getInputProps('witness1Phone')}
            />
            <TextInput
              label="Witness 2 — Full Name"
              placeholder="Full legal name"
              styles={inputStyles}
              {...form.getInputProps('witness2Name')}
            />
            <TextInput
              label="Witness 2 — Phone Number"
              placeholder="+962 7x xxx xxxx"
              styles={inputStyles}
              {...form.getInputProps('witness2Phone')}
            />
          </SimpleGrid>
        </FormSection>

        {/* Section 06 — Submission */}
        <FormSection number="06" title="Submission Details">
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Select
              label="Submitting Party"
              placeholder="Select your role"
              required
              data={['Groom', 'Bride', 'Family Representative', 'Legal Counsel', 'Other']}
              styles={inputStyles}
              {...form.getInputProps('submitterRole')}
            />
            <TextInput
              label="Your Full Name"
              placeholder="Full legal name"
              required
              styles={inputStyles}
              {...form.getInputProps('submitterName')}
            />
            <TextInput
              label="Your Phone Number"
              placeholder="+962 7x xxx xxxx"
              required
              styles={inputStyles}
              {...form.getInputProps('submitterPhone')}
            />
            <TextInput
              label="Your Email Address"
              placeholder="your@email.com"
              type="email"
              required
              styles={inputStyles}
              {...form.getInputProps('submitterEmail')}
            />
          </SimpleGrid>
          <Textarea
            label="Additional Notes"
            placeholder="Any additional information or remarks..."
            minRows={3}
            styles={inputStyles}
            {...form.getInputProps('additionalNotes')}
          />

          {/* Consent */}
          <Box
            style={{
              background: 'rgba(30,43,74,0.04)',
              border: '1px solid #e2d9cc',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <Checkbox
              label="I confirm that all information provided in this form is accurate and complete, and I consent to it being processed by the escrow agents Bisher Alhasani Aljazaeri and Judy Alqabbani."
              styles={{
                label: {
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#2a2a3e',
                  lineHeight: 1.6,
                  cursor: 'pointer',
                },
                input: {
                  cursor: 'pointer',
                  borderColor: '#c9a84c',
                },
              }}
              {...form.getInputProps('consent', { type: 'checkbox' })}
            />
            {form.errors.consent && (
              <Text style={{ color: '#c0392b', fontSize: '13px', marginTop: '8px' }}>
                {form.errors.consent}
              </Text>
            )}
          </Box>
        </FormSection>

        {/* Error alert */}
        {sendError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="red"
            radius="md"
            style={{ borderLeft: '4px solid #c0392b' }}
          >
            {sendError}
          </Alert>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          loading={loading}
          size="lg"
          fullWidth
          style={{
            background: 'linear-gradient(135deg, #1e2b4a 0%, #2c3e6b 100%)',
            color: '#e8d5a3',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            height: '56px',
            borderRadius: '8px',
            border: '1px solid rgba(201,168,76,0.3)',
            transition: 'opacity 0.2s ease',
          }}
          styles={{
            root: {
              '&:hover': { opacity: 0.92 },
            },
          }}
        >
          Submit Escrow Form
        </Button>

        <Text style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
          This form is confidential and will be delivered directly to the escrow agents.
        </Text>
      </Stack>
    </Box>
  )
}
