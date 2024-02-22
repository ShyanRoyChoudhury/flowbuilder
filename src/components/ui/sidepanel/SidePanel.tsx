// SidePanel component

import NodeTypePanel from "./NodeTypePanel"; // Importing NodeTypePanel component
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Node } from "../../../types/nodeTypes";
import SettingsPanel from "./SettingsPanel";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const nodeTypes: Node[] = [
  {
    icon: <BiMessageRoundedDetail size={40} />,
    text: "Message",
    type: "message",
  },
  // Add more node types here to render in sidepanel
];

const SidePanel: React.FC = () => {
  const clickedNodeId: string | null = useSelector(
    (state: RootState) => state.node.clickedNodeId
  );
  const settingsActive = useSelector(
    (state: RootState) => state.settings.settingActive
  );

  return (
    <div className="sidepanel border shadow-lg rounded-sm h-screen w-48 md:w-56 lg:w-80 bg-white border-[#E3E3E3]">
      {/* renders the node types if no node is clicked and settings panel is not active else renders settings panel */}
      {clickedNodeId || settingsActive ? (
        <SettingsPanel />
      ) : (
        <div className="p-2">
          <div className="font-semibold text-2xl">Nodes Panel</div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* mapping the various types types in this component based on the properties */}
            {nodeTypes.map((nodeType, index) => (
              <NodeTypePanel
                key={index}
                icon={nodeType.icon}
                text={nodeType.text}
                type={nodeType.type}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
