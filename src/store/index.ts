//redux store

import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "../features/node/nodeSlice";
import settingsReducer from "../features/setting/settingSlice";
export const store = configureStore({
    reducer:{
        node: nodeReducer,
        settings: settingsReducer
    }  
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch