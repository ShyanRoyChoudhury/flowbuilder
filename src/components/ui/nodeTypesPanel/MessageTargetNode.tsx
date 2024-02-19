//import { ChangeEventHandler, useCallback } from 'react';
import {  Handle, Position } from 'reactflow';


function MessageNode({ isConnectable }:{ isConnectable: boolean | undefined}) {
  

  return (
    <div className="flex flex-col border border-black rounded-lg 
    shadow-2xl overflow-hidden bg-white"
    >
      <div className='bg-[#b2f1e2] font-semibold text-sm py-[0.5px] px-2'>
        Target
      </div>
      <div className='px-2 py-2'>
        <input id="text" name="text"  className="nodrag outline-none" placeholder='text message'/>
      </div>
      
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
    </div>
  );
}

export default MessageNode;