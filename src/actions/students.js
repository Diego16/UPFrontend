import config from '../config';
const base_url = config.base_url

export const fetchStudent = () => {
    return (dispatch, getState) => {
        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        return fetch(`${base_url}/students/`, { headers, })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return { status: res.status, data };
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return dispatch({ type: 'FETCH_STUDENT', student: res.data });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}
export const updateStudent = (wakeUpTime, sleepTime, workOnWeekends, workTime) => {
    return (dispatch, getState) => {
        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({
            'wakeUpTime': wakeUpTime,
            'sleepTime': sleepTime,
            'workOnWeekends': workOnWeekends,
            'workTime': workTime,
        });
        let noteId = getState().student.id;

        return fetch(`${base_url}/student/${noteId}/`, { headers, method: "PUT", body })
            .then(res => {
                if (res.status < 500) {
                    return res.json().then(data => {
                        return { status: res.status, data };
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 200) {
                    return dispatch({ type: 'UPDATE_STUDENT', note: res.data });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}