import * as TYPES from './types.js'

// action that records the current displayed page
const displayedPage = href => ({
    type: TYPES.UPDATE_DISPLAYED_PAGE,
    payload: { href }
})

export { displayedPage }