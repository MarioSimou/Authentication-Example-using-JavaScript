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


export default combineReducers({ updateDisplayedPage })