import { ReactElement } from "react"

export interface Node{
    id?: string,
    type?: string,
    position?: {
        x: number,
        y: number
    },
    data?: {
        label?: string,
        value?: number,
        id?: string,
        targetNode?: string
    },
    icon?: ReactElement,
    text?: string,
    message?: string
}