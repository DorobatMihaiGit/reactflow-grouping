import React from 'react'
import { Handle, NodeProps, Position } from 'reactflow'
import { COLORS } from '../utils'

const GroupNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      style={{
        border: `2px solid ${COLORS.groupBorder}`,
        borderRadius: '10px',
        padding: '20px',
        background: COLORS.groupBackground,
        minWidth: '200px',
        minHeight: '150px',
        position: 'relative'
      }}
    >
      <strong>{data.label || 'Group Node'}</strong>

      <Handle type="source" position={Position.Top} id="top-source" />
      <Handle type="target" position={Position.Top} id="top-target" />

      <Handle type="source" position={Position.Bottom} id="bottom-source" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" />

      <Handle type="source" position={Position.Left} id="left-source" />
      <Handle type="target" position={Position.Left} id="left-target" />

      <Handle type="source" position={Position.Right} id="right-source" />
      <Handle type="target" position={Position.Right} id="right-target" />
    </div>
  )
}

export default GroupNode
