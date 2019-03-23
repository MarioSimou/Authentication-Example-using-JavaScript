const _UTIL = Object.create( null )

// Method that returns an object with JAVASCRIPT Datatypes
_UTIL.JS_TYPES = () => ({
    String: '[object String]',
    Array: '[object Array]',
    Object: '[object Object]',
    Set: '[object Set]',
    Number: '[object Number]'
})

// routine that determines the dataype of an input
_UTIL.hasValue = (v) => {
    const JS_TYPES = _UTIL.JS_TYPES()
    const type = Object.prototype.toString.call(v)

    switch (type) {
        case JS_TYPES.String:
        case JS_TYPES.Array:
            return v.length > 0 ? true : false
        case JS_TYPES.Object:
            return Object.values(v).length > 0 ? true : false
        case JS_TYPES.Number:
            return Number(v).toString().length > 0 ? true : false
        default:
            return null
    }
}

export { _UTIL }