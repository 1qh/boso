import { Button } from '@a/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@a/ui/dialog'
import { Input } from '@a/ui/input'
import { Label } from '@a/ui/label'

export const PresetSave = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant='secondary'>Save</Button>
    </DialogTrigger>

    <DialogContent className='sm:max-w-[475px]'>
      <DialogHeader>
        <DialogTitle>Save preset</DialogTitle>

        <DialogDescription>
          This will save the current playground state as a preset which you can access later or
          share with others.
        </DialogDescription>
      </DialogHeader>

      <div className='grid gap-4 py-4'>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Name</Label>

          <Input autoFocus id='name' />
        </div>

        <div className='grid gap-2'>
          <Label htmlFor='description'>Description</Label>

          <Input id='description' />
        </div>
      </div>

      <DialogFooter>
        <Button type='submit'>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
