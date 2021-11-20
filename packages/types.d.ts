import { PropType } from 'vue'

// 常用类型申明
// ui size
export declare type MzzsUISize = 'large' | 'medium' | 'small'
// ui direction
export declare type MzzsUIDirection = 'up' | 'right' | 'down' | 'left'
// css position
export declare type MzzsUIPosition = 'relative' | 'absolute' | 'fixed'
// ui location
export declare type MzzsUILocation = 'top' | 'right' | 'bottom' | 'left'
// ui coordinate
export declare type MzzsUICoordinate = { x: number, y: number, z: number }
// css object-fit
export declare type MzzsUIImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
// css text-align
export declare type MzzsUITextAlign = 'left' | 'center' | 'right'
// The method to decide whether the execution is completed 
export declare type Done = (b?: boolean) => void
// Function run before update
export declare type BeforUpdateFn = (action: any, done: Done) => void






// TODO: 重写
export declare interface DomRectDetail extends DOMRect {
    contentWidth: number
    contentHeight: number
    paddingLeft: number
    paddingRight: number
    paddingTop: number
    paddingBottom: number
    offsetX?: number
    offsetY?: number
}


export declare interface ObserverCallabck {
    (entry: IntersectionObserverEntry, observer: MsIntersectionObserver): void
}
export declare type Done = (b?: boolean) => void
export declare type ComponentClass = string | string[] | Record<string, boolean> | undefined
export declare type ComponentStyle = Record<string, any>
export declare type FormatFunction<T, R> = (val: any, extra?: T) => R
export declare type smoothCallback = (val:{ to: number, done: boolean }) => void
export declare type BeforeChangeFn = (newVal: any, oldVal: any, done: Done) => void


export interface KeyValue {
    [key: string]: string | number | undefined
}


// ------------------------------------- row component ------------------------------
export declare type RowDirection = PropType<'row' | 'row-reverse' | 'column' | 'column-reverse'>
export declare type RowWrap = PropType<'no' | 'reverse'>
export declare type RowJustify = PropType<'start' | 'center' | 'end' | 'between' | 'around'>
export declare type RowAlignItems = PropType<'start' | 'center' | 'end' | 'baseline' | 'stretch'>
export declare type RowAlignContent = PropType<'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'>
export declare interface RowProps {
    gutter?: number | string
    direction?: RowDirection
    wrap?: RowWrap
    justify?: RowJustify
    alignItems?: RowAlignItems
    alignContent?: RowAlignContent
    tag: string
}
// ------------------------------------- row component ------------------------------



// ------------------------------------- col component ------------------------------
export declare type ColAlign = PropType<'start' | 'center' | 'end' | 'baseline' | 'stretch'>
export declare type ColTextAlign = PropType<'left' | 'center' | 'right'>
export declare interface ColProps {
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
export declare type ImageFit = PropType<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'>
export declare interface ImageProps {
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



// ------------------------------------- avatar component ------------------------------
export declare type AvatarSize = PropType<number | string | 'large' | 'medium' | 'small'>
export declare interface AvatarProps {
    src: string
    alt?: string
    title?: string
    fit?: ImageFit
    size?: AvatarSize
    radius?: number | string
    tag: string
}
// ------------------------------------- avatar component ------------------------------



// ------------------------------------- overlay component ------------------------------
export declare type OverlaypPosition = PropType<'relative' | 'absolute' | 'fixed'>
export declare interface OverlayProps {
    show: boolean
    lockScroll: boolean
    position?: OverlaypPosition
    zIndex?: number | string
    className: ComponentClass
    customStyle?: ComponentStyle
}
// ------------------------------------- overlay component ------------------------------



// ------------------------------------- icon component ------------------------------
export declare interface IconProps {
    name: string
    classPrefix: string
    color?: string
    size?: number | string
    rotate?: number
    tag: string
}
// ------------------------------------- icon component ------------------------------



// ------------------------------------- icon component ------------------------------
export declare interface TabsProps {
    modelValue: any
    type: 'line' | 'card' | 'border-card'
    tabPosition: 'top' | 'right' | 'bottom' | 'left'
    lineWidth: number | string
    lineStrokeWidth: number | string
    lineHeight: number | string
    titleActiveColor: string
    titleInactiveColor: string
    closable: boolean
    beforeChange: BeforeChangeFn
}
// ------------------------------------- icon component ------------------------------




// ------------------------------------- icon component ------------------------------
export declare interface CellProps {
    title: number | string
    value: number | string
    label: number | string
    size: MzzsUISize
    required: boolean
    border: boolean
    center: boolean
    url: string,
    to: string | RouteLocationRaw
    replace: boolean
    clickable: boolean
    isLink: boolean
    icon: string
    iconPrefix: string
    arrowDirection: MzzsUIDirection
    titleClass: any
    valueClass: any
    labelClass: any
}
// ------------------------------------- icon component ------------------------------

























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


