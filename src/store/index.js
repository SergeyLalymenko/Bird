import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/users'



export default createStore(reducer, applyMiddleware(thunk))