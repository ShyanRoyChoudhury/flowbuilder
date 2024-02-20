import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Node }  from '../types/nodeTypes'


interface NodeState {
    nodes: Node[];
}

const initialState: NodeState = {
    nodes: []
};

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers:{
        updateTextBox: (state, action: PayloadAction<{id: string, message: string}>) => {
            const { id, message } = action.payload;
            const node = state.nodes.find((node)=> node.id === id);
            if(node){
                node.message = message;
            }
        }
    }
})


export const { updateTextBox } = nodeSlice.actions;
export default nodeSlice.reducer;