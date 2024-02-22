// Message node

// more nodes can be added in the nodeTypesPanel as per requirement

import { useDispatch, useSelector } from "react-redux";
import { Handle, Position } from "reactflow";
import {
  setClickedNode,
  updateTextBox,
} from "../../../../features/node/nodeSlice";
import { useEffect, useState } from "react";

import { BiMessageRoundedDetail } from "react-icons/bi";
import { AppDispatch, RootState } from "../../../../store";
import useClickOutside from "../../../../utils/useClickOutside";

function MessageNode({
  isConnectable,
  data,
}: {
  isConnectable: boolean | undefined;
  data: { id: string };
}) {
  const dispatch: AppDispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");

  // updates the state inside input box and redux store
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handles the eventchange on writing inside inputbox
    const newValue = event.target.value;
    setInputValue(newValue); // Update the local state
    dispatch(updateTextBox({ id: data.id, message: newValue })); // updates the redux store
  };

  const input = useSelector((state: RootState) => {
    // updates the input box when changing the contents of textarea in settings panel
    const node = state.node.nodes.find((node) => node.id === data.id);
    return node ? node.message : "";
  });

  useEffect(() => {
    setInputValue(input ?? "");
  }, [input]);

  const clickedNodeId = useSelector(
    (state: RootState) => state.node.clickedNodeId
  );
  const handleNodeClick = () => {
    // on clikcing the node stores the node id in redux store
    if (data.id !== clickedNodeId) {
      dispatch(setClickedNode(data.id));
    }
  };

  useClickOutside(".MessageNode", () => {
    // adding eventhandler that resets the focus of the mouse click to outside of loop
    dispatch(setClickedNode(null));
  });

  return (
    <div
      className={`MessageNode flex flex-col border border-black rounded-lg 
    shadow-2xl overflow-hidden bg-white ${
      clickedNodeId === data.id ? "border-[#444d8a] border-2" : ""
    } `}
      onClick={handleNodeClick}
    >
      <div className="flex items-center gap-1 bg-[#b2f1e2] font-semibold text-sm py-[0.5px] px-2">
        <div>
          <BiMessageRoundedDetail />
        </div>
        <p>Send Message</p>
      </div>
      <div className="px-2 py-2">
        <input
          id="text"
          name="text"
          onChange={handleInput}
          value={inputValue}
          className="nodrag outline-none"
          placeholder="text message"
        />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default MessageNode;
