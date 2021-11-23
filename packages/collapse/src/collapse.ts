import { InjectionKey, Ref } from "vue";

export const collapseValue: InjectionKey<Ref<number | string | any[] | null>> = Symbol()
export const collapseOnchange: InjectionKey<(val: any, isOpen: boolean) => boolean> = Symbol()
