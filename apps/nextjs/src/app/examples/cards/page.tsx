import type { Metadata } from 'next'
import Image from 'next/image'

import { cn } from '@a/ui'

import { DemoCookieSettings } from './components/cookie-settings'
import { DemoCreateAccount } from './components/create-account'
import { DemoDatePicker } from './components/date-picker'
import { DemoGithub } from './components/github-card'
import { DemoNotifications } from './components/notifications'
import { DemoPaymentMethod } from './components/payment-method'
import { DemoReportAnIssue } from './components/report-an-issue'
import { DemoShareDocument } from './components/share-document'
import { DemoTeamMembers } from './components/team-members'

export const metadata: Metadata = {
  description: 'Examples of cards built using the components.',
  title: 'Cards'
}

const DemoContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-center [&>div]:w-full', className)} {...props} />
)

export default function CardsPage() {
  return (
    <>
      <div className='md:hidden'>
        <Image
          alt='Cards'
          className='block dark:hidden'
          height={1214}
          src='/examples/cards-light.png'
          width={1280}
        />

        <Image
          alt='Cards'
          className='hidden dark:block'
          height={1214}
          src='/examples/cards-dark.png'
          width={1280}
        />
      </div>

      <div className='hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
        <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
          <DemoContainer>
            <DemoCreateAccount />
          </DemoContainer>

          <DemoContainer>
            <DemoPaymentMethod />
          </DemoContainer>
        </div>

        <div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
          <DemoContainer>
            <DemoTeamMembers />
          </DemoContainer>

          <DemoContainer>
            <DemoShareDocument />
          </DemoContainer>

          <DemoContainer>
            <DemoDatePicker />
          </DemoContainer>

          <DemoContainer>
            <DemoNotifications />
          </DemoContainer>
        </div>

        <div className='col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1'>
          <DemoContainer>
            <DemoReportAnIssue />
          </DemoContainer>

          <DemoContainer>
            <DemoGithub />
          </DemoContainer>

          <DemoContainer>
            <DemoCookieSettings />
          </DemoContainer>
        </div>
      </div>
    </>
  )
}
