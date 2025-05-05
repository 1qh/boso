import { cn } from '@a/ui'

const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div className={cn('animate-pulse bg-accent rounded-md', className)} data-slot='skeleton' {...props} />
)

export { Skeleton }
