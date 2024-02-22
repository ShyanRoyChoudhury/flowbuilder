import { FiArrowLeft } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../../store";
import { updateTextBox } from "../../../features/node/nodeSlice";
import { setSettingActive } from "../../../features/setting/settingSlice";
//import { RootState } from "../../store";
const SettingsPanel: React.FC = () => {
  const clickedNodeId: string | null = useSelector(
    (state: RootState) => state.node.clickedNodeId
  );

  const nodes = useSelector((state: RootState) => state.node.nodes);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    // hook to update the localstate of input if message for the particular node updated in store
    const node = nodes.find((node) => node.id === clickedNodeId);
    if (node) {
      setInputValue(node.message ?? "");
    }
  }, [clickedNodeId, nodes]);

  const dispatch: AppDispatch = useDispatch();
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // updates the state of text area and updates the message stored in store for the particular node
    const input = event.target.value;
    setInputValue(input);
    if (clickedNodeId) {
      dispatch(updateTextBox({ id: clickedNodeId, message: input }));
    }
  };

  const handleFocus = (active: boolean) => {
    // function to update the settingsActive state in store based on focus
    dispatch(setSettingActive(active));
  };

  return (
    <div
      className="w-full h-full"
      onFocus={() => handleFocus(true)}
      onBlur={() => handleFocus(false)}
    >
      <div className="flex items-center justify-center px-2.5 py-2">
        <p className="text-sm border border-transparent hover:border-[#E3E3E3] hover:shadow-md p-1">
          <FiArrowLeft />
        </p>
        <p className="mx-auto  text-sm">Message</p>
      </div>

      <div className="relative flex  items-center">
        <div className="flex-grow border-t border-[#E3E3E3]"></div>
      </div>

      <form className="p-2.5">
        <p className="text-[#a3a3a3] text-sm pt-2">Text</p>
        <textarea
          value={inputValue}
          onChange={handleInput}
          className="outline outline-[#E3E3E3] w-full rounded-md p-2 mt-2"
        />
      </form>

      <div className="relative flex py-2 items-center mt-2">
        <div className="flex-grow border-t border-[#E3E3E3]"></div>
      </div>
    </div>
  );
};

export default SettingsPanel;
