import { PropType } from 'vue'

declare interface ObserverCallabck {
    (entry: IntersectionObserverEntry, observer: MsIntersectionObserver): void
}

export interface KeyValue {
    [key: string]: string | number | undefined
}
export type BeforCloseFn = (action: string, done: Done) => void
export type Done = (b?: boolean) => void




// ------------------------------------- row component ------------------------------
export type RowDirection = PropType<'row' | 'row-reverse' | 'column' | 'column-reverse'>
export type RowWrap = PropType<'no' | 'reverse'>
export type RowJustify = PropType<'start' | 'center' | 'end' | 'between' | 'around'>
export type RowAlignItems = PropType<'start' | 'center' | 'end' | 'baseline' | 'stretch'>
export type RowAlignContent = PropType<'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'>
export interface RowProps {
    gutter?: number | string
    direction?: string
    wrap?: string
    justify?: string
    alignItems?: string
    alignContent?: string
    tag: string
}
// ------------------------------------- row component ------------------------------




// ------------------------------------- col component ------------------------------
export type ColAlign = PropType<'start' | 'center' | 'end' | 'baseline' | 'stretch'>
export type ColTextAlign = PropType<'left' | 'center' | 'right'>
export interface ColProps {
    span?: number | string
    offset?: number | string
    order?: number | string
    grow?: number | string
    shrink?: number | string
    basis?: number | string
    align?: ColAlign
    textAlign?: ColTextAlign
    tag: string
}
// ------------------------------------- col component ------------------------------





// ------------------------------------- image component ------------------------------
export type ImageFit = PropType<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'>
export interface ImageProps {
    src: string
    alt?: string
    title?: string
    fit?: ImageFit
    lazy: boolean
    width?: number | string
    height?: number | string
    radius?: number | string
}
// ------------------------------------- image component ------------------------------










// ------------------------------------- scrollbar component ------------------------------
export interface Scroll {
    containerWidth: number
    containerHeight: number
    visibleWidth: number
    visibleHeight: number
    widthRatio: number
    widthSize: number
    heightRatio: number
    heightSize: number
}


// ------------------------------------- scrollbar component ------------------------------





// ------------------------------------- overlay component ------------------------------
export interface OverlayProps {
    show: boolean
    zIndex?: number
    duration: number
    lockScroll: boolean
    className?: string | string[] | KeyValue
    customStyle?: KeyValue
}
// ------------------------------------- overlay component ------------------------------




// ------------------------------------- popup component ------------------------------
export type PopupPosition = PropType<'left' | 'right' | 'top' | 'bottom' | 'center'>
export interface PopupProps {
    show: boolean
    lockScroll: boolean
    overlay: boolean
    overlayClass?: string | string[] | KeyValue
    overlayStyle?: KeyValue
    position?: PopupPosition
    lazyRender: boolean
    closeOnPopstate: boolean
    closeOnClickOverlay: boolean
    beforeClose: BeforCloseFn
    teleport?: string | Element
}
// ------------------------------------- popup component ------------------------------




// ------------------------------------- radio component ------------------------------
export type RadioLabelPosition = PropType<'left' | 'right'>
export interface RadioGroupProps {
    modelValue: any,
    disabled: boolean
}
export interface RadioProps {
    name: any,
    labelPosition: string,
    disabled: boolean
}
// ------------------------------------- radio component ------------------------------




// ------------------------------------- checkbox component ------------------------------
export type CheckboxLabelPosition = PropType<'left' | 'right'>
export interface CheckboxGroupProps {
    modelValue: any[],
    disabled: boolean,
    max?: number | string
}
export interface CheckboProps {
    modelValue: boolean,
    name: any,
    labelPosition: string,
    disabled: boolean
    indeterminate: boolean
    bindGroup: boolean
}
// ------------------------------------- checkbox component ------------------------------




// ------------------------------------- table component ------------------------------
export type TableColumnType = PropType<'index' | 'text' | 'selection'>
export type TableColumnAlign = PropType<'left' | 'center' | 'right'>
export type TableColumnValign = PropType<'top' | 'middle' | 'bottom' | 'baseline'>
export type TableDiabledRowFn = (row: { [key: string]: any }, index: number) => boolean
export interface TableProps {
    data: { [key: string]: any }[],
    height?: number | string,
    maxHeight?: number | string,
    alwaysScrollbar: boolean
    bodyClassName?: string,
    headerClassName?: string,
    showHeader: boolean
}
export interface TableColumnProps {
    type: string,
    prop?: string,
    label?: string,
    width?: number | string
    headerAlign?: string
    align?: string
}
// ------------------------------------- table component ------------------------------













export type InputKind = PropType<'text' | 'password' | 'number' | 'textarea'>
export type ButtonIconPosition = PropType<'left' | 'right' | 'top' | 'bottom'>

export interface SliderProps {
    modelValue: number
    reverse: boolean
    disabled: boolean
    readonly: boolean
    vertical: boolean
    max: number| string
    min: number| string
    step: number| string
    activeColor?: string
    inactiveColor?: string,
    allowClickBar: boolean
}



export interface IconProps {
    name: string
    classPrefix: string
    color?: string
    size?: number | string
    rotate?: number
    tag: string
}

export interface InputProps {
    // type: InputKind // 你赢了
    type: string // 你赢了
    modelValue: string
    maxlength?: number | string
    minlength?: number | string
    placeholder?: string
    clearable: boolean
    readonly: boolean
    disabled: boolean
    autofocus: boolean
    prefixIcon?: string
    suffixIcon?: string
    rows?: number | string
    maxRows?: number | string
    autosize: boolean
    autocomplete: string
    resize: boolean
    form?: string
    label?: string
    name?: string
    min?: number | string
    max?: number | string
    step: number | string
    tabindex?: number | string
}

export interface ProgressProps {
    value: number | string
    strokeWidth?: number | string
    color?: string
    trackColor?: string
    showText: boolean
    stripes: boolean
}

export interface ButtonProps {
    actived: boolean,
    keyboard?: string | string[]
    icon?: string,
    iconPosition?: ButtonIconPosition,
    block: boolean,
    loading: boolean,
    disabled: boolean,
    color?: string,
    activedColor?: string,
    textColor?: string,
    activedTextColor?: string,
    radius?: number | string,
    tag: string
}

export interface DialogProps {
    modelValue: boolean,
    title?: string,
    titleIcon?: string,
    width: number | string,
    showConfirmButton: boolean,
    confirmButtonText: string,
    showCancelButton: boolean,
    cancelButtonText: string,
    beforeClose: BeforCloseFn
}


