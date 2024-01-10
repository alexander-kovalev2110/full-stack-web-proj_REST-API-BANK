import { BaseAction } from '../interfaces'

export enum AlertActionType {
    OPEN_ALERT = 'OPEN_ALERT',
    CLOSE_ALERT = 'CLOSE_ALERT'
}

type AlertMessage = string

export type AlertAction = BaseAction<AlertActionType, AlertMessage>

export const openAlert = (payload: AlertMessage): AlertAction => ({
    type: AlertActionType.OPEN_ALERT,
    payload
})

export const closeAlert = (): AlertAction => ({
    type: AlertActionType.CLOSE_ALERT
})
