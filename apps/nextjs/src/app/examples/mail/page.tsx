import { cookies } from 'next/headers'

import { Mail } from './components/mail'
import { accounts, mails } from './data'

export default function MailPage() {
  const layout = cookies().get('react-resizable-panels:layout:mail'),
    collapsed = cookies().get('react-resizable-panels:collapsed'),
    defaultLayout = layout ? (JSON.parse(layout.value) as number[]) : undefined,
    defaultCollapsed = collapsed ? (JSON.parse(collapsed.value) as boolean) : undefined

  return (
    <Mail
      accounts={accounts}
      defaultCollapsed={defaultCollapsed}
      defaultLayout={defaultLayout}
      mails={mails}
      navCollapsedSize={4}
    />
  )
}
