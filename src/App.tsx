import { useCallback, useState, useRef } from 'react';
import ReactFlow, { 
    addEdge, 
    useNodesState,
    useEdgesState,
    Background, 
    Controls, 
    ReactFlowProvider, 
    ReactFlowInstance,
    Connection
  } from 'reactflow';

import MessageNode from './components/nodeTypes/MessageNode';
import MessageSourceNode from './components/ui/nodeTypesPanel/MessageSourceNode';
import MessageTargetNode from './components/ui/nodeTypesPanel/MessageTargetNode'
import 'reactflow/dist/style.css';
import './index.css';

import SidePanel from './components/ui/SidePanel';
//import { Node } from './types/nodeTypes';


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { message : MessageNode, messageSource: MessageSourceNode, messageTarget: MessageTargetNode };

function App() {

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);


  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    // Ensure reactFlowInstance is available
    if (!reactFlowInstance) {
      return;
    }

    // Get the position from reactFlowInstance
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // Check if position is available
    if (!position) {
      return;
    }

    const newNode = {
      id: 'node-' + Math.random(),
      type,
      position,
      data: { label: `${type} node`, value: 0 },
    };

    setNodes((nds) => [...nds, newNode]);
  },
  [reactFlowInstance, setNodes],
);


  return (
    <ReactFlowProvider>
        <div style={{ height: '95vh', width: '100vw' }}
          ref={reactFlowWrapper}
        >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background/>
          <Controls />

        </ReactFlow>
          <SidePanel/>
      </div>
   </ReactFlowProvider>
    
  )
}

export default App;