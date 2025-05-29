const actionWrapper = ({ action, defaultValue, onError }) => {
    return async (...args) => {
      try {
        const returnValue = await action(...args)
        return returnValue !== undefined ? returnValue : defaultValue
      } catch (error) {
        return await onError(error, defaultValue, ...args)
      }
    }
  }
  
  export default actionWrapper