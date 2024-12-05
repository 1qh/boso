'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

import { cn } from '@a/ui'

export type ChartConfig = Record<
  string,
  {
    icon?: React.ComponentType
    label?: React.ReactNode
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>

interface ChartContextProps {
  config: ChartConfig
}

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { dark: '.dark', light: '' } as const,
  ChartContext = React.createContext<ChartContextProps | null>(null),
  useChart = () => {
    const context = React.useContext(ChartContext)

    if (!context) {
      throw new Error('useChart must be used within a <ChartContainer />')
    }

    return context
  },
  getPayloadConfigFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
    if (typeof payload !== 'object' || payload === null) {
      return undefined
    }

    const payloadPayload =
      'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null
        ? payload.payload
        : undefined

    let configLabelKey: string = key

    if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
      configLabelKey = payload[key as keyof typeof payload] as string
    } else if (
      payloadPayload &&
      key in payloadPayload &&
      typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
    ) {
      configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
    }

    return configLabelKey in config ? config[configLabelKey] : config[key]
  },
  ChartStyle = ({ config, id }: { readonly config: ChartConfig; readonly id: string }) => {
    const colorConfig = Object.entries(config).filter(([_, cf]) => cf.theme ?? cf.color)

    if (!colorConfig.length) {
      return null
    }

    return (
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: Object.entries(THEMES)
            .map(
              ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join('\n')}
}
`
            )
            .join('\n')
        }}
      />
    )
  },
  ChartContainer = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> & {
      readonly children: React.ComponentProps<
        typeof RechartsPrimitive.ResponsiveContainer
      >['children']
      readonly config: ChartConfig
    }
  >(({ children, className, config, id, ...props }, ref) => {
    const uniqueId = React.useId(),
      chartId = `chart-${id ?? uniqueId.replace(/:/gu, '')}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          data-chart={chartId}
          ref={ref}
          {...props}>
          <ChartStyle config={config} id={chartId} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }),
  ChartTooltip = RechartsPrimitive.Tooltip,
  ChartTooltipContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
      React.ComponentProps<'div'> & {
        readonly hideIndicator?: boolean
        readonly hideLabel?: boolean
        readonly indicator?: 'line' | 'dot' | 'dashed'
        readonly labelKey?: string
        readonly nameKey?: string
      }
  >(
    (
      {
        active,
        className,
        color,
        formatter,
        hideIndicator = false,
        hideLabel = false,
        indicator = 'dot',
        label,
        labelClassName,
        labelFormatter,
        labelKey,
        nameKey,
        payload
      },
      ref
    ) => {
      const { config } = useChart(),
        tooltipLabel = React.useMemo(() => {
          if (hideLabel || !payload?.length) {
            return null
          }

          const [item] = payload,
            key = item ? `${labelKey ?? item.dataKey ?? item.name}` : 'value',
            itemConfig = getPayloadConfigFromPayload(config, item, key),
            value =
              !labelKey && typeof label === 'string'
                ? (config[label]?.label ?? label)
                : itemConfig?.label

          if (labelFormatter) {
            return (
              <div className={cn('font-medium', labelClassName)}>
                {labelFormatter(value, payload)}
              </div>
            )
          }

          if (!value) {
            return null
          }

          return <div className={cn('font-medium', labelClassName)}>{value}</div>
        }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])

      if (!active || !payload?.length) {
        return null
      }

      const nestLabel = payload.length === 1 && indicator !== 'dot'

      return (
        <div
          className={cn(
            'grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
            className
          )}
          ref={ref}>
          {nestLabel ? null : tooltipLabel}
          <div className='grid gap-1.5'>
            {payload.map((item, index) => {
              const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`,
                itemConfig = getPayloadConfigFromPayload(config, item, key),
                indicatorColor =
                  color ?? (item.payload as { fill: string | undefined }).fill ?? item.color

              return (
                <div
                  className={cn(
                    'flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground',
                    indicator === 'dot' && 'items-center'
                  )}
                  key={item.dataKey}>
                  {formatter && item.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload as [])
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]',
                              {
                                'h-2.5 w-2.5': indicator === 'dot',
                                'my-0.5': nestLabel && indicator === 'dashed',
                                'w-0 border-[1.5px] border-dashed bg-transparent':
                                  indicator === 'dashed',
                                'w-1': indicator === 'line'
                              }
                            )}
                            style={
                              {
                                '--color-bg': indicatorColor,
                                '--color-border': indicatorColor
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          'flex flex-1 justify-between leading-none',
                          nestLabel ? 'items-end' : 'items-center'
                        )}>
                        <div className='grid gap-1.5'>
                          {nestLabel ? tooltipLabel : null}
                          <span className='text-muted-foreground'>
                            {itemConfig?.label ?? item.name}
                          </span>
                        </div>
                        {item.value ? (
                          <span className='font-mono font-medium tabular-nums text-foreground'>
                            {item.value.toLocaleString()}
                          </span>
                        ) : null}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  ),
  ChartLegend = RechartsPrimitive.Legend,
  ChartLegendContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentProps<'div'> &
      Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
        readonly hideIcon?: boolean
        readonly nameKey?: string
      }
  >(({ className, hideIcon = false, nameKey, payload, verticalAlign = 'bottom' }, ref) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        className={cn(
          'flex items-center justify-center gap-4',
          verticalAlign === 'top' ? 'pb-3' : 'pt-3',
          className
        )}
        ref={ref}>
        {payload.map(item => {
          const key = nameKey ?? item.dataKey?.toString() ?? 'value',
            itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              className={cn(
                'flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground'
              )}
              key={item.value as string}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className='size-2 shrink-0 rounded-[2px]'
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  })

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
}
ChartContainer.displayName = 'Chart'
ChartLegendContent.displayName = 'ChartLegend'
ChartTooltipContent.displayName = 'ChartTooltip'
