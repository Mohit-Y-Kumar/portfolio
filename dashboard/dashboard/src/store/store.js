import { configureStore } from "@reduxjs/toolkit";

import  userReducer  from "./slices/userSlices.js";
import forgotResetPasswordReducer from "./slices/forgotResetPasswordSlice"
import messagesReducer from "./slices/messagesSlice.js"
import timelineReducer from './slices/timelineSlice.js'
import skillReducer from './slices/skillSlice.js'
import  SoftwareApplicationReducer from "./slices/SoftwareApplicationSlice.js";
import ProjectReducer from "./slices/projectSlice.js"
const store =configureStore({
    reducer:{
        user:userReducer,
        forgotPassword:forgotResetPasswordReducer,
        messages:messagesReducer,
        timeline:timelineReducer,
        skill:skillReducer,
        application:SoftwareApplicationReducer,
        project:ProjectReducer,

    },
});

export default store;
