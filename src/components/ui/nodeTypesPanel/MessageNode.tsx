import { useDispatch, useSelector } from 'react-redux';
import {  Handle, Position } from 'reactflow';
import { updateTextBox } from '../../../features/nodeSlice';
import { useEffect, useState } from 'react';

import { BiMessageRoundedDetail } from "react-icons/bi";
import { AppDispatch } from '../../../store';

function MessageNode({ isConnectable }:{ isConnectable: boolean | undefined}) {
  const dispatch: AppDispatch = useDispatch();
  const [ inputValue, setInputValue ] = useState<string>('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
    const newValue = event.target.value;
    setInputValue(newValue); // Update the local state
    dispatch(updateTextBox(newValue));
  }

  const input = useSelector(state => state.message)
  useEffect(()=>{
    setInputValue(input)
  },[input])

  return (
    <div className="flex flex-col border border-black rounded-lg 
    shadow-2xl overflow-hidden bg-white"
    >
      <div className='flex items-center gap-1 bg-[#b2f1e2] font-semibold text-sm py-[0.5px] px-2'>
        <div><BiMessageRoundedDetail/></div>
        <p>Send Message</p>
      </div>
      <div className='px-2 py-2'>
        <input id="text" name="text" onChange={handleInput}
        value={inputValue}  className="nodrag outline-none" placeholder='text message'/>
      </div>
      
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
    </div>
  );
}

export default MessageNode;