// NodeTypePanel component for each node type to start the drag event

import { Node } from "../../../types/nodeTypes";
const NodeTypePanel = ({ icon, text, type }: Node) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string | undefined
  ) => {
    if (nodeType) {
      // safeguard against undefined typeerror
      event.dataTransfer.setData("application/reactflow", nodeType);
      // Set the effect allowed for the drag-and-drop operation
      event.dataTransfer.effectAllowed = "move";
    }
  };

  const renderDragStart = (event: React.DragEvent<HTMLDivElement>) =>
    onDragStart(event, type); // Set data for the drag-and-drop operation

  return (
    <div
      className="flex flex-col p-2 items-center justify-center text-[#8890c0] border-[#8890c0] col-span-1 border"
      onDragStart={renderDragStart}
      draggable
    >
      <p>{icon}</p>
      <p>{text}</p>
    </div>
  );
};

export default NodeTypePanel;
