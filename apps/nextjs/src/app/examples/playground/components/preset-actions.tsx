'use client'

import * as React from 'react'
import { Dialog } from '@radix-ui/react-dialog'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@a/ui/alert-dialog'
import { Button } from '@a/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@a/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@a/ui/dropdown-menu'
import { Label } from '@a/ui/label'
import { Switch } from '@a/ui/switch'

export const PresetActions = () => {
  const [open, setIsOpen] = React.useState(false),
    [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary'>
            <span className='sr-only'>Actions</span>

            <DotsHorizontalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            Content filter preferences
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className='text-red-600' onSelect={() => setShowDeleteDialog(true)}>
            Delete preset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog onOpenChange={setIsOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content filter preferences</DialogTitle>

            <DialogDescription>
              The content filter flags text that may violate our content policy. It&apos;s powered
              by our moderation endpoint which is free to use to moderate your OpenAI API traffic.
              Learn more.
            </DialogDescription>
          </DialogHeader>

          <div className='py-6'>
            <h4 className='text-sm text-muted-foreground'>Playground Warnings</h4>

            <div className='flex items-start justify-between space-x-4 pt-3'>
              <Switch defaultChecked id='show' name='show' />

              <Label className='grid gap-1 font-normal' htmlFor='show'>
                <span className='font-semibold'>Show a warning when content is flagged</span>

                <span className='text-sm text-muted-foreground'>
                  A warning will be shown when sexual, hateful, violent or self-harm content is
                  detected.
                </span>
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setIsOpen(false)} variant='secondary'>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog onOpenChange={setShowDeleteDialog} open={showDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be accessible by you or
              others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              onClick={() => {
                setShowDeleteDialog(false)
                toast('This preset has been deleted.')
              }}
              variant='destructive'>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
