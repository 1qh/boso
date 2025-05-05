import '@a/ui/globals.css'
import { cn } from '@a/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

import { TRPCReactProvider } from '~/trpc/react'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en' suppressHydrationWarning>
    <body
      className={cn(
        'antialiased bg-background font-sans min-h-screen text-foreground',
        GeistSans.variable,
        GeistMono.variable
      )}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </body>
  </html>
)

export default Layout
