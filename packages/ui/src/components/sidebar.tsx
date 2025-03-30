'use client'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '@a/ui'
import { Button } from '@a/ui/button'
import { useIsMobile } from '@a/ui/hooks/use-mobile'
import { Input } from '@a/ui/input'
import { Separator } from '@a/ui/separator'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@a/ui/sheet'
import { Skeleton } from '@a/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@a/ui/tooltip'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { PanelLeftIcon } from 'lucide-react'
import * as React from 'react'

const SIDEBAR_COOKIE_NAME = 'sidebar_state',
  SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7,
  SIDEBAR_WIDTH = '16rem',
  SIDEBAR_WIDTH_MOBILE = '18rem',
  SIDEBAR_WIDTH_ICON = '3rem',
  SIDEBAR_KEYBOARD_SHORTCUT = 'b'

interface SidebarContextProps {
  isMobile: boolean
  open: boolean
  openMobile: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  state: 'collapsed' | 'expanded'
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<null | SidebarContextProps>(null),
  useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (!context) throw new Error('useSidebar must be used within a SidebarProvider.')
    return context
  },
  SidebarProvider = ({
    children,
    className,
    defaultOpen = true,
    onOpenChange: setOpenProp,
    open: openProp,
    style,
    ...props
  }: React.ComponentProps<'div'> & {
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
  }) => {
    const isMobile = useIsMobile(),
      [openMobile, setOpenMobile] = React.useState(false),
      [_open, _setOpen] = React.useState(defaultOpen),
      open = openProp ?? _open,
      setOpen = React.useCallback(
        (value: ((value: boolean) => boolean) | boolean) => {
          const openState = typeof value === 'function' ? value(open) : value
          if (setOpenProp) setOpenProp(openState)
          else _setOpen(openState)
          // eslint-disable-next-line react-compiler/react-compiler
          document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
        },
        [setOpenProp, open]
      ),
      toggleSidebar = React.useCallback(
        () => (isMobile ? setOpenMobile(o => !o) : setOpen(o => !o)),
        [isMobile, setOpen, setOpenMobile]
      )
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
    const state = open ? 'expanded' : 'collapsed',
      contextValue = React.useMemo<SidebarContextProps>(
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
            className={cn('flex group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar min-h-svh w-full', className)}
            data-slot='sidebar-wrapper'
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
  },
  Sidebar = ({
    children,
    className,
    collapsible = 'offcanvas',
    side = 'left',
    variant = 'sidebar',
    ...props
  }: React.ComponentProps<'div'> & {
    collapsible?: 'icon' | 'none' | 'offcanvas'
    side?: 'left' | 'right'
    variant?: 'floating' | 'inset' | 'sidebar'
  }) => {
    const { isMobile, openMobile, setOpenMobile, state } = useSidebar()
    if (collapsible === 'none')
      return (
        <div
          className={cn('bg-sidebar flex flex-col h-full text-sidebar-foreground w-(--sidebar-width)', className)}
          data-slot='sidebar'
          {...props}>
          {children}
        </div>
      )
    if (isMobile)
      return (
        <Sheet onOpenChange={setOpenMobile} open={openMobile} {...props}>
          <SheetContent
            className='[&>button]:hidden bg-sidebar p-0 text-sidebar-foreground w-(--sidebar-width)'
            data-mobile='true'
            data-sidebar='sidebar'
            data-slot='sidebar'
            side={side}
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH_MOBILE
              } as React.CSSProperties
            }>
            <SheetHeader className='sr-only'>
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className='flex flex-col h-full w-full'>{children}</div>
          </SheetContent>
        </Sheet>
      )
    return (
      <div
        className='group hidden md:block peer text-sidebar-foreground'
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        data-side={side}
        data-slot='sidebar'
        data-state={state}
        data-variant={variant}>
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            'bg-transparent duration-200 ease-linear relative transition-[width] w-(--sidebar-width)',
            'group-data-[collapsible=offcanvas]:w-0',
            'group-data-[side=right]:rotate-180',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
              : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)'
          )}
          data-slot='sidebar-gap'
        />
        <div
          className={cn(
            'duration-200 ease-linear fixed h-svh hidden inset-y-0 md:flex transition-[left,right,width] w-(--sidebar-width) z-10',
            side === 'left'
              ? 'group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] left-0'
              : 'group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] right-0',
            variant === 'floating' || variant === 'inset'
              ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)] p-2'
              : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
            className
          )}
          data-slot='sidebar-container'
          {...props}>
          <div
            className='bg-sidebar flex flex-col group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm h-full w-full'
            data-sidebar='sidebar'
            data-slot='sidebar-inner'>
            {children}
          </div>
        </div>
      </div>
    )
  },
  SidebarTrigger = ({ className, onClick, ...props }: React.ComponentProps<typeof Button>) => {
    const { toggleSidebar } = useSidebar()
    return (
      <Button
        className={cn('size-7', className)}
        data-sidebar='trigger'
        data-slot='sidebar-trigger'
        onClick={event => {
          onClick?.(event)
          toggleSidebar()
        }}
        size='icon'
        variant='ghost'
        {...props}>
        <PanelLeftIcon />
        <span className='sr-only'>Toggle Sidebar</span>
      </Button>
    )
  },
  SidebarRail = ({ className, ...props }: React.ComponentProps<'button'>) => {
    const { toggleSidebar } = useSidebar()
    return (
      <button
        aria-label='Toggle Sidebar'
        className={cn(
          '-translate-x-1/2 absolute after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hidden hover:after:bg-sidebar-border inset-y-0 sm:flex transition-all w-4 z-20',
          'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
          '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
          'group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-sidebar',
          '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
          '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
          className
        )}
        data-sidebar='rail'
        data-slot='sidebar-rail'
        onClick={toggleSidebar}
        tabIndex={-1}
        title='Toggle Sidebar'
        {...props}
      />
    )
  },
  SidebarInset = ({ className, ...props }: React.ComponentProps<'main'>) => (
    <main
      className={cn(
        'bg-background flex flex-1 flex-col relative w-full',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm',
        className
      )}
      data-slot='sidebar-inset'
      {...props}
    />
  ),
  SidebarInput = ({ className, ...props }: React.ComponentProps<typeof Input>) => (
    <Input
      className={cn('bg-background h-8 shadow-none w-full', className)}
      data-sidebar='input'
      data-slot='sidebar-input'
      {...props}
    />
  ),
  SidebarHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='header'
      data-slot='sidebar-header'
      {...props}
    />
  ),
  SidebarFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col gap-2 p-2', className)}
      data-sidebar='footer'
      data-slot='sidebar-footer'
      {...props}
    />
  ),
  SidebarSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
    <Separator
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      data-sidebar='separator'
      data-slot='sidebar-separator'
      {...props}
    />
  ),
  SidebarContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'flex flex-1 flex-col gap-2 group-data-[collapsible=icon]:overflow-hidden min-h-0 overflow-auto',
        className
      )}
      data-sidebar='content'
      data-slot='sidebar-content'
      {...props}
    />
  ),
  SidebarGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('flex flex-col min-w-0 p-2 relative w-full', className)}
      data-sidebar='group'
      data-slot='sidebar-group'
      {...props}
    />
  ),
  SidebarGroupLabel = ({ asChild = false, className, ...props }: React.ComponentProps<'div'> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        className={cn(
          '[&>svg]:shrink-0 [&>svg]:size-4 duration-200 ease-linear flex focus-visible:ring-2 font-medium h-8 items-center outline-hidden px-2 ring-sidebar-ring rounded-md shrink-0 text-sidebar-foreground/70 text-xs transition-[margin,opacity]',
          'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
          className
        )}
        data-sidebar='group-label'
        data-slot='sidebar-group-label'
        {...props}
      />
    )
  },
  SidebarGroupAction = ({
    asChild = false,
    className,
    ...props
  }: React.ComponentProps<'button'> & { asChild?: boolean }) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          '[&>svg]:shrink-0 [&>svg]:size-4 absolute aspect-square flex focus-visible:ring-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground items-center justify-center outline-hidden p-0 right-3 ring-sidebar-ring rounded-md text-sidebar-foreground top-3.5 transition-transform w-5',
          'after:-inset-2 after:absolute md:after:hidden',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-sidebar='group-action'
        data-slot='sidebar-group-action'
        {...props}
      />
    )
  },
  SidebarGroupContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn('text-sm w-full', className)}
      data-sidebar='group-content'
      data-slot='sidebar-group-content'
      {...props}
    />
  ),
  SidebarMenu = ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul
      className={cn('flex flex-col gap-1 min-w-0 w-full', className)}
      data-sidebar='menu'
      data-slot='sidebar-menu'
      {...props}
    />
  ),
  SidebarMenuItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li
      className={cn('group/menu-item relative', className)}
      data-sidebar='menu-item'
      data-slot='sidebar-menu-item'
      {...props}
    />
  ),
  sidebarMenuButtonVariants = cva(
    '[&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:size-4 active:bg-sidebar-accent active:text-sidebar-accent-foreground aria-disabled:opacity-50 aria-disabled:pointer-events-none data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground disabled:opacity-50 disabled:pointer-events-none flex focus-visible:ring-2 gap-2 group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:size-8! group-has-data-[sidebar=menu-action]/menu-item:pr-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground items-center outline-hidden overflow-hidden p-2 peer/menu-button ring-sidebar-ring rounded-md text-left text-sm transition-[width,height,padding] w-full',
    {
      defaultVariants: {
        size: 'default',
        variant: 'default'
      },
      variants: {
        size: {
          default: 'h-8 text-sm',
          lg: 'group-data-[collapsible=icon]:p-0! h-12 text-sm',
          sm: 'h-7 text-xs'
        },
        variant: {
          default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          outline:
            'bg-background hover:bg-sidebar-accent hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))] hover:text-sidebar-accent-foreground shadow-[0_0_0_1px_hsl(var(--sidebar-border))]'
        }
      }
    }
  ),
  SidebarMenuButton = ({
    asChild = false,
    className,
    isActive = false,
    size = 'default',
    tooltip,
    variant = 'default',
    ...props
  }: React.ComponentProps<'button'> &
    VariantProps<typeof sidebarMenuButtonVariants> & {
      asChild?: boolean
      isActive?: boolean
      tooltip?: React.ComponentProps<typeof TooltipContent> | string
    }) => {
    const Comp = asChild ? Slot : 'button',
      { isMobile, state } = useSidebar(),
      button = (
        <Comp
          className={cn(sidebarMenuButtonVariants({ size, variant }), className)}
          data-active={isActive}
          data-sidebar='menu-button'
          data-size={size}
          data-slot='sidebar-menu-button'
          {...props}
        />
      )
    if (!tooltip) return button
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
  },
  SidebarMenuAction = ({
    asChild = false,
    className,
    showOnHover = false,
    ...props
  }: React.ComponentProps<'button'> & {
    asChild?: boolean
    showOnHover?: boolean
  }) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          '[&>svg]:shrink-0 [&>svg]:size-4 absolute aspect-square flex focus-visible:ring-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground items-center justify-center outline-hidden p-0 peer-hover/menu-button:text-sidebar-accent-foreground right-1 ring-sidebar-ring rounded-md text-sidebar-foreground top-1.5 transition-transform w-5',
          'after:-inset-2 after:absolute md:after:hidden',
          'peer-data-[size=sm]/menu-button:top-1',
          'peer-data-[size=default]/menu-button:top-1.5',
          'peer-data-[size=lg]/menu-button:top-2.5',
          'group-data-[collapsible=icon]:hidden',
          showOnHover &&
            'data-[state=open]:opacity-100 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 md:opacity-0 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
          className
        )}
        data-sidebar='menu-action'
        data-slot='sidebar-menu-action'
        {...props}
      />
    )
  },
  SidebarMenuBadge = ({ className, ...props }: React.ComponentProps<'div'>) => (
    <div
      className={cn(
        'absolute flex font-medium h-5 items-center justify-center min-w-5 pointer-events-none px-1 right-1 rounded-md select-none tabular-nums text-sidebar-foreground text-xs',
        'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='menu-badge'
      data-slot='sidebar-menu-badge'
      {...props}
    />
  ),
  SidebarMenuSkeleton = ({
    className,
    showIcon = false,
    ...props
  }: React.ComponentProps<'div'> & {
    showIcon?: boolean
  }) => {
    const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, [])
    return (
      <div
        className={cn('flex gap-2 h-8 items-center px-2 rounded-md', className)}
        data-sidebar='menu-skeleton'
        data-slot='sidebar-menu-skeleton'
        {...props}>
        {showIcon ? <Skeleton className='rounded-md size-4' data-sidebar='menu-skeleton-icon' /> : null}
        <Skeleton
          className='flex-1 h-4 max-w-(--skeleton-width)'
          data-sidebar='menu-skeleton-text'
          style={
            {
              '--skeleton-width': width
            } as React.CSSProperties
          }
        />
      </div>
    )
  },
  SidebarMenuSub = ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul
      className={cn(
        'border-l border-sidebar-border flex flex-col gap-1 min-w-0 mx-3.5 px-2.5 py-0.5 translate-x-px',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      data-sidebar='menu-sub'
      data-slot='sidebar-menu-sub'
      {...props}
    />
  ),
  SidebarMenuSubItem = ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li
      className={cn('group/menu-sub-item relative', className)}
      data-sidebar='menu-sub-item'
      data-slot='sidebar-menu-sub-item'
      {...props}
    />
  ),
  SidebarMenuSubButton = ({
    asChild = false,
    className,
    isActive = false,
    size = 'md',
    ...props
  }: React.ComponentProps<'a'> & {
    asChild?: boolean
    isActive?: boolean
    size?: 'md' | 'sm'
  }) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        className={cn(
          '-translate-x-px [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground aria-disabled:opacity-50 aria-disabled:pointer-events-none disabled:opacity-50 disabled:pointer-events-none flex focus-visible:ring-2 gap-2 h-7 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground items-center min-w-0 outline-hidden overflow-hidden px-2 ring-sidebar-ring rounded-md text-sidebar-foreground',
          'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          'group-data-[collapsible=icon]:hidden',
          className
        )}
        data-active={isActive}
        data-sidebar='menu-sub-button'
        data-size={size}
        data-slot='sidebar-menu-sub-button'
        {...props}
      />
    )
  }

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
