import { App, Plugin } from "vue"

export declare type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(comp: T & { name: string }) => {
    (comp as SFCWithInstall<T>).install = (app: App): void => {
        app.component(comp.name, comp)
    }

    return comp
}
