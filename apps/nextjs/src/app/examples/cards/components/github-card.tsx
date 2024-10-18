import { ChevronDownIcon, CircleIcon, PlusIcon, StarIcon } from '@radix-ui/react-icons'

import { Button } from '@a/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@a/ui/card'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'
import { Separator } from '@a/ui/separator'

export const DemoGithub = () => (
  <Card>
    <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
      <div className='space-y-1'>
        <CardTitle>shadcn/ui</CardTitle>

        <CardDescription>
          Beautifully designed components that you can copy and paste into your apps. Accessible.
          Customizable. Open Source.
        </CardDescription>
      </div>

      <div className='flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground'>
        <Button className='px-3 shadow-none' variant='secondary'>
          <StarIcon className='mr-2 size-4' />
          Star
        </Button>

        <Separator className='h-[20px]' orientation='vertical' />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='px-2 shadow-none' variant='secondary'>
              <ChevronDownIcon className='size-4 text-secondary-foreground' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
            <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem checked>Future Ideas</DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <PlusIcon className='mr-2 size-4' /> Create List
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>

    <CardContent>
      <div className='flex space-x-4 text-sm text-muted-foreground'>
        <div className='flex items-center'>
          <CircleIcon className='mr-1 size-3 fill-sky-400 text-sky-400' />
          TypeScript
        </div>

        <div className='flex items-center'>
          <StarIcon className='mr-1 size-3' />
          20k
        </div>

        <div>Updated April 2023</div>
      </div>
    </CardContent>
  </Card>
)
