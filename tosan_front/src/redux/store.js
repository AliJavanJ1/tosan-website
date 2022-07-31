import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import filterReducer from "./filterSlice"
import staticReducer from "./staticSlice"

const store = configureStore({
    reducer: {
        static: staticReducer,
        app: appReducer,
        filter: filterReducer,
    },
});

export default store