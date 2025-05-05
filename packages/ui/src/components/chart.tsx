'use client'

import { cn } from '@a/ui'
import * as React from 'react'
import * as RechartsPrimitive from 'recharts'

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { dark: '.dark', light: '' } as const

export type ChartConfig = Record<
  string,
  ({ color?: never; theme: Record<keyof typeof THEMES, string> } | { color?: string; theme?: never }) & {
    icon?: React.ComponentType
    label?: React.ReactNode
  }
>

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null),
  useChart = () => {
    const context = React.useContext(ChartContext)
    if (!context) throw new Error('useChart must be used within a <ChartContainer />')
    return context
  },
  getPayloadConfigFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
    if (typeof payload !== 'object' || payload === null) return undefined
    const payloadPayload =
      'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null ? payload.payload : undefined
    let configLabelKey: string = key
    if (key in payload && typeof payload[key as keyof typeof payload] === 'string')
      configLabelKey = payload[key as keyof typeof payload] as string
    else if (
      payloadPayload &&
      key in payloadPayload &&
      typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
    )
      configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string
    return configLabelKey in config ? config[configLabelKey] : config[key]
  },
  ChartStyle = ({ config, id }: { config: ChartConfig; id: string }) => {
    const colorConfig = Object.entries(config).filter(([, cf]) => cf.theme ?? cf.color)
    if (!colorConfig.length) return null
    return (
      <style
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
  ChartContainer = ({
    children,
    className,
    config,
    id,
    ...props
  }: React.ComponentProps<'div'> & {
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children']
    config: ChartConfig
  }) => {
    const uniqueId = React.useId(),
      chartId = `chart-${id ?? uniqueId.replace(/:/gu, '')}`
    return (
      <ChartContext.Provider value={{ config }}>
        <div
          className={cn(
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden aspect-video flex justify-center text-xs",
            className
          )}
          data-chart={chartId}
          data-slot='chart'
          {...props}>
          <ChartStyle config={config} id={chartId} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  },
  ChartTooltip = RechartsPrimitive.Tooltip,
  ChartTooltipContent = ({
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
  }: React.ComponentProps<'div'> &
    React.ComponentProps<typeof RechartsPrimitive.Tooltip> & {
      hideIndicator?: boolean
      hideLabel?: boolean
      indicator?: 'dashed' | 'dot' | 'line'
      labelKey?: string
      nameKey?: string
    }) => {
    const { config } = useChart(),
      tooltipLabel = React.useMemo(() => {
        if (hideLabel || !payload?.length) return null
        const [item] = payload,
          key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`,
          itemConfig = getPayloadConfigFromPayload(config, item, key),
          value = !labelKey && typeof label === 'string' ? (config[label]?.label ?? label) : itemConfig?.label
        if (labelFormatter)
          return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>
        if (!value) return null
        return <div className={cn('font-medium', labelClassName)}>{value}</div>
      }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey])
    if (!active || !payload?.length) return null
    const nestLabel = payload.length === 1 && indicator !== 'dot'
    return (
      <div
        className={cn(
          'bg-background border border-border/50 gap-1.5 grid items-start min-w-[8rem] px-2.5 py-1.5 rounded-lg shadow-xl text-xs',
          className
        )}>
        {nestLabel ? null : tooltipLabel}
        <div className='gap-1.5 grid'>
          {payload.map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`,
              itemConfig = getPayloadConfigFromPayload(config, item, key),
              indicatorColor = color ?? (item.payload as { fill: string | undefined }).fill ?? item.color
            return (
              <div
                className={cn(
                  '[&>svg]:h-2.5 [&>svg]:text-muted-foreground [&>svg]:w-2.5 flex flex-wrap gap-2 items-stretch w-full',
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
                          className={cn('bg-(--color-bg) border-(--color-border) rounded-[2px] shrink-0', {
                            'bg-transparent border-[1.5px] border-dashed w-0': indicator === 'dashed',
                            'h-2.5 w-2.5': indicator === 'dot',
                            'my-0.5': nestLabel && indicator === 'dashed',
                            'w-1': indicator === 'line'
                          })}
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
                      className={cn('flex flex-1 justify-between leading-none', nestLabel ? 'items-end' : 'items-center')}>
                      <div className='gap-1.5 grid'>
                        {nestLabel ? tooltipLabel : null}
                        <span className='text-muted-foreground'>{itemConfig?.label ?? item.name}</span>
                      </div>
                      {item.value ? (
                        <span className='font-medium font-mono tabular-nums text-foreground'>
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
  },
  ChartLegend = RechartsPrimitive.Legend,
  ChartLegendContent = ({
    className,
    hideIcon = false,
    nameKey,
    payload,
    verticalAlign = 'bottom'
  }: Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> &
    React.ComponentProps<'div'> & {
      hideIcon?: boolean
      nameKey?: string
    }) => {
    const { config } = useChart()
    if (!payload?.length) return null
    return (
      <div className={cn('flex gap-4 items-center justify-center', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}>
        {payload.map(item => {
          const key = nameKey ?? item.dataKey?.toString() ?? 'value',
            itemConfig = getPayloadConfigFromPayload(config, item, key)
          return (
            <div
              className={cn('[&>svg]:h-3 [&>svg]:text-muted-foreground [&>svg]:w-3 flex gap-1.5 items-center')}
              key={item.value as string}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className='h-2 rounded-[2px] shrink-0 w-2'
                  style={{
                    backgroundColor: item.color
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }

export { ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent }
