'use client'

import type { Node, NodeProps } from '@xyflow/react'

import { useCallback } from 'react'
import { toast } from 'sonner'

import type { GenerateTextData } from './generate-text-node'
import type { Model } from './model-selector'
import type { NodeExecutionState } from './workflow-execution-engine'

import { GenerateTextNode } from './generate-text-node'
import { useWorkflow } from './use-workflow'

export type GenerateTextNodeControllerType = Node<
  Omit<GenerateTextData, 'status'> &
    Record<string, unknown> & {
      executionState?: NodeExecutionState
    },
  'generate-text'
>

export const GenerateTextNodeController = ({ data, id, ...props }: NodeProps<GenerateTextNodeControllerType>) => {
  const updateNode = useWorkflow(state => state.updateNode),
    addDynamicHandle = useWorkflow(state => state.addDynamicHandle),
    removeDynamicHandle = useWorkflow(state => state.removeDynamicHandle),
    deleteNode = useWorkflow(state => state.deleteNode),
    handleModelChange = useCallback(
      (model: Model) =>
        updateNode(id, 'generate-text', {
          config: {
            ...data.config,
            model
          }
        }),
      [id, data.config, updateNode]
    ),
    handleCreateTool = useCallback(
      (name: string, description?: string) => {
        if (!name) {
          toast.error('Tool name cannot be empty')
          return false
        }

        const existingTool = data.dynamicHandles.tools.find(tool => tool.name === name)
        if (existingTool) {
          toast.error('Tool name already exists')
          return false
        }
        addDynamicHandle(id, 'generate-text', 'tools', {
          description,
          name
        })
        return true
      },
      [id, data.dynamicHandles.tools, addDynamicHandle]
    ),
    handleRemoveTool = useCallback(
      (handleId: string) => removeDynamicHandle(id, 'generate-text', 'tools', handleId),
      [id, removeDynamicHandle]
    ),
    handleUpdateTool = useCallback(
      (toolId: string, newName: string, newDescription?: string) => {
        if (!newName) {
          toast.error('Tool name cannot be empty')
          return false
        }

        const existingTool = data.dynamicHandles.tools.find(tool => tool.name === newName && tool.id !== toolId)
        if (existingTool) {
          toast.error('Tool name already exists')
          return false
        }

        updateNode(id, 'generate-text', {
          dynamicHandles: {
            ...data.dynamicHandles,
            tools: data.dynamicHandles.tools.map(tool =>
              tool.id === toolId ? { ...tool, description: newDescription, name: newName } : tool
            )
          }
        })
        return true
      },
      [id, data.dynamicHandles, updateNode]
    ),
    handleDeleteNode = useCallback(() => deleteNode(id), [id, deleteNode])

  return (
    <GenerateTextNode
      data={{
        config: data.config,
        dynamicHandles: data.dynamicHandles,
        status: data.executionState?.status
      }}
      id={id}
      {...props}
      disableModelSelector
      onCreateTool={handleCreateTool}
      onDeleteNode={handleDeleteNode}
      onModelChange={handleModelChange}
      onRemoveTool={handleRemoveTool}
      onUpdateTool={handleUpdateTool}
    />
  )
}
