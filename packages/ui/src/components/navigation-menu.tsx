import { cn } from '@a/ui'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'

const NavigationMenuViewport = ({
    className,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) => (
    <div className={cn('absolute flex isolate justify-center left-0 top-full z-50')}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          'bg-popover border data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 h-[var(--radix-navigation-menu-viewport-height)] md:w-[var(--radix-navigation-menu-viewport-width)] mt-1.5 origin-top-center overflow-hidden relative rounded-md shadow text-popover-foreground w-full',
          className
        )}
        data-slot='navigation-menu-viewport'
        {...props}
      />
    </div>
  ),
  NavigationMenu = ({
    children,
    className,
    viewport = true,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean
  }) => (
    <NavigationMenuPrimitive.Root
      className={cn('flex flex-1 group/navigation-menu items-center justify-center max-w-max relative', className)}
      data-slot='navigation-menu'
      data-viewport={viewport}
      {...props}>
      {children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  ),
  NavigationMenuList = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) => (
    <NavigationMenuPrimitive.List
      className={cn('flex flex-1 gap-1 group items-center justify-center list-none', className)}
      data-slot='navigation-menu-list'
      {...props}
    />
  ),
  NavigationMenuItem = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) => (
    <NavigationMenuPrimitive.Item className={cn('relative', className)} data-slot='navigation-menu-item' {...props} />
  ),
  navigationMenuTriggerStyle = cva(
    'bg-background dark:outline-ring/40 dark:ring-ring/20 data-[state=open]:bg-accent/50 data-[state=open]:focus:bg-accent data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-1 focus-visible:ring-4 focus:bg-accent focus:text-accent-foreground font-medium group h-9 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center outline-ring/50 px-4 py-2 ring-ring/10 rounded-md text-sm transition-[color,box-shadow] w-max'
  ),
  NavigationMenuTrigger = ({
    children,
    className,
    ...props
  }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) => (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      data-slot='navigation-menu-trigger'
      {...props}>
      {children}{' '}
      <ChevronDownIcon
        aria-hidden='true'
        className='duration-300 group-data-[state=open]:rotate-180 ml-1 relative size-3 top-[1px] transition'
      />
    </NavigationMenuPrimitive.Trigger>
  ),
  NavigationMenuContent = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) => (
    <NavigationMenuPrimitive.Content
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 md:absolute md:w-auto p-2 pr-2.5 top-0 w-full',
        '**:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:top-full',
        className
      )}
      data-slot='navigation-menu-content'
      {...props}
    />
  ),
  NavigationMenuLink = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) => (
    <NavigationMenuPrimitive.Link
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground dark:outline-ring/40 dark:ring-ring/20 data-[active=true]:bg-accent/50 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:text-accent-foreground flex flex-col focus-visible:outline-1 focus-visible:ring-4 focus:bg-accent focus:text-accent-foreground gap-1 hover:bg-accent hover:text-accent-foreground outline-ring/50 p-2 ring-ring/10 rounded-sm text-sm transition-[color,box-shadow]",
        className
      )}
      data-slot='navigation-menu-link'
      {...props}
    />
  ),
  NavigationMenuIndicator = ({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) => (
    <NavigationMenuPrimitive.Indicator
      className={cn(
        'data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in flex h-1.5 items-end justify-center overflow-hidden top-full z-[1]',
        className
      )}
      data-slot='navigation-menu-indicator'
      {...props}>
      <div className='bg-border h-2 relative rotate-45 rounded-tl-sm shadow-md top-[60%] w-2' />
    </NavigationMenuPrimitive.Indicator>
  )

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport
}
