import { momentum } from "@/utils/animation"
import { off, on } from "@/utils/event"

export declare interface ScrollOptions {
    damp?: number
    startX?: number
    startY?: number
    scrollX?: boolean
    scrollY?: boolean
    disableMouse?: boolean
    disablePointer?: boolean
    disableTouch?: boolean
    disableMouseWheel?: boolean
    disableKeyboard?: boolean
    freeScroll?: boolean
    infinite?: boolean,
    preventDefault?: boolean
    bounce?: boolean
    bounceEasing?: string
    bounceTime?: number
    mouseWheelSpeed?: number
}



function getTime() {
    return (new Date).getTime()
}

export default class Scroll {
    // 可视区域 Dom
    private root: HTMLElement

    // 内容区域 Dom
    private scroller: HTMLElement

    // 事件类型: 主要保证多类型事件触发时，响应的都是同一种类型事件
    private initiated?: number
    private eventType: {[key: string]: number} = {
        touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,
    }

    // 是否允许水平/垂直滚动
    private allowHorizontalScroll = false
    private allowVerticalScroll = false

    // 每次滚动触发事件的坐标
    private pointX = 0
    private pointY = 0

    // 每次滚动的初始坐标值
    private startX = 0
    private startY = 0

    // 当前滚动后的坐标
    private x = 0
    private y = 0

    // 最大可移动坐标  client - offset
    // 左上角为起点 0,0。x 向左移动为“负数”，向右移动为“正数”。y 向上移动为“负数”，向下移动为“正数”
    private maxScrollX = 0
    private maxScrollY = 0

    // 坐标偏差值 = 上次滚动坐标 - 当前滚动坐标
    private distX = 0
    private distY = 0

    // 滚动方向。1 = 上/左， -1 = 下/右
    private directionX = 0
    private directionY = 0

    // 滚动起始时间 与 结束时间
    private startTime = 0
    private endTime = 0

    // 暂不清楚
    moved = false

    // 禁用/启用 滚动
    enabled = false

    // 滚动选项
    options = {
        // 初始滚动值
        startX: 0,
        startY: 0,

        // 鼠标滚轮速度
        mouseWheelSpeed: 20,

        // 是否允许横向滚动
        scrollX: false,
        // 是否允许纵向滚动
        scrollY: true,
        // 是否开启无限滚动
        infinite: false,

        // 禁止 鼠标 事件
        disableMouse: false,
        // 禁止 touch 事件
        disableTouch: false,
        // 禁止 鼠标滚轮 事件
        disableMouseWheel: true,
        // 禁止 键盘 事件
        disableKeyboard: true,

        // 是否开启回弹动画
        bounce: true,
        // 回弹动画执行函数
        bounceEasing: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
        // 回弹动画指定间隔
        bounceTime: 600,

        // 是否阻止默认事件
        preventDefault: true,

    } as ScrollOptions

    

    constructor(el: HTMLElement, options?: ScrollOptions) {
        this.root = el
        this.scroller = el.children[0] as HTMLElement

        // 覆盖选项
        if (options) {
            Object.keys(options).forEach(k => {
                this.options[k] = options[k]
            })
        }
        
        // 开启事件监听
        this.initEvents()

        // 刷新数据
        this.refresh()

        // 初始坐标
        this.scrollTo(this.options.startX || 0, this.options.startY || 0)

        this.enabled = true

        // this.scroller.style.transform = 'translate(0px, 0px)'
    }

    // 启用滚动
    enable() {
        this.enabled = true
    }

    // 禁用滚动
    disable() {
        this.enabled = false
    }

    // 更新滚动参数
    refresh() {
        const { clientWidth, clientHeight } = this.root;
        const { offsetWidth, offsetHeight } = this.scroller;

        // 计算可滚动的最大范围
        this.maxScrollX = clientWidth - offsetWidth;
        this.maxScrollY = clientHeight - offsetHeight;

        // 计算可滚动的方向
        this.allowHorizontalScroll = this.options.scrollX === true && this.maxScrollX < 0;
        this.allowVerticalScroll = this.options.scrollY === true && this.maxScrollY < 0;
        if (!this.allowHorizontalScroll) {
            this.maxScrollX = 0;
        }
        if (!this.allowVerticalScroll) {
            this.maxScrollY = 0;
        }

        // 重置坐标点
        this.resetPosition();
    }
    
    // 滚动到指定坐标
    scrollTo(x: number, y: number) {
        this.translate(x, y)
    }

    scrollToElement(el: HTMLElement) {
        if (!el) return;

        let p: HTMLElement | null = el;
        let left = el.offsetWidth,
            top = el.offsetHeight;

        while (p = p.offsetParent as HTMLElement) {
            left -= p.offsetLeft;
            top -= p.offsetTop;
        }
    }

    





    /**
     * 事件的监听与销毁
     * @param {boolean} remove 
     */
    private initEvents(remove?: boolean) {
        const fn = remove ? off : on;

        // 鼠标事件
        if (!this.options.disableMouse) {
            fn(this.root, 'mousedown', this);
			fn(window, 'mousemove', this);
			fn(window, 'mousecancel', this);
			fn(window, 'mouseup', this);
        }

        // 移动 touch 事件
        if (!this.options.disableTouch) {
            fn(this.root, 'touchstart', this);
			fn(window, 'touchmove', this);
			fn(window, 'touchcancel', this);
			fn(window, 'touchend', this);
        }

        // 鼠标滚轮事件
        if (!this.options.disableMouseWheel) {
            fn(this.root, 'wheel', this);
            fn(this.root, 'mousewheel', this);
            fn(this.root, 'DOMMouseScroll', this);
        }

        // 键盘事件
        if (!this.options.disableKeyboard) {
            fn(window, 'keydown', this);
        }

        // 动画结束事件
        fn(this.scroller, 'transitionend', this);
        fn(this.scroller, 'webkitTransitionEnd', this);
        fn(this.scroller, 'oTransitionEnd', this);
        fn(this.scroller, 'MSTransitionEnd', this);
    }

    /**
     * 计算坐标点
     * @returns { x, y }
     */
    private getComputedPosition () {
        const style = window.getComputedStyle(this.scroller, null)
        const matrix = style['transform'].split(')')[0].split(', ')
        return {
            x: +(matrix[12] || matrix[4]),
            y: +(matrix[13] || matrix[5])
        }
    }

    /**
     * 重置坐标点
     * @returns {boolean}
     */
    private resetPosition() {
        let x = this.x,
            y = this.y;

        if (x > 0) {
            x = 0;
        } else if (x < this.maxScrollX) {
            x = this.maxScrollX;
        }

        if (y > 0) {
            y = 0;
        } else if (y < this.maxScrollY) {
            y = this.maxScrollY;
        }

        if (x === this.x && y === this.y) {
            return false;
        }

        this.scrollTo(x, y)
        return true;
    }

    /**
     * 更新视图坐标
     * @param {number} x 
     * @param {number} y 
     */
    private translate(x: number, y: number) {
        // 添加动画属性
        if (this.options.bounce) {
            this.scroller.style.transitionTimingFunction = this.options.bounceEasing || '';
            this.scroller.style.transitionDuration = `${this.options.bounceTime || 0}ms`;
        }

        this.scroller.style.transform = `translate(${x}px, ${y}px)`;
        this.x = x;
        this.y = y;
    }

    /**
     * 动画结束的事件回调
     * @param {Event} e 
     * @returns 
     */
    private transitionEnd(e: Event) {
        if (e.target !== this.scroller) {
			return;
		}

        if (!this.resetPosition()) {
            // 动画结束后，移除相关属性
            this.scroller.style.transitionTimingFunction = '';
            this.scroller.style.transitionDuration = '';
        
            // 触发自定义事件 scrollEnd
        }
    }
    
    /**
     * 起始移动的事件回调
     * @param {Event} e 
     * @returns 
     */
    private start (e: Event) {
        // 当滚动被禁用时，无法移动
        if (!this.enabled) {
            return;
        }
        
        // 只允许鼠标左键进行滚动
        if (e.type.startsWith('mouse')) {
            const { button } = e as MouseEvent
            if (button !== 0) {
                return;
            }
        }
        
        // 阻止默认行为
        if (this.options.preventDefault) {
            e.preventDefault();
        }


        const point: Touch | MouseEvent = e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
        
        this.moved = false;

        // 记录当前事件类型
        this.initiated = this.eventType[e.type]

        // 记录滚动事件坐标点
        this.pointX = point.pageX;
        this.pointY = point.pageY;

        // 初始化偏差值
        this.distX = 0;
        this.distY = 0;

        // 初始化滚动方向
        this.directionX = 0;
        this.directionY = 0;

        // 记录起始滚动事件
        this.startTime = getTime();

        // 记录起始滚动坐标
        const { x, y } = this.getComputedPosition();
        this.startX = x;
        this.startY = y;

        // 触发自定义事件 beforeScrollStart
    }

    /**
     * 移动进行中的事件回调
     * @param {Event} e 
     * @returns 
     */
    private move (e: Event) {
        // 当滚动被禁用时 或者 不是同一类型的事件，则无法移动
        if (!this.enabled || (this.eventType[e.type] !== this.initiated)) {
            return;
        }

        // 阻止默认行为
        if (this.options.preventDefault) {
            e.preventDefault();
        }

        const point: Touch | MouseEvent = e instanceof TouchEvent ? e.touches[0] : (e as MouseEvent);
        let deltaX = point.pageX - this.pointX,
            deltaY = point.pageY - this.pointY,
            newX = 0, newY = 0,
            timestamp = getTime();

        // 记录滚动事件坐标点
        this.pointX = point.pageX;
        this.pointY = point.pageY;

        // 累计滚动偏差值
        this.distX += deltaX;
        this.distY += deltaY;

        // 如果移动时间超过 300ms 且移动少于 10 个像素时, 不允许滚动
        if (timestamp - this.endTime > 300 && (Math.abs(this.distX) < 10 && Math.abs(this.distY) < 10)) {
            return
        }
    
        // 只有允许滚动的方向，才可以滚动
        deltaX = this.allowHorizontalScroll ? deltaX : 0;
        deltaY = this.allowVerticalScroll ? deltaY : 0;

        // 计算滚动后的新坐标
        newX = this.x + deltaX;
        newY = this.y + deltaY;
        
        // 超出滚动范围，减慢滚动速度
        if (newX > 0 || newX < this.maxScrollX) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if (newY > 0 || newY < this.maxScrollY) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

        // 记录滚动方向
        this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

        if (!this.moved) {
            // 触发自定义事件 scrollStart
        }
        this.moved = true;

        // 更新视图
        this.translate(newX, newY);

        // 如果滚动的时间超过 300ms，则重新记录 起始滚动坐标 以及 起始滚动时间
        // 预防：长时间停留一个地方，不进行滚动
        if (timestamp - this.startTime > 300) {
            this.startTime = timestamp;
            this.startX = this.x;
            this.startY = this.y;
        }
    }

    /**
     * 移动结束的事件回调
     * @param {Event} e 
     * @returns 
     */
    private end(e: Event) {
        // 当滚动被禁用时 或者 不是同一类型的事件，则无法移动
        if (!this.enabled || (this.eventType[e.type] !== this.initiated)) {
            return
        }

        // 阻止默认行为
        if (this.options.preventDefault) {
            e.preventDefault();
        }
        
        let newX = Math.round(this.x),
            newY = Math.round(this.y),
            duration = this.endTime - this.startTime;

        // 重置事件类型
        this.initiated = 0;

        // 记录滚动结束事件
        this.endTime = getTime();

        // 重置滚动坐标，避免超出范围
        if (this.resetPosition()) {
            return;
        }

        // 确保移动后的位置是四舍五入的
        this.scrollTo(newX, newY);

        // 滚动少于 10 个像素点，相当于点击事件
        if (!this.moved) {
            // 触发自定义事件 click
        }
        
        // 滚动的时间小于 300ms 时，触发惯性滚动
        if (duration < 300) {
            const momentumX = momentum(this.startX, this.x, duration, [this.maxScrollX, 0], this.options.bounce ? this.root.clientWidth : 0);
            const momentumY = momentum(this.startY, this.y, duration, [this.maxScrollY, 0], this.options.bounce ? this.root.clientHeight : 0);
            newX = momentumX.destination
            newY = momentumY.destination
        }

        if (newX != this.x || newY !== this.y) {
            this.scrollTo(newX, newY);
            return
        }

        // 触发自定义事件 scrollEnd
    }

    private wheel(e: Event) {
        console.log('wheel', e)
    }

    private keydown(e: Event) {}


    

    /**
     * 事件的处理
     * 当传递给 addEventListener 函数的第二个参数是 object 时，事件会延迟绑定。直到事件发生后，触发 object 的 handleEvent 方法。
     * @param {Event} e 
     */
    handleEvent (e: Event) {
        switch(e.type) {
            case 'touchstart':
			case 'mousedown':
				return this.start(e);
			case 'touchmove':
			case 'mousemove':
				return this.move(e);
			case 'touchend':
			case 'mouseup':
			case 'touchcancel':
			case 'mousecancel':
				return this.end(e);
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				return this.wheel(e);
            case 'keydown':
                return this.keydown(e);
            case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				return this.transitionEnd(e);
        }
    }

    /**
     * 销毁对象
     */
    destory() {
        this.initEvents(false)
    }
}

