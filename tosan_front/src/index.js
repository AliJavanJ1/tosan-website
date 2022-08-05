import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {Helmet} from "react-helmet";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Helmet>
                <title>گروه شرکت‌های توسن</title>
            </Helmet>
            <App/>
        </Provider>
    </React.StrictMode>
);
