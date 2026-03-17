import { Paper, Box, Text, Title, Stack } from '@mantine/core'
import type { ReactNode } from 'react'

interface FormSectionProps {
  number: string
  title: string
  children: ReactNode
}

export function FormSection({ number, title, children }: FormSectionProps) {
  return (
    <Paper
      shadow="xs"
      radius="md"
      p={0}
      style={{
        overflow: 'hidden',
        border: '1px solid #e2d9cc',
        background: '#ffffff',
      }}
    >
      {/* Section header bar */}
      <Box
        style={{
          borderLeft: '4px solid #c9a84c',
          padding: '16px 24px',
          background: 'linear-gradient(90deg, rgba(201,168,76,0.06) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Box
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c9a84c, #9a7a2e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Text
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '13px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1,
            }}
          >
            {number}
          </Text>
        </Box>
        <Title
          order={2}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: '17px',
            fontWeight: 600,
            color: '#1e2b4a',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </Title>
      </Box>

      {/* Section content */}
      <Stack p={24} gap="md">
        {children}
      </Stack>
    </Paper>
  )
}
