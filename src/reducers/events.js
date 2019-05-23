const initialState = [];


export default function events(state=initialState, action) {
    let eventList = state.slice();

    switch (action.type) {

        case 'FETCH_EVENTS':
            return [...state, ...action.events];

        case 'ADD_EVENT':
            return [...state, action.note];

        case 'UPDATE_EVENT':
            let noteToUpdate = action.event
            eventList.splice(action.index, 1, noteToUpdate);
            return eventList;

        case 'DELETE_EVENT':
            eventList.splice(action.index, 1);
            return eventList;

        default:
            return state;
    }
}