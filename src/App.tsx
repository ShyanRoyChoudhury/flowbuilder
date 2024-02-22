import { useCallback, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  ReactFlowProvider,
  ReactFlowInstance,
  Connection,
} from "reactflow";

import Header from "./components/ui/Header.tsx";

import MessageNode from "./components/ui/sidepanel/nodeTypesPanel/MessageNode.tsx";
import "reactflow/dist/style.css";
import "./index.css";

import SidePanel from "./components/ui/sidepanel/SidePanel.tsx";

const nodeTypes = { message: MessageNode }; // Add new node types and name them

function App() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // react drag element
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      // on dropping the node in reactflow component
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      // check if the dropped element is valid & Ensure reactFlowInstance is available
      if (typeof type === "undefined" || !type || !reactFlowInstance) {
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

      // creating a newNode which is created on drop event
      const newNode = {
        id: "node-" + Math.random(),
        type,
        position,
        data: {
          label: `${type} node`,
          value: 0,
          id: "node-" + Math.random(),
          targetNode: "",
        },
      };
      setNodes((nds) => [...nds, newNode]);
      //dispatch(setClickedNode(newNode.id))
      // console.log(nodes);
    },
    [reactFlowInstance, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
      // Get the IDs of the source and target nodes
      const sourceNodeId = connection.source;
      const targetNodeId = connection.target;

      // Find the source and target nodes in the nodes array
      const sourceNode = nodes.find((node) => node.id === sourceNodeId);
      const targetNode = nodes.find((node) => node.id === targetNodeId);

      if (sourceNode && targetNode) {
        // Update the edges array for the source node
        sourceNode.data.targetNode = connection.target;

        // Update the nodes state to reflect the changes
        setNodes((prevNodes) => [
          ...prevNodes.filter(
            (node) => node.id !== sourceNodeId && node.id !== targetNodeId
          ),
          sourceNode,
          targetNode,
        ]);
      }
    },
    [nodes, setEdges, setNodes]
  );

  const onSave = () => {
    if (nodes.length <= 1) {
      // No need to check for empty targets if there's only one node
      console.log("Save operation successful");
      setError(false);
      return;
    }

    // list of nodes with empty targest
    const nodesWithEmptyTargets = nodes.filter(
      (node) => node.data && node.data.targetNode === ""
    );
    if (nodesWithEmptyTargets.length > 1) {
      console.error("Error: More than one node has empty target handles");
      setError(true);
      return;
    }

    // Proceed with save operation
    console.log("Save operation successful");
    setError(false);
  };

  return (
    <ReactFlowProvider>
      <Header onSave={onSave} error={error} />
      <div
        style={{ height: "95vh", width: "100vw" }}
        ref={reactFlowWrapper}
        className="z-0"
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
          <Controls />
          <SidePanel />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
