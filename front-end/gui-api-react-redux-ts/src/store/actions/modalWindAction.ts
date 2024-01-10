import { BaseAction, AuthorKind } from '../interfaces'

export enum ModalActionType {
    OPEN_AUTHOR = 'OPEN_AUTHOR',
    CLOSE_AUTHOR = 'CLOSE_AUTHOR',
    OPEN_TRANS = 'OPEN_TRANS',
    CLOSE_TRANS = 'CLOSE_TRANS'
}

export type ModalAction = BaseAction<ModalActionType, AuthorKind>

export const openAuthor = (payload: AuthorKind): ModalAction => ({
    type: ModalActionType.OPEN_AUTHOR,
    payload
})

export const closeAuthor = (): ModalAction => ({
    type: ModalActionType.CLOSE_AUTHOR
})

export const openTrans = (): ModalAction => ({
    type: ModalActionType.OPEN_TRANS
})

export const closeTrans = (): ModalAction => ({
    type: ModalActionType.CLOSE_TRANS
})
