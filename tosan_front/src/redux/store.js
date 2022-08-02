import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import filterReducer from "./filterSlice"
import staticReducer from "./staticSlice"
import priceReducer from "./priceSlice"

const store = configureStore({
    reducer: {
        static: staticReducer,
        app: appReducer,
        filter: filterReducer,
        price: priceReducer,
    },
});

export default store