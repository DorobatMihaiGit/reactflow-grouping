import React from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge
} from 'reactflow'
import 'reactflow/dist/style.css'

const initialNodes: Node[] = [
  { id: '1', type: 'default', data: { label: 'Start Node' }, position: { x: 250, y: 100 } }
]

const initialEdges: Edge[] = []

const FlowCanvas: React.FC = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div style={{ width: '100%', height: '90vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}

export default FlowCanvas
