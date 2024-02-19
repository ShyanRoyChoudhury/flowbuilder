import { ReactElement } from "react"

export interface Node{
    id?: string,
    type: string,
    position?: {
        x: number,
        y: number
    },
    data?: {
        label?: string,
        value?: number
    },
    icon?: ReactElement,
    text?: string 
}