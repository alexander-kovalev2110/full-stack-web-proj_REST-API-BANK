export const OPEN_ALERT = 'OPEN_ALERT'
export const CLOSE_ALERT = 'CLOSE_ALERT'

export const openAlert = (message) => ({
    type: OPEN_ALERT,
    errMessage: message
})

export const closeAlert = () => ({
    type: CLOSE_ALERT
})
