import { configureStore } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from "redux-persist";
import { baseApiSlice } from "./api/base-api";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer, { rootPersistConfig } from "./root-reducer";

const reducer = persistReducer<ReturnType<typeof rootReducer>>(rootPersistConfig, rootReducer);

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            // immutableCheck: false,
        }).concat(baseApiSlice.middleware),

    devTools: process.env.NODE_ENV !== "production",
});

// enable listener behavior for the store
setupListeners(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

