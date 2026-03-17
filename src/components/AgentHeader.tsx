import { Box, Text, Title, Group, Stack, Divider } from '@mantine/core'

export function AgentHeader() {
  return (
    <Box
      component="header"
      style={{
        background: 'linear-gradient(135deg, #1e2b4a 0%, #2c3e6b 60%, #1a2540 100%)',
        padding: '48px 24px 36px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          top: '-60px',
          left: '-60px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.15)',
          pointerEvents: 'none',
        }}
      />
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-40px',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.12)',
          pointerEvents: 'none',
        }}
      />

      <Stack align="center" gap="md">
        {/* Rings emblem */}
        <Box>
          <svg width="64" height="40" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="22" cy="20" r="15" stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.9" />
            <circle cx="42" cy="20" r="15" stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.9" />
          </svg>
        </Box>

        <Stack align="center" gap={6}>
          <Text
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#c9a84c',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            Marriage Escrow Service
          </Text>

          <Title
            order={1}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(24px, 4vw, 38px)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Formal Conditions Registration
          </Title>

          <Group gap={8} justify="center" mt={4}>
            <Text
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              Facilitated by
            </Text>
            <Text
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '15px',
                color: '#e8d5a3',
                fontWeight: 500,
              }}
            >
              Bisher Alhasani Aljazaeri
            </Text>
            <Text style={{ color: '#c9a84c', fontSize: '14px' }}>&amp;</Text>
            <Text
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: '15px',
                color: '#e8d5a3',
                fontWeight: 500,
              }}
            >
              Judy Alqabbani
            </Text>
          </Group>
        </Stack>
      </Stack>

      <Divider
        mt={32}
        color="rgba(201,168,76,0.4)"
        size="sm"
        style={{ maxWidth: '400px', margin: '32px auto 0' }}
      />
    </Box>
  )
}
