import * as T from './types.js'

// action that records the current displayed page
const displayedPage = href => ({
    type: T.UPDATE_DISPLAYED_PAGE,
    payload: { href }
})

const loggedUser = user => ({
    type : T.STORE_LOGGED_USER,
    payload : { user }
})

export { displayedPage , loggedUser }