import { combineReducers } from "@reduxjs/toolkit";
// slices
import { baseApiSlice } from "./api/base-api";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";

export const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "RA-",
    // whitelist: [],
    stateReconciler: hardSet,
};

const rootReducer = combineReducers({
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
});

export default rootReducer;
