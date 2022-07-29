import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import filterReducer from "./filterSlice"

const store = configureStore({
    reducer: {
        app: appReducer,
        filter: filterReducer,
    },
});

export default store