export const OPEN_AUTHOR = 'OPEN_LOGIN'
export const CLOSE_AUTHOR = 'CLOSE_LOGIN'

export const OPEN_TRANS = 'OPEN_TRANS'
export const CLOSE_TRANS = 'CLOSE_TRANS'

export const openAuthor = (authorKind) => ({
    type: OPEN_AUTHOR,
    authorKind: authorKind
})

export const closeAuthor = () => ({
    type: CLOSE_AUTHOR
})

export const openTrans = () => ({
    type: OPEN_TRANS
})

export const closeTrans = () => ({
    type: CLOSE_TRANS
})