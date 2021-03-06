import { SET_USERS } from '../actions/users'

const initialState = {
    users: [],
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case SET_USERS: return {...state, users: payload}

        default: return state
    }
}