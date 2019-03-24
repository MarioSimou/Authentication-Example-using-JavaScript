import { combineReducers } from 'redux'
import * as T from '../actions/types'

const updateDisplayedPage = ( page = '/' , action) => {
    switch( action.type ){
        case T.UPDATE_DISPLAYED_PAGE: 
            return action.payload.href 
        default :
            return page
    }
}

const storeLoggedUser = ( user = null , action ) => {
    switch( action.type ){
        case T.STORE_LOGGED_USER:
            return action.payload.user
        default:
            return user
    }
}

export default combineReducers({ updateDisplayedPage , storeLoggedUser })