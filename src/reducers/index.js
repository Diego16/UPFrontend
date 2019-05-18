import { combineReducers } from 'redux';
import events from "./events";
import auth from "./auth";


const calendarApp = combineReducers({
    auth,
    events,
})

export default calendarApp;
