import '@bacons/text-decoder/install'
import '../styles.css'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

import { TRPCProvider } from '~/utils/api'

export default function RootLayout() {
  const { colorScheme } = useColorScheme()
  return (
    <TRPCProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF' },
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF' }
        }}
      />

      <StatusBar />
    </TRPCProvider>
  )
}
