import api from '../../api'



export const SET_USERS = 'SET_USERS'
export const fetchUsers = () => (dispatch) => {
    api.get('/').then(({data}) => dispatch({type: SET_USERS, payload: data.sort((a, b) => a.place - b.place)}));
}

export const sortUsers = (users) => (dispatch) => {
    const newUsers = users.map((item) => { return {name: item.name, hits: item.hits, rate: item.rate, place: item.place, id: item.id}})
    dispatch({type: SET_USERS, payload: newUsers});
}