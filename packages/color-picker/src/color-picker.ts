import { InjectionKey, ReactiveEffect } from "vue"
import { HSL } from '@/utils/color'

export const colorValue: InjectionKey<HSL> = Symbol()
export const colorOnchange: InjectionKey<(h?: number, s?: number, l?: number, a?: number) => boolean> = Symbol()



export const colorPickerProps = {

}





