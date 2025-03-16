import React, { useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  useEdgesState,
  useNodesState
} from 'reactflow'
import 'reactflow/dist/style.css'
import GroupNode from './group-node'
import { COLORS } from '../utils'

const nodeTypes = { group: GroupNode }

const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Start Node' }, position: { x: 250, y: 100 } },
  { id: 'group-1', type: 'group', data: { label: 'Main Group' }, position: { x: 100, y: 200 } }
]

const initialEdges: Edge[] = []

const FlowCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [idCounter, setIdCounter] = useState(2)

  const addNode = (groupId?: string) => {
    const newNode: Node = {
      id: `node-${idCounter}`,
      data: { label: `Node ${idCounter}` },
      position: { x: 400, y: 300 },
      type: 'default'
    }
    setIdCounter((prev) => prev + 1)

    if (groupId) {
      const group = nodes.find((n) => n.id === groupId)
      if (group) {
        newNode.position = {
          x: group.position.x + 20,
          y: group.position.y + 50
        }
      }
    }

    setNodes((nds) => [...nds, newNode])
  }

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return

      setEdges((eds) => [
        ...eds,
        {
          ...connection,
          id: `edge-${connection.source}-${connection.target}`,
          animated: true,
          type: 'smoothstep'
        } as Edge
      ])
    },
    [setEdges]
  )

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={() => addNode()} style={{ marginBottom: '10px' }}>
        Add Node
      </button>
      <button onClick={() => addNode('group-1')} style={{ marginBottom: '10px' }}>
        Add Node to Group
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap
          nodeStrokeColor={(n) => (n.type === 'group' ? COLORS.groupBorder : COLORS.nodeStroke)}
          nodeColor={(n) => (n.type === 'group' ? COLORS.groupBackground : COLORS.nodeBackground)}
          nodeBorderRadius={5}
          style={{ backgroundColor: COLORS.minimapBackground }}
        />

        <Controls />

        <Background gap={15} size={1} color={COLORS.backgroundGrid} />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas
