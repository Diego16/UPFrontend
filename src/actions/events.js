import config from '../config';
const base_url = config.base_url

export const fetchEvents = () => {
    return (dispatch, getState) => {
        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        return fetch(`${base_url}/events`, { headers, })
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
                    return dispatch({ type: 'FETCH_EVENTS', events: res.data });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}

export const addEvent = text => {
    return (dispatch, getState) => {
        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({ text, });
        return fetch(`${base_url}/create_event`, { headers, method: "POST", body })
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
                if (res.status === 201) {
                    return dispatch({ type: 'ADD_EVENT', note: res.data });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}

export const updateEvent = (index, text) => {
    return (dispatch, getState) => {

        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let body = JSON.stringify({ text, });
        let noteId = getState().Events[index].id;

        return fetch(`${base_url}/events/${noteId}/`, { headers, method: "PUT", body })
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
                    return dispatch({ type: 'UPDATE_EVENT', note: res.data, index });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}

export const deleteEvent = index => {
    return (dispatch, getState) => {

        let headers = { "Content-Type": "application/json" };
        let { token } = getState().auth;

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        let noteId = getState().events[index].id;

        return fetch(`${base_url}/events/${noteId}/`, { headers, method: "DELETE" })
            .then(res => {
                if (res.status === 204) {
                    return { status: res.status, data: {} };
                } else if (res.status < 500) {
                    return res.json().then(data => {
                        return { status: res.status, data };
                    })
                } else {
                    console.log("Server Error!");
                    throw res;
                }
            })
            .then(res => {
                if (res.status === 204) {
                    return dispatch({ type: 'DELETE_EVENTS', index });
                } else if (res.status === 401 || res.status === 403) {
                    dispatch({ type: "AUTHENTICATION_ERROR", data: res.data });
                    throw res.data;
                }
            })
    }
}
