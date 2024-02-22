// slice for node specific operations

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Node }  from '../../types/nodeTypes'


interface NodeState {
    nodes: Node[];
    clickedNodeId : string | null;
}

const initialState: NodeState = {
    nodes: [],
    clickedNodeId: null
};

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers:{
        //updates the message in their specific nodes
        updateTextBox: (state, action: PayloadAction<{id: string, message: string}>) => {
            const { id, message, } = action.payload;
            const node = state.nodes.find((node)=> node.id === id);
            if(node){
                node.message = message;
            }else{
                const newNode: Node = { id, message,}
                state.nodes.push(newNode)
            }
        },
        // stores which node is clicked or is set to null
        setClickedNode: (state, action: PayloadAction<string | null>) => {
            state.clickedNodeId = action.payload
        }
    }
})


export const { updateTextBox, setClickedNode } = nodeSlice.actions;
export default nodeSlice.reducer;