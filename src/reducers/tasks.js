const initialState = [];


export default function tasks(state=initialState, action) {
    let taskList = state.slice();

    switch (action.type) {

        case 'FETCH_TASKS':
            return [...state, ...action.tasks];

        case 'ADD_TASK':
            return [...state, action.note];

        case 'UPDATE_TASK':
            let noteToUpdate = taskList[action.id]
            noteToUpdate.text = action.note.text;
            taskList.splice(action.id, 1, noteToUpdate);
            return taskList;

        case 'DELETE_TASK':
            taskList.splice(action.id, 1);
            return taskList;

        default:
            return state;
    }
}