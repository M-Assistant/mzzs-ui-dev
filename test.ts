type HSL = { h: number, s: number; l: number, a?: number }
type HSV = { h: number, s: number; v: number, a?: number }

const _colorKeywords: {[key: string]: number} = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
	'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
	'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
	'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
	'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
	'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
	'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
	'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
	'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
	'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
	'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
	'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
	'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
	'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
	'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
	'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
	'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
	'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
	'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
	'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
	'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
	'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
	'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
	'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 }


function hue2rgb(p: number, q: number, t: number) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t)
    return p
}


class Color {
    // 红色分量（0~1）
    r: number = 1
    // 绿色分量（0~1）
    g: number = 1
    // 蓝色分量（0~1）
    b: number = 1
    // 透明度（0~1）
    alpha: number = 1
    
    constructor(r?: number | string | Color, g?: number, b?: number, a?: number) {
        if (a !== undefined) {
            this.setAlpha(a)
        }
        
        if (r !== undefined) {
            if (g === undefined && b === undefined) {
                return this.set(r)
            } else if (typeof r === 'number') {
                return this.setRGB(r, g, b)
            }
        }
        return this
    }

    /**
     * 设置颜色值
     * @param {number|string|Color} value 
     * @returns 
     */
    set (value: number | string | Color) {
        if (value instanceof Color) {
            this.copy(value)
        } else if (typeof value === 'number') {
            this.setHex(value)
        } else if (typeof value === 'string') {
            this.setStyle(value)
        }
        return this
    }

    /**
     * 设置透明度
     * @param {number} alpha 范围：0 ~ 1 
     * @returns 
     */
    setAlpha(alpha: number) {
        this.alpha = Math.max(0, Math.min(1, alpha))

        return this
    }

    /**
     * 采用十六进制值设置此颜色
     * @param {number} hex 范围：0x000000 ~ 0xFFFFFF 
     * @returns 
     */
    setHex(hex: number) {
        hex = Math.floor(hex)

        // #AABBCC >> 16 => (AA)
        this.r = (hex >> 16 & 255) / 255
        // #AABBCC >> 8 => AA(BB)
        this.g = (hex >> 8 & 255) / 255
        // #AABBCC >> 8 => AABB(CC)
        this.b = (hex & 255) / 255

        return this
    }

    /**
     * 采用RGB值设置此颜色
     * @param {number} r 红。范围：0 ~ 1
     * @param {number} g 绿。范围：0 ~ 1
     * @param {number} b 蓝。范围：0 ~ 1
     * @returns 
     */
    setRGB(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
        return this
    }

    /**
     * 采用Css RGB值设置此颜色
     * @param {number} r 红。范围：0 ~ 255
     * @param {number} g 绿。范围：0 ~ 255
     * @param {number} b 蓝。范围：0 ~ 255
     * @returns 
     */
    setCssRGB(r: number, g: number, b: number) {
        return this.setRGB((r & 255) / 255, (g & 255) / 255, (b & 255) / 255)
    }

    /**
     * 采用HSL值设置此颜色。
     * @param {number} h 色相。  范围：0 ~ 1
     * @param {number} s 饱和度。范围：0 ~ 1
     * @param {number} l 亮度值。范围：0 ~ 1
     * @returns
     */
    setHSL(h: number, s: number, l: number) {
        if (s === 0) {
            this.r = this.g = this.b = l
        } else {
            const p = l < 0.5 ? l * (1 + s) : (l + s) - (l * s)
            const q = (2 * l) - p

            this.r = hue2rgb(q, p, h + 1 / 3)
            this.g = hue2rgb(q, p, h)
            this.b = hue2rgb(q, p, h - 1 / 3)
        }
        return this
    }

    /**
     * 采用Css HSL值设置此颜色。
     * @param {number} h 色相。  范围：0 ~ 360
     * @param {number} s 饱和度。范围：0 ~ 100
     * @param {number} l 亮度值。范围：0 ~ 100
     * @returns
     */
    setCssHSL(h: number, s: number, l: number) {
        h = Math.max(0, Math.min(360, h)) / 360
        s = Math.max(0, Math.min(100, s)) / 100
        l = Math.max(0, Math.min(100, l)) / 100
        return this.setHSL(h, s, l)
    }

    /**
     * 采用HSV值设置此颜色。
     * @param {number} h 色相。  范围：0 ~ 1
     * @param {number} s 饱和度。范围：0 ~ 1
     * @param {number} v 明度值。范围：0 ~ 1
     * @returns
     */
    setHSV(h: number, s: number, v: number) {
        const angle = h * 360 / 60
        const hi = Math.floor(angle) % 6
        const f = angle - hi
        const p = v * (1 - s)
        const q = v * (1 - f * s)
        const t = v * (1 - (1 - f) * s)

        switch(hi) {
            case 0: 
                this.r = v
                this.g = t
                this.b = p
                break
            case 1:
                this.r = q
                this.g = v
                this.b = p
                break
            case 2: 
                this.r = p
                this.g = v
                this.b = t
                break
            case 3:
                this.r = p
                this.g = q
                this.b = v
                break
            case 4:
                this.r = t
                this.g = p
                this.b = v
                break
            case 5:
                this.r = v
                this.g = p
                this.b = q
                break
        }

        return this
    }

    /**
     * 采用Css HSV值设置此颜色。
     * @param {number} h 色相。  范围：0 ~ 360
     * @param {number} s 饱和度。范围：0 ~ 100
     * @param {number} v 明度值。范围：0 ~ 100
     * @returns 
     */
    setCssHSV(h: number, s: number, v: number) {
        h = Math.max(0, Math.min(360, h)) / 360
        s = Math.max(0, Math.min(100, s)) / 100
        v = Math.max(0, Math.min(100, v)) / 100
        return this.setHSV(h, s, v)
    }

    /**
     * 通过颜色名字设置该颜色。
     * @param {string} name 
     * @returns 
     */
    setColorName(name: string) {
        const hex = _colorKeywords[ name.toLowerCase() ]
        if (hex !== undefined) {
            this.setHex(hex)
        } else {
            console.warn('Color: Unknown color ' + name)
        }
        return this
    }

    /**
     * 采用ccs样式的字符串设置此颜色。
     * @param {string} style 
     * @returns 
     */
    setStyle(style: string) {

        let m: RegExpExecArray | null

        if ( m = /^((?:rgb|hsl|hsv)a?)\(([^\)]*)\)/.exec(style) ) {

            // rgb / hsl / hsv

            let color: RegExpExecArray | null
            const name = m[1]
            const components = m[2]
            
            switch (name) {
                case 'rgb':
                case 'rgba':

                    if ( color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components) ) {

						// rgb(255,0,0) rgba(255,0,0,0.5)
						this.r = Math.min(255, parseInt(color[1], 10)) / 255
						this.g = Math.min(255, parseInt(color[2], 10)) / 255
						this.b = Math.min(255, parseInt(color[3], 10)) / 255
                        if (color[4]) {
                            this.setAlpha(parseFloat(color[4]))
                        }
                        return this

					} else if  ( color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components) ) {

						// rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
						this.r = Math.min(100, parseInt(color[ 1 ], 10)) / 100
						this.g = Math.min(100, parseInt(color[ 2 ], 10)) / 100
						this.b = Math.min(100, parseInt(color[ 3 ], 10)) / 100
						if (color[4]) {
                            this.setAlpha(parseFloat(color[4]))
                        }
                        return this

					}

                    break

                case 'hsl':
                case 'hsla':
                case 'hsv':
                case 'hsva':

                    if ( color = /^\s*(\d*\.?\d+)(deg)?\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*((?:,\s*(\d*\.?\d+)\s*)|(?:\/\s*(\d+)\%))?$/.exec(components) ) {

						// hsl(120deg,50%,50%) hsl(120,50%,50%) hsl(120,50%,50% / 90%) hsla(120,50%,50%,0.5)
						// hsv(120deg,50%,50%) hsv(120,50%,50%) hsv(120,50%,50% / 90%) hsva(120,50%,50%,0.5)
                        const h = parseFloat(color[1]) / 360
						const s = parseInt(color[3], 10) / 100
						const lv = parseInt(color[4], 10) / 100

                        // , 0.5
                        if (color[6]) {
                            this.setAlpha(parseFloat(color[6]))
                        }

                        // / 90%
                        if (color[7]) {
                            this.setAlpha(parseInt(color[7], 10) / 100)
                        }

                        if (name === 'hsl' || name === 'hsla') {
                            return this.setHSL(h, s, lv)
                        } else {
                            return this.setHSV(h, s, lv)
                        }

					}

                    break
            }

        } else if ( m = /^\#([A-Fa-f\d]+)$/.exec(style) ) {

			// hex color

			const hex = m[1];
			const size = hex.length;

			if (size === 3) {

				// #ff0
				this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255
				this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255
				this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255
                return this

			} else if (size >= 6) {

				// #ff0000 | #ff000000
				this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255
				this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255
				this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255
                if (size >= 8) {
                    this.alpha = parseInt(hex.charAt(6) + hex.charAt(7), 16) / 255
                }
                return this

			}

		}

        if (style.length > 0) {

			this.setColorName(style)

		}
        
        return this
    }

    
    /**
     * 返回此颜色的十六进制值
     * @param {boolean} alpha
     * @returns 0xFFFFFF | 0xFFFFFF00
     */
    getHex(alpha: boolean = false) {
        const r = (this.r * 255) << 24
        const g = (this.g * 255) << 16
        const b = (this.b * 255) << 8
        const value = r ^ g ^ b
        if (alpha) {
            // >>> 0 转无符号
            return (value ^ (this.alpha * 255) << 0) >>> 0
        }
        return value >>> 8
    }

    /**
     * 将此颜色的十六进制值作为字符串返回
     * @param {boolean} alpha 
     * @returns 'FFFFFF' | 'FFFFFF00'
     */
    getHexString(alpha: boolean = false) {
        return this.getHex(alpha).toString(16)
    }

    /**
     * 将此颜色的 r, g 和 b 值转换为 HSL格式，然后
     * @param {HSL} target 
     * @param {boolean} alpha 
     * @returns 返回一个格式如下的对象：{ h: 0, s: 0, l: 0, a: 1 }
     */
    getHSL(target?: HSL) {
        const r = this.r, g = this.g, b = this.b
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
    
        let hue = 0, saturation = 0
        const lightness = (min + max) / 2.0
        if (min === max) {
            hue = 0
            saturation = 0
        } else {
            const delta = max - min
            saturation = lightness <= 0.5 ? (max + min) : delta / (2 - max - min)
            switch (max) {
                case r: hue = (g - b) / delta + (g < b ? 6 : 0); break
                case g: hue = (b - r) / delta + 2; break
                case b: hue = (r - g) / delta + 4; break
            }
            hue /= 6
        }

        target= target || {h:0,s:0,l:0,a:0}
        target.h = hue
        target.s = saturation
        target.l = lightness
        target.a = this.alpha
        return target
    }
    
    /**
     * 将此颜色的 r, g 和 b 值转换为 HSL格式
     * @param {boolean} alpha 
     * @returns 返回一个格式如下的字符串：hsl(120, 10%, 90%) | hsla(120, 10%, 90%, 0.2)
     */
    getHSLString(alpha: boolean = false) {
        const { h, s, l, a } = this.getHSL()
        const value = `${(h*360) >> 0},${(s*100).toFixed(1)}%,${(l*100).toFixed(1)}%`
        return alpha ? `hsla(${value},${a})` : `hsl(${value})`
    }

    /**
     * 将此颜色的 r, g 和 b 值转换为 HSV格式
     * @param {HSV} target 
     * @returns 返回一个格式如下的对象：{ h: 0, s: 0, v: 0, a: 1 }
     */
    getHSV(target?: HSV) {
        const r = this.r, g = this.g, b = this.b
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
    
        let hue = 0, saturation = 0
        const value = max
        if (max !== 0) {
            const delta = max - min
            switch (max) {
                case r: hue = (g - b) / delta + (g < b ? 6 : 0); break
                case g: hue = (b - r) / delta + 2; break
                case b: hue = (r - g) / delta + 4; break
            }
            hue /= 6
            saturation = 1 - min / max
        }

        target = target || {h:0,s:0,v:0,a:0}
        target.h = hue
        target.s = saturation
        target.v = value
        target.a = this.alpha
        return target
    }

    /**
     * 将此颜色的 r, g 和 b 值转换为 HSV格式
     * @param {boolean} alpha 
     * @returns 返回一个格式如下的字符串：hsv(120, 10%, 90%) | hsva(120, 10%, 90%, 0.2)
     */
    getHSVString(alpha: boolean = false) {
        const { h, s, v, a } = this.getHSV()
        const value = `${(h*360) >> 0},${(s*100).toFixed(1)}%,${(v*100).toFixed(1)}%`
        return alpha ? `hsva(${value},${a})` : `hsv(${value})`
    }

    /**
     * 以CSS样式字符串的形式返回该颜色的值。例如:“rgb(255,0,0)”
     * @param {boolean} alpha 
     * @returns 
     */
    getStyle(alpha: boolean = false) {
        const r = (this.r * 255) | 0
        const g = (this.g * 255) | 0
        const b = (this.b * 255) | 0
        return alpha ? `rgba(${r},${g},${b},${this.alpha})` : `rgb(${r},${g},${b})`
    }

    /**
     * 返回一个与当前颜色的 r, g 和 b 相同的颜色。
     * @returns {Color}
     */
    clone() {
        return new Color(this.r, this.g, this.b, this.alpha)
    }

    /**
     * 从 color 中拷贝 r, g, b 和 alpha 值到当前的颜色。
     * @param {Color} c 
     * @param {boolean} alpha 是否拷贝透明度
     * @returns 
     */
    copy(c: Color, alpha: boolean = false) {
        this.r = c.r
        this.g = c.g
        this.b = c.b
        if (alpha) {
            this.alpha = c.alpha
        }
        return this
    }

    /**
     * 将 color: Color 的RGB值与该对象的RGB值进行比较。如果它们都是相同的，返回true，否则返回false。
     * @param {Color} c 
     * @param {boolean} alpha 是否比较透明度 
     * @returns 
     */
    equals(c: Color, alpha: boolean = false) {
        return (c.r === this.r) 
        && (c.g === this.g) 
        && (c.b === this.b) 
        && (!alpha || c.alpha === this.alpha)
    }
}
