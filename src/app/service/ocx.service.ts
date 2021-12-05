import { Injectable } from '@angular/core';
declare var WebControl: any

@Injectable({
    providedIn: 'root'
})
export class OcxService {
    el: any = null
    oWebControl: any = null
    width = 0
    height = 0

    iLastCoverLeft = 0
    iLastCoverTop = 0
    iLastCoverRight = 0
    iLastCoverBottom = 0
    constructor() {


    }
    init(el:any) {
        this.el = el
        if (!this.el) {
            throw new Error(`未找到指定容器,请检查是否设置正确的元素ID`)
        }
        this.width = this.el.offsetWidth
        this.height = this.el.offsetHeight
    }
    run() {
        let that = this
        that.oWebControl = new WebControl({
            szPluginContainer: that.el,
            iServicePortStart: 14460, // 对应 LocalServiceConfig.xml 中的ServicePortStart值
            iServicePortEnd: 14460, // 对应 LocalServiceConfig.xml 中的ServicePortEnd值
            szClassId: 'FD400310-EC09-4CE9-BFD4-13E8C6E7D6CA',
            cbConnectSuccess: function () {
                // that.callback(that.options.callback)
                that.oWebControl.JS_StartService('window', { dllPath: './VPMClient.dll' }).then(
                    function () {
                        window.addEventListener('resize', that.resize.bind(that))
                        window.addEventListener('scroll', that.resize.bind(that))
                        const params = {
                            playHandle: 0,
                            showMode: 1,
                            moduleIndex: 0,
                            artemisToken: '',
                            artemisUrl: '',
                            productCode: 'demo',
                            projectId: 564789565387296,
                            strAuthorization: '',
                            userIndexCode: '564171090096672',
                            keepLiveUrl: window.location.origin,
                            needPictureResult: 1,
                            notifyPlayBackTimes: 10,
                            defaultStreamType: 1

                        }
                        that.sendCommonParams('Hik_ParamBeforCreatWnd', params)
      
                    },
                    function () {
                        console.error('JS_CreateWnd failed')
                        // that.error()
                    }
                )
            },
            cbConnectError: function () {
                console.error('cbConnectError')
                that.oWebControl = null
                // that.error()
            },
            cbConnectClose: function (bNormalClose: any) {
                // 连接异常断开：bNormalClose = false
                // JS_Disconnect正常断开：bNormalClose = true
                console.warn(`连接关闭. ${bNormalClose ? '正常断开' : '异常断开'}`)
                that.oWebControl = null
            }
        })
    }
    sendCommonParams(funcName = 'Hik_ParamBeforCreatWnd', params: any) {
        this.request({
            funcName,
            arguments: params
        }).then((res: any) => {
            console.log(res)
            this.createWnd()
        })
    }
    lock = false
    resize() {
        if (this.oWebControl !== null) {
            let { width, height } = this
            if (!this.lock) {
                const $el = document.getElementById(this.el)
                if (!$el) return
                width = $el.offsetWidth
                height = $el.offsetHeight
                this.oWebControl.JS_Resize(width, height)
            } else {
                this.oWebControl.JS_Resize(width, height)
                this._setWndCover()
            }
        }
    }
    createWnd(options = {}) {
        this.oWebControl.JS_CreateWnd(this.el, this.width, this.height, options).then(()=> {
            this.clientResize('SendPlayWndSize', this.width, this.height)
            this._setWndCover()
        })
    }
    clientResize(funcName = 'SendPlayWndSize', width:any, height:any) {
        this.request({
            funcName,
            arguments: {
                arg1: width,
                arg2: height
            }
        })
    }
    request(params: any) {
        return new Promise((resolve) => {
            this.oWebControl.JS_RequestInterface({
                funcName: params.funcName,
                arguments: params.arguments
            }).then((oData: any) => {
                resolve(oData)
            })
        })
    }
    _setWndCover() {
        if (!document.getElementById(this.el)) return

        const { width, height } = this

        const iWidth = window.innerWidth
        const iHeight = window.innerHeight
        const oDivRect: any = this.el.getBoundingClientRect()

        let iCoverLeft = oDivRect.left < 0 ? Math.abs(oDivRect.left) : 0
        let iCoverTop = oDivRect.top < 0 ? Math.abs(oDivRect.top) : 0
        let iCoverRight = oDivRect.right - iWidth > 0 ? Math.round(oDivRect.right - iWidth) : 0
        let iCoverBottom = oDivRect.bottom - iHeight > 0 ? Math.round(oDivRect.bottom - iHeight) : 0

        iCoverLeft = iCoverLeft > width ? width : iCoverLeft
        iCoverTop = iCoverTop > height ? height : iCoverTop
        iCoverRight = iCoverRight > width ? width : iCoverRight
        iCoverBottom = iCoverBottom > height ? height : iCoverBottom

        if (this.iLastCoverLeft !== iCoverLeft) {
            this.iLastCoverLeft = iCoverLeft
        }
        if (this.iLastCoverTop !== iCoverTop) {
            if (iCoverTop === 0) {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height)
            }
            this.iLastCoverTop = iCoverTop
            if (oDivRect.right - iWidth > 0) {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height)
                this.oWebControl.JS_CuttingPartWindow(0, 0, width, iCoverTop)
            } else {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(0, 0, width, iCoverTop)
            }
        }
        if (this.iLastCoverRight !== iCoverRight) {
            if (iCoverRight === 0) {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(0, 0, width, iCoverTop)
            }

            this.iLastCoverRight = iCoverRight

            if (oDivRect.top < 0) {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(0, 0, width, iCoverTop)
                this.oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height)
            } else {
                this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
                this.oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height)
            }

            if (oDivRect.bottom - iHeight > 0) {
                this.oWebControl.JS_CuttingPartWindow(0, height - iCoverBottom, width, iCoverBottom + 20)
            }
        }
        if (this.iLastCoverBottom !== iCoverBottom) {
            this.iLastCoverBottom = iCoverBottom

            this.oWebControl.JS_RepairPartWindow(0, 0, width, height)
            this.oWebControl.JS_CuttingPartWindow(0, 0, width, iCoverTop)
            this.oWebControl.JS_CuttingPartWindow(width - iCoverRight, 0, iCoverRight, height)
            this.oWebControl.JS_CuttingPartWindow(0, height - iCoverBottom, width, iCoverBottom + 20)
        }
    }
    wakeUp(path: any) {
        WebControl.JS_WakeUp(path)
    }
}