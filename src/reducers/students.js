const initialState = {
    student: null,
};


export default function students(state = initialState, action) {

    switch (action.type) {

        case 'FETCH_STUDENT':
            return {...state, student: action.student};

        case 'UPDATE_STUDENT':
            let noteToUpdate = action.student
            noteToUpdate.text = action.note.text;
            return action.student;

        default:
            return state;
    }
}