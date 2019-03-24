const _UTIL = Object.create( null )

_UTIL.createMessage = (...args) => {
    const [header , content , type ] = args
    
    return { header , content , type }
}

module.exports = _UTIL