import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useForm } from '@mantine/form'
import {
  Stack,
  SimpleGrid,
  TextInput,
  Textarea,
  Checkbox,
  Button,
  Box,
  Text,
  Alert,
  Divider,
  Paper,
  Title,
  Group,
  ThemeIcon,
} from '@mantine/core'
import { IconAlertCircle, IconPhone, IconUser } from '@tabler/icons-react'
import { FormSection } from './FormSection'
import { SuccessScreen } from './SuccessScreen'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

interface FormValues {
  brideName: string
  brideDob: string
  brideNationality: string
  bridePhone: string
  brideEmail: string
  brideAddress: string
  requirements: string
  consent: boolean
}

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
      brideName: '',
      brideDob: '',
      brideNationality: '',
      bridePhone: '',
      brideEmail: '',
      brideAddress: '',
      requirements: '',
      consent: false,
    },
    validate: {
      brideName: (v) => v.trim().length < 2 ? 'Full name is required' : null,
      bridePhone: (v) => !v.trim() ? 'Phone number is required' : null,
      requirements: (v) => v.trim().length < 10 ? 'Please describe your requirements in more detail' : null,
      consent: (v) => !v ? 'You must confirm the information to proceed' : null,
    },
  })

  const handleSubmit = async (values: FormValues) => {
    setLoading(true)
    setSendError(null)

    const templateParams = {
      submission_date: new Date().toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      }),
      bride_name: values.brideName,
      bride_dob: values.brideDob || '—',
      bride_nationality: values.brideNationality || '—',
      bride_phone: values.bridePhone,
      bride_email: values.brideEmail || '—',
      bride_address: values.brideAddress || '—',
      requirements: values.requirements,
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
        submitterName={form.values.brideName}
        onReset={() => { form.reset(); setSubmitted(false) }}
      />
    )
  }

  return (
    <Box style={{ padding: '40px 24px 64px', maxWidth: '700px', margin: '0 auto' }}>
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Stack gap={24}>

          {/* Bride Information */}
          <FormSection number="01" title="بيانات العروس">
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <TextInput
                label="الاسم الكامل"
                placeholder="الاسم الرباعي"
                required
                styles={inputStyles}
                {...form.getInputProps('brideName')}
              />
              <TextInput
                label="تاريخ الميلاد"
                placeholder="DD/MM/YYYY"
                styles={inputStyles}
                {...form.getInputProps('brideDob')}
              />
              <TextInput
                label="الجنسية"
                placeholder="مثال: أردنية"
                styles={inputStyles}
                {...form.getInputProps('brideNationality')}
              />
              <TextInput
                label="رقم الهاتف"
                placeholder="+962 7x xxx xxxx"
                required
                styles={inputStyles}
                {...form.getInputProps('bridePhone')}
              />
              <TextInput
                label="البريد الإلكتروني"
                placeholder="example@email.com"
                type="email"
                styles={inputStyles}
                {...form.getInputProps('brideEmail')}
              />
              <TextInput
                label="العنوان"
                placeholder="مدينة السكن"
                styles={inputStyles}
                {...form.getInputProps('brideAddress')}
              />
            </SimpleGrid>
          </FormSection>

          {/* Requirements */}
          <FormSection number="02" title="المتطلبات والشروط">
            <Textarea
              label="اكتبي متطلباتك وشروطك"
              placeholder="اكتبي هنا جميع الشروط والمتطلبات التي تودّين تسجيلها..."
              required
              minRows={6}
              styles={inputStyles}
              {...form.getInputProps('requirements')}
            />
          </FormSection>

          {/* Mediators contact */}
          <Paper
            radius="md"
            p={0}
            style={{
              border: '1px solid rgba(201,168,76,0.35)',
              background: 'linear-gradient(135deg, rgba(30,43,74,0.04) 0%, rgba(201,168,76,0.06) 100%)',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                borderLeft: '4px solid #c9a84c',
                padding: '14px 20px',
                background: 'rgba(201,168,76,0.08)',
              }}
            >
              <Title
                order={3}
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '16px',
                  color: '#1e2b4a',
                  fontWeight: 600,
                }}
              >
                في حال وجود مشكلة؟
              </Title>
              <Text style={{ fontSize: '13px', color: '#6b6b8a', marginTop: '2px' }}>
                تواصلي مباشرة مع الوسطاء المعتمدين
              </Text>
            </Box>

            <Stack gap="sm" p={20}>
              <Group gap="md" align="flex-start">
                <ThemeIcon
                  size={40}
                  radius="50%"
                  style={{ background: 'linear-gradient(135deg, #1e2b4a, #2c3e6b)', flexShrink: 0 }}
                >
                  <IconUser size={18} color="#e8d5a3" />
                </ThemeIcon>
                <Box>
                  <Text style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, fontSize: '15px', color: '#1e2b4a' }}>
                    بشر الحسني الجزائري
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#6b6b8a' }}>وسيط معتمد — خدمات الضمان</Text>
                </Box>
              </Group>

              <Divider color="#e2d9cc" />

              <Group gap="md" align="flex-start">
                <ThemeIcon
                  size={40}
                  radius="50%"
                  style={{ background: 'linear-gradient(135deg, #1e2b4a, #2c3e6b)', flexShrink: 0 }}
                >
                  <IconUser size={18} color="#e8d5a3" />
                </ThemeIcon>
                <Box>
                  <Text style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, fontSize: '15px', color: '#1e2b4a' }}>
                    جودي القبّاني
                  </Text>
                  <Text style={{ fontSize: '13px', color: '#6b6b8a' }}>وسيط معتمد — خدمات الضمان</Text>
                </Box>
              </Group>

              <Box
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '4px',
                }}
              >
                <IconPhone size={16} color="#9a7a2e" />
                <Text style={{ fontSize: '13px', color: '#7a5c20', fontWeight: 500 }}>
                  سيتم التواصل معكِ خلال 24 ساعة من استلام الطلب
                </Text>
              </Box>
            </Stack>
          </Paper>

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
              label="أؤكد أن جميع المعلومات المقدمة صحيحة ودقيقة، وأوافق على معالجتها من قِبل الوسطاء المعتمدين."
              styles={{
                label: {
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: '#2a2a3e',
                  lineHeight: 1.7,
                  cursor: 'pointer',
                },
                input: { cursor: 'pointer', borderColor: '#c9a84c' },
              }}
              {...form.getInputProps('consent', { type: 'checkbox' })}
            />
            {form.errors.consent && (
              <Text style={{ color: '#c0392b', fontSize: '13px', marginTop: '8px' }}>
                {form.errors.consent}
              </Text>
            )}
          </Box>

          {sendError && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" radius="md">
              {sendError}
            </Alert>
          )}

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
            }}
          >
            إرسال الطلب
          </Button>

          <Text style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af' }}>
            هذا النموذج سري ويُرسل مباشرة إلى الوسطاء المعتمدين
          </Text>

        </Stack>
      </Box>
    </Box>
  )
}
