import NodeTypePanel from '../NodeTypePanel'; // Importing NodeTypePanel component
import { Panel } from 'reactflow';
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Node } from '../../types/nodeTypes';

// SidePanel component

const nodeTypes: Node[] = [
    { icon: <BiMessageRoundedDetail size={40} />, text: 'Message', type: 'message'},
    { icon: <BiMessageRoundedDetail size={40} />, text: 'Message Source', type: 'messageSource'},
    { icon: <BiMessageRoundedDetail size={40} />, text: 'Message Target', type: 'messageTarget'},
    // Add more node types here
  ];

const SidePanel: React.FC = () => {

    return (
        <Panel position="top-right" 
        className='border shadow-lg rounded-md p-2 h-screen w-48 md:w-56 lg:w-80 bg-white'
        >
            <div className='font-semibold text-2xl'>
                Nodes Panel
            </div>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Mapping through nodeTypes to create grid items */}
                {nodeTypes.map((nodeType, index) => (
                    <NodeTypePanel 
                        key={index} 
                        icon={nodeType.icon} 
                        text={nodeType.text} 
                        type={nodeType.type}
                    />
                ))}
            </div>
        </Panel>
    );
};

export default SidePanel;
