import { Box, Stack, Title, Text, ThemeIcon, Paper, Button } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'

interface SuccessScreenProps {
  submitterName: string
  onReset: () => void
}

export function SuccessScreen({ submitterName, onReset }: SuccessScreenProps) {
  return (
    <Box
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <Paper
        shadow="md"
        radius="lg"
        p={48}
        style={{
          maxWidth: '520px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid #e2d9cc',
          background: '#ffffff',
        }}
      >
        <Stack align="center" gap="lg">
          <ThemeIcon
            size={72}
            radius="50%"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #9a7a2e)',
              border: 'none',
            }}
          >
            <IconCircleCheck size={40} color="#ffffff" />
          </ThemeIcon>

          <Stack align="center" gap={8}>
            <Title
              order={2}
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '28px',
                color: '#1e2b4a',
              }}
            >
              Submission Received
            </Title>
            <Text style={{ fontSize: '15px', color: '#6b6b8a', lineHeight: 1.6 }}>
              Thank you, <strong style={{ color: '#1e2b4a' }}>{submitterName}</strong>.
              Your marriage escrow form has been submitted successfully and delivered to the escrow agents.
            </Text>
          </Stack>

          <Box
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.25)',
              borderRadius: '8px',
              padding: '16px 20px',
              width: '100%',
            }}
          >
            <Text
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '13px',
                color: '#9a7a2e',
                lineHeight: 1.6,
              }}
            >
              Facilitated by Bisher Alhasani Aljazaeri &amp; Judy Alqabbani
            </Text>
          </Box>

          <Button
            variant="subtle"
            onClick={onReset}
            style={{ color: '#6b6b8a', fontSize: '13px' }}
          >
            Submit another form
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}
