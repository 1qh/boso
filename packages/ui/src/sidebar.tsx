'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'
import { PanelLeft } from 'lucide-react'
import { Slot } from 'radix-ui'

import { cn } from '@a/ui'

import { Button } from './button'
import { Input } from './input'
import { Separator } from './separator'
import { Sheet, SheetContent } from './sheet'
import { Skeleton } from './skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { useIsMobile } from './use-mobile'

interface SidebarContextI {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  state: 'expanded' | 'collapsed'
  toggleSidebar: () => void
}

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7,
  SIDEBAR_COOKIE_NAME = 'sidebar:state',
  SIDEBAR_KEYBOARD_SHORTCUT = 'b',
  SIDEBAR_WIDTH = '16rem',
  SIDEBAR_WIDTH_ICON = '3rem',
  SIDEBAR_WIDTH_MOBILE = '18rem',
  SidebarContext = React.createContext<SidebarContextI | null>(null),
  useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider.')
    }
    return context
  },
  SidebarProvider = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
      readonly defaultOpen?: boolean
      readonly onOpenChange?: (open: boolean) => void
      readonly open?: boolean
    }
  >(
    (
      {
        children,
        className,
        defaultOpen = true,
        onOpenChange: setOpenProp,
        open: openProp,
        style,
        ...props
      },
      ref
    ) => {
      const isMobile = useIsMobile(),
        [openMobile, setOpenMobile] = React.useState(false),
        // This is the internal state of the sidebar.
        // We use openProp and setOpenProp for control from outside the component.
        [_open, _setOpen] = React.useState(defaultOpen),
        open = openProp ?? _open,
        setOpen = React.useCallback(
          (value: boolean | ((value: boolean) => boolean)) => {
            const openState = typeof value === 'function' ? value(open) : value
            if (setOpenProp) {
              setOpenProp(openState)
            } else {
              _setOpen(openState)
            }

            // This sets the cookie to keep the sidebar state.
            document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
          },
          [setOpenProp, open]
        ),
        // Helper to toggle the sidebar.
        toggleSidebar = React.useCallback(
          () => (isMobile ? setOpenMobile(o => !o) : setOpen(o => !o)),
          [isMobile, setOpen, setOpenMobile]
        )

      // Adds a keyboard shortcut to toggle the sidebar.
      React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
            event.preventDefault()
            toggleSidebar()
          }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
      }, [toggleSidebar])

      // We add a state so that we can do data-state="expanded" or "collapsed".
      // This makes it easier to style the sidebar with Tailwind classes.
      const state = open ? 'expanded' : 'collapsed',
        contextValue = React.useMemo<SidebarContextI>(
          () => ({
            isMobile,
            open,
            openMobile,
            setOpen,
            setOpenMobile,
            state,
            toggleSidebar
          }),
          [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
        )

      return (
        <SidebarContext.Provider value={contextValue}>
          <TooltipProvider delayDuration={0}>
            <div
              className={cn(
                'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
                className
              )}
              ref={ref}
              style={
                {
                  '--sidebar-width': SIDEBAR_WIDTH,
                  '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                  ...style
                } as React.CSSProperties
              }
              {...props}>
              {children}
            </div>
          </TooltipProvider>
        </SidebarContext.Provider>
      )
    }
  ),
  Sidebar = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
      readonly collapsible?: 'offcanvas' | 'icon' | 'none'
      readonly side?: 'left' | 'right'
      readonly variant?: 'sidebar' | 'floating' | 'inset'
    }
  >(
    (
      {
        children,
        className,
        collapsible = 'offcanvas',
        side = 'left',
        variant = 'sidebar',
        ...props
      },
      ref
    ) => {
      const { isMobile, openMobile, setOpenMobile, state } = useSidebar()

      if (collapsible === 'none') {
        return (
          <div
            className={cn(
              'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
              className
            )}
            ref={ref}
            {...props}>
            {children}
          </div>
        )
      }

      if (isMobile) {
        return (
          <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
            <SheetContent
              className='w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden'
              data-mobile='true'
              data-sidebar='sidebar'
              side={side}
              style={
                {
                  '--sidebar-width': SIDEBAR_WIDTH_MOBILE
                } as React.CSSProperties
              }>
              <div className='flex size-full flex-col'>{children}</div>
            </SheetContent>
          </Sheet>
        )
      }

      return (
        <div
          className='group peer hidden text-sidebar-foreground md:block'
          data-collapsible={state === 'collapsed' ? collapsible : ''}
          data-side={side}
          data-state={state}
          data-variant={variant}
          ref={ref}>
          {/* This is what handles the sidebar gap on desktop */}
          <div
            className={cn(
              'relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear',
              'group-data-[collapsible=offcanvas]:w-0',
              'group-data-[side=right]:rotate-180',
              variant === 'floating' || variant === 'inset'
                ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]'
                : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]'
            )}
          />
          <div
            className={cn(
              'fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex',
              side === 'left'
                ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
              // Adjust the padding for floating and inset variants.
              variant === 'floating' || variant === 'inset'
                ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]'
                : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l',
              className
            )}
            {...props}>
            <div
              className='flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow'
              data-sidebar='sidebar'>
              {children}
            </div>
          </div>
        </div>
      )
    }
  ),
  SidebarTrigger = React.forwardRef<
    React.ComponentRef<typeof Button>,
    React.ComponentProps<typeof Button>
  >(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar()

    return (
      <Button
        className={cn('size-7', className)}
        data-sidebar='trigger'
        onClick={event => {
          onClick?.(event)
          toggleSidebar()
        }}
        ref={ref}
        size='icon'
        variant='ghost'
        {...props}>
        <PanelLeft />
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    )
  }),
  SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
    ({ className, ...props }, ref) => {
      const { toggleSidebar } = useSidebar()

      return (
        <button
          aria-label='Toggle Sidebar'
          className={cn(
            'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex',
            '[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize',
            '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
            'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar',
            '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
            '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
            className
          )}
          data-sidebar='rail'
          onClick={toggleSidebar}
          ref={ref}
          tabIndex={-1}
          title='Toggle Sidebar'
          {...props}
        />
      )
    }
  ),
  SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<'main'>>(
    ({ className, ...props }, ref) => (
      <main
        className={cn(
          'relative flex min-h-svh flex-1 flex-col bg-background',
          'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarInput = React.forwardRef<
    React.ComponentRef<typeof Input>,
    React.ComponentProps<typeof Input>
  >(({ className, ...props }, ref) => (
    <Input
      className={cn(
        'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        className
      )}
      data-sidebar='input'
      ref={ref}
      {...props}
    />
  )),
  SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('flex flex-col gap-2 p-2', className)}
        data-sidebar='header'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('flex flex-col gap-2 p-2', className)}
        data-sidebar='footer'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarSeparator = React.forwardRef<
    React.ComponentRef<typeof Separator>,
    React.ComponentProps<typeof Separator>
  >(({ className, ...props }, ref) => (
    <Separator
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      data-sidebar='separator'
      ref={ref}
      {...props}
    />
  )),
  SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
          className
        )}
        data-sidebar='content'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
        data-sidebar='group'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarGroupLabel = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & { readonly asChild?: boolean }
  >(({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Slot : 'div'

    return (
      <Comp
        className={cn(
          'flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
          className
        )}
        data-sidebar='group-label'
        ref={ref}
        {...props}
      />
    )
  }),
  SidebarGroupAction = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<'button'> & { readonly asChild?: boolean }
  >(({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot.Slot : 'button'

    return (
      <Comp
        className={cn(
          'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
          // Increases the hit area of the button on mobile.
          'after:absolute after:-inset-2 after:md:hidden',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-sidebar='group-action'
        ref={ref}
        {...props}
      />
    )
  }),
  SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn('w-full text-sm', className)}
        data-sidebar='group-content'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
      <ul
        className={cn('flex w-full min-w-0 flex-col gap-1', className)}
        data-sidebar='menu'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
    ({ className, ...props }, ref) => (
      <li
        className={cn('group/menu-item relative', className)}
        data-sidebar='menu-item'
        ref={ref}
        {...props}
      />
    )
  ),
  sidebarMenuButtonVariants = cva(
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
    {
      defaultVariants: {
        size: 'default',
        variant: 'default'
      },
      variants: {
        size: {
          default: 'h-8 text-sm',
          lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
          sm: 'h-7 text-xs'
        },
        variant: {
          default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          outline:
            'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]'
        }
      }
    }
  ),
  SidebarMenuButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<'button'> & {
      readonly asChild?: boolean
      readonly isActive?: boolean
      readonly tooltip?: string | React.ComponentProps<typeof TooltipContent>
    } & VariantProps<typeof sidebarMenuButtonVariants>
  >(
    (
      {
        asChild = false,
        className,
        isActive = false,
        size = 'default',
        tooltip,
        variant = 'default',
        ...props
      },
      ref
    ) => {
      const Comp = asChild ? Slot.Slot : 'button',
        { isMobile, state } = useSidebar(),
        button = (
          <Comp
            className={cn(sidebarMenuButtonVariants({ size, variant }), className)}
            data-active={isActive}
            data-sidebar='menu-button'
            data-size={size}
            ref={ref}
            {...props}
          />
        )

      if (!tooltip) {
        return button
      }

      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            align='center'
            hidden={state !== 'collapsed' || isMobile}
            side='right'
            {...(typeof tooltip === 'string' ? { children: tooltip } : tooltip)}
          />
        </Tooltip>
      )
    }
  ),
  SidebarMenuAction = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<'button'> & {
      readonly asChild?: boolean
      readonly showOnHover?: boolean
    }
  >(({ asChild = false, className, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Slot : 'button'

    return (
      <Comp
        className={cn(
          'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0',
          // Increases the hit area of the button on mobile.
          'after:absolute after:-inset-2 after:md:hidden',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          showOnHover &&
            'group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0',
          className
        )}
        data-sidebar='menu-action'
        ref={ref}
        {...props}
      />
    )
  }),
  SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          'pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground',
          'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-sidebar='menu-badge'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarMenuSkeleton = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
      readonly showIcon?: boolean
    }
  >(({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])

    return (
      <div
        className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
        data-sidebar='menu-skeleton'
        ref={ref}
        {...props}>
        {showIcon ? (
          <Skeleton className='size-4 rounded-md' data-sidebar='menu-skeleton-icon' />
        ) : null}
        <Skeleton
          className='h-4 max-w-[--skeleton-width] flex-1'
          data-sidebar='menu-skeleton-text'
          style={
            {
              '--skeleton-width': width
            } as React.CSSProperties
          }
        />
      </div>
    )
  }),
  SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
      <ul
        className={cn(
          'mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-sidebar='menu-sub'
        ref={ref}
        {...props}
      />
    )
  ),
  SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
    ({ ...props }, ref) => <li ref={ref} {...props} />
  ),
  SidebarMenuSubButton = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentProps<'a'> & {
      readonly asChild?: boolean
      readonly isActive?: boolean
      readonly size?: 'sm' | 'md'
    }
  >(({ asChild = false, className, isActive, size = 'md', ...props }, ref) => {
    const Comp = asChild ? Slot.Slot : 'a'

    return (
      <Comp
        className={cn(
          'flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-active={isActive}
        data-sidebar='menu-sub-button'
        data-size={size}
        ref={ref}
        {...props}
      />
    )
  })

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar
}
Sidebar.displayName = 'Sidebar'
SidebarContent.displayName = 'SidebarContent'
SidebarFooter.displayName = 'SidebarFooter'
SidebarGroup.displayName = 'SidebarGroup'
SidebarGroupAction.displayName = 'SidebarGroupAction'
SidebarGroupContent.displayName = 'SidebarGroupContent'
SidebarGroupLabel.displayName = 'SidebarGroupLabel'
SidebarHeader.displayName = 'SidebarHeader'
SidebarInput.displayName = 'SidebarInput'
SidebarInset.displayName = 'SidebarInset'
SidebarMenu.displayName = 'SidebarMenu'
SidebarMenuAction.displayName = 'SidebarMenuAction'
SidebarMenuBadge.displayName = 'SidebarMenuBadge'
SidebarMenuButton.displayName = 'SidebarMenuButton'
SidebarMenuItem.displayName = 'SidebarMenuItem'
SidebarMenuSkeleton.displayName = 'SidebarMenuSkeleton'
SidebarMenuSub.displayName = 'SidebarMenuSub'
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'
SidebarProvider.displayName = 'SidebarProvider'
SidebarRail.displayName = 'SidebarRail'
SidebarSeparator.displayName = 'SidebarSeparator'
SidebarTrigger.displayName = 'SidebarTrigger'
