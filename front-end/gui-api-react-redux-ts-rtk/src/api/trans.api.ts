// src/api/trans.api.ts
import { axiosInstance } from "./axiosInstance"
import { buildTransRequest } from "./trans.request.builder"
import { TransQuery } from "../store/trans/trans.types"
import { AxiosResponse } from "axios"

export const transApi = {
  exec: <T = unknown>(payload: TransQuery): Promise<AxiosResponse<T>> => {
    const requestConfig = buildTransRequest(payload)
    return axiosInstance(requestConfig)
  },
}
