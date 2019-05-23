import { combineReducers } from 'redux';
import events from "./events";
import auth from "./auth";
import students from "./students";
import tasks from "./tasks";


const calendarApp = combineReducers({
    auth,
    events,
    students,
    tasks,
})

export default calendarApp;
