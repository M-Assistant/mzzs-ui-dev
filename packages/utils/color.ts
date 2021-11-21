import { isOnePointZero, isPercentage } from './validator'

const INT_HEX_MAP = { 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F' }
const HEX_INT_MAP = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 }

// @ts-ignore
const toHex = function({ r, g, b }) {
    // @ts-ignore
    const hexOne = function(value) {
        value = Math.min(Math.round(value), 255)
        const high = Math.floor(value / 16)
        const low = value % 16
        // @ts-ignore
        return '' + (INT_HEX_MAP[high] || high) + (INT_HEX_MAP[low] || low)
    }
  
    if (isNaN(r) || isNaN(g) || isNaN(b)) return ''
  
    return '#' + hexOne(r) + hexOne(g) + hexOne(b)
}


const hsv2hsl = function(hue: number, sat: number, val: number) {
    return [
        hue,
        (sat * val / ((hue = (2 - sat) * val) < 1 ? hue : 2 - hue)) || 0,
        hue / 2
    ]
}
  

// Take input from [0, n] and return it as [0, 1]
const bound01 = function(value: any, max: any) {
    if (isOnePointZero(value)) value = '100%';

    const processPercent = isPercentage(value);
    value = Math.min(max, Math.max(0, parseFloat(value)));

    // Automatically convert percentage into number
    if (processPercent) {
        // @ts-ignore
        value = parseInt(value * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(value - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (value % max) / parseFloat(max);
}


const parseHexChannel = function(hex: any) {
    if (hex.length === 2) {
        // @ts-ignore
        return (HEX_INT_MAP[hex[0].toUpperCase()] || +hex[0]) * 16 + (HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1])
    }
    // @ts-ignore
    return HEX_INT_MAP[hex[1].toUpperCase()] || +hex[1]
}
  
const hsl2hsv = function(hue: number, sat: number, light: number) {
    sat = sat / 100;
    light = light / 100;
    let smin = sat;
    const lmin = Math.max(light, 0.01);
    let sv;
    let v;

    light *= 2;
    sat *= (light <= 1) ? light : 2 - light;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    v = (light + sat) / 2;
    sv = light === 0 ? (2 * smin) / (lmin + smin) : (2 * sat) / (light + sat);

    return {
        h: hue,
        s: sv * 100,
        v: v * 100
    }
}
  
// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
const rgb2hsv = function(r: any, g: any, b: any) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
  
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    let v = max;
  
    const d = max - min;
    s = max === 0 ? 0 : d / max;
  
    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
            case g:
            h = (b - r) / d + 2;
            break;
            case b:
            h = (r - g) / d + 4;
            break;
        }
        // @ts-ignore
        h /= 6;
    }
    // @ts-ignore
    return { h: h * 360, s: s * 100, v: v * 100 }
}
  
// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
const hsv2rgb = function(h: any, s: any, v: any) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
  
    const i = Math.floor(h);
    const f = h - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    const mod = i % 6;
    const r = [v, q, p, p, t, v][mod];
    const g = [t, v, v, q, p, p][mod];
    const b = [p, p, t, v, v, q][mod];
  
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
}


export default class Color {
    // 用一个数值表示 rgb 颜色值
    // private value: number
    // 用一个数值表示 alpha
    // private alpha: number 
    // #ffffff

    // 名词解释：
    // HSV: H(色调) S(饱和度) V(明度)；H取值范围：0°～360°，S取值范围：0%～100%，V取值范围：0%～100%，
    // HSL: H(色调) S(饱和度) L(亮度)；H取值范围：0°～360°，S取值范围：0%～100%，L取值范围：0%～100%，
    // RGB: R(红) G(绿) B(蓝)

    // 构造函数
    // 可传入 整型。如：0xFFF、0xFFFFFF、0xFFFF00
    // 可传入 字符串。如：
    //   rgb(0,0,0)、rgba(0,0,0,1)
    //   hsl(11deg 11% 74% / 99%)
    //   hsl(11deg 11% 74%)
    //   hsv(11deg 88% 74% / 99%) // 
    //   hsv(11deg 11% 74%)
    // constructor(value: string | number) {}

    // 设置颜色
    // set(value: string | number) {}

    // 设置颜色透明度
    // setAlpha(value: number) {}
    
    // 设置三原色
    // setHue(r?: number, g?: number, b?: number, a?: number) {}
    // setHsv(h?: number, s?: number, v?: number, a?: number) {}
    // setHsl(h?: number, s?: number, l?: number, a?: number) {}

    // 获取颜色
    // get(alpha?: boolean): number { return value }
    // getHue(): {r, g, b} { }
    // getHueAlpha(): {r, g, b, a} { }
    // getHsv(): { h, s, v } { }
    // getHsvAlpha(): { h, s, v, a } { }
    // getHsl(): { h, s, l } { }
    // getHslAlpha(): { h, s, l, a } { }
    
    // 是否有透明度
    // hasAlpha(): boolean

    // 获取颜色字符串
    // toString(): string { // #333333 }
    // toHueString(): string { // rgb(0,0,0) } 
    // toHueAlphaString(): string { // rgba(0,0,0) } 
    // toHsvString(): string { // hsv(0deg,0%,0%) }
    // toHsvAlphaString(): string { // hsv(0deg,0%,0% / 0%) }
    // totHslString(): string { // hsl(0deg,0%,0%) }
    // toHslAlphaString(): string { // hsl(0deg,0%,0% / 0%) }

    _hue: number
    _saturation: number
    _value: number
    _alpha: number
    enableAlpha: boolean
    format: string
    value: string

    // @ts-ignore
    constructor(options) {
        this._hue = 0;
        this._saturation = 100;
        this._value = 100;
        this._alpha = 100;
    
        this.enableAlpha = false;
        this.format = 'hex';
        this.value = '';
    
        options = options || {};
    
        for (let option in options) {
            if (options.hasOwnProperty(option)) {
                // @ts-ignore
                this[option] = options[option];
            }
        }
  
      this.doOnChange();
    }
  
    // @ts-ignore
    set(prop, value) {
      if (arguments.length === 1 && typeof prop === 'object') {
        for (let p in prop) {
          if (prop.hasOwnProperty(p)) {
            this.set(p, prop[p]);
          }
        }
  
        return;
      }
  
    // @ts-ignore
    this['_' + prop] = value;
        this.doOnChange();
    }
  
    // @ts-ignore
    get(prop) {
        // @ts-ignore
        return this['_' + prop];
    }
  
    toRgb() {
      return hsv2rgb(this._hue, this._saturation, this._value);
    }
  
    // @ts-ignore
    fromString(value) {
        if (!value) {
            this._hue = 0;
            this._saturation = 100;
            this._value = 100;
    
            this.doOnChange();
            return;
        }
  
        // @ts-ignore
        const fromHSV = (h, s, v) => {
            this._hue = Math.max(0, Math.min(360, h));
            this._saturation = Math.max(0, Math.min(100, s));
            this._value = Math.max(0, Math.min(100, v));
    
            this.doOnChange();
        };
  
        if (value.indexOf('hsl') !== -1) {
            const parts = value.replace(/hsla|hsl|\(|\)/gm, '')
            .split(/\s|,/g)
            // @ts-ignore
            .filter((val) => val !== '')
            // @ts-ignore
            .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
    
            if (parts.length === 4) {
                this._alpha = Math.floor(parseFloat(parts[3]) * 100);
            } else if (parts.length === 3) {
                this._alpha = 100;
            }
            if (parts.length >= 3) {
                const { h, s, v } = hsl2hsv(parts[0], parts[1], parts[2]);
                fromHSV(h, s, v);
            }
        } else if (value.indexOf('hsv') !== -1) {
            const parts = value.replace(/hsva|hsv|\(|\)/gm, '')
            .split(/\s|,/g)
            // @ts-ignore
            .filter((val) => val !== '')
            // @ts-ignore
            .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
    
            if (parts.length === 4) {
                this._alpha = Math.floor(parseFloat(parts[3]) * 100);
            } else if (parts.length === 3) {
                this._alpha = 100;
            }
            if (parts.length >= 3) {
                fromHSV(parts[0], parts[1], parts[2]);
            }
        } else if (value.indexOf('rgb') !== -1) {
            const parts = value.replace(/rgba|rgb|\(|\)/gm, '')
            .split(/\s|,/g)
            // @ts-ignore
            .filter((val) => val !== '')
            // @ts-ignore
            .map((val, index) => index > 2 ? parseFloat(val) : parseInt(val, 10));
    
            if (parts.length === 4) {
                this._alpha = Math.floor(parseFloat(parts[3]) * 100);
            } else if (parts.length === 3) {
                this._alpha = 100;
            }
            if (parts.length >= 3) {
                const { h, s, v } = rgb2hsv(parts[0], parts[1], parts[2]);
                fromHSV(h, s, v);
            }
        } else if (value.indexOf('#') !== -1) {
            const hex = value.replace('#', '').trim();
            if (!/^(?:[0-9a-fA-F]{3}){1,2}|[0-9a-fA-F]{8}$/.test(hex)) return;
            let r, g, b;
    
            if (hex.length === 3) {
                r = parseHexChannel(hex[0] + hex[0]);
                g = parseHexChannel(hex[1] + hex[1]);
                b = parseHexChannel(hex[2] + hex[2]);
            } else if (hex.length === 6 || hex.length === 8) {
                r = parseHexChannel(hex.substring(0, 2));
                g = parseHexChannel(hex.substring(2, 4));
                b = parseHexChannel(hex.substring(4, 6));
            }
    
            if (hex.length === 8) {
                this._alpha = Math.floor(parseHexChannel(hex.substring(6)) / 255 * 100);
            } else if (hex.length === 3 || hex.length === 6) {
                this._alpha = 100;
            }
    
            const { h, s, v } = rgb2hsv(r, g, b);
            fromHSV(h, s, v);
        }
    }
  
    // @ts-ignore
    compare(color) {
        return Math.abs(color._hue - this._hue) < 2 &&
            Math.abs(color._saturation - this._saturation) < 1 &&
            Math.abs(color._value - this._value) < 1 &&
            Math.abs(color._alpha - this._alpha) < 1;
    }
  
    doOnChange() {
        const { _hue, _saturation, _value, _alpha, format } = this;
  
        if (this.enableAlpha) {
            switch (format) {
            case 'hsl':
                const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
                this.value = `hsla(${ _hue }, ${ Math.round(hsl[1] * 100) }%, ${ Math.round(hsl[2] * 100) }%, ${ _alpha / 100})`;
                break;
            case 'hsv':
                this.value = `hsva(${ _hue }, ${ Math.round(_saturation) }%, ${ Math.round(_value) }%, ${ _alpha / 100})`;
                break;
            default:
                const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
                this.value = `rgba(${r}, ${g}, ${b}, ${ _alpha / 100 })`;
            }
        } else {
            switch (format) {
            case 'hsl':
                const hsl = hsv2hsl(_hue, _saturation / 100, _value / 100);
                this.value = `hsl(${ _hue }, ${ Math.round(hsl[1] * 100) }%, ${ Math.round(hsl[2] * 100) }%)`;
                break;
            case 'hsv':
                this.value = `hsv(${ _hue }, ${ Math.round(_saturation) }%, ${ Math.round(_value) }%)`;
                break;
            case 'rgb':
                const { r, g, b } = hsv2rgb(_hue, _saturation, _value);
                this.value = `rgb(${r}, ${g}, ${b})`;
                break;
            default:
                this.value = toHex(hsv2rgb(_hue, _saturation, _value));
            }
        }
    }
}
