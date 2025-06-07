import { NodeResizer } from '@xyflow/react'
import React from 'react'

import { BaseNode } from './base-node'

export const ResizableNode = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    selected: boolean
  }
>(({ children, className, selected, ...props }, ref) => (
  <BaseNode className={className} ref={ref} {...props}>
    <NodeResizer isVisible={selected} />
    {children}
  </BaseNode>
))
ResizableNode.displayName = 'ResizableNode'
