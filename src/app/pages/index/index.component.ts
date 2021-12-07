import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HkapiService } from 'src/app/service/hkapi.service';
import { StorageService } from 'src/app/service/storage.service';
declare var Ocx:any


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild('cctvwin') cctv!:ElementRef
  appKey='16378437062165692'
  secretKey='RBnjdkepUKQZQaAAcoOZ'

  ocxPlayer:any=null

  constructor(
    private hkapi:HkapiService,
    private storage:StorageService
  ) { }

  ngOnInit(): void {
    this.setStorage()
  }
  ocxPlayerInit () {
    const that = this
    // this.$store.commit('SET_ACTIVE_OCX_VM', this)
    this.ocxPlayer = new Ocx({
      el: 'cctvwin',
      dllPath: './VPMClient.dll',
      autoLoad: true,
      error: () => {
        console.info('webControl初始化失败。')
        // this.showOcx = false
      },
      afterCreateWnd (ocx:any) {
        console.info('webControl初始化成功。')
        // that.initProcess()
      },
      callback: (data:any, ocx:any) => {
        console.log(data)
        // this.callbackData = data.responseMsg
        // this.SnapPictureData = 'data:image/png;base64,' + data.responseMsg.SnapPictureData
      }
    })
  }
  // 获取插件版本信息
  getLocalVersion () {
    this.ocxPlayer.request({
      funcName: 'Hik_GetVersion',
      arguments: {}
    }).then((res:any) => {
      console.log(res)
    })
  }
  getToken(){
    this.hkapi.getAccessToken().then(res=>{
      console.log(res)
    })
  }
  setToken(){
    this.hkapi.setHeader()
  }
  addDevice(){
    this.hkapi.addDevice()
  }
  deviceInfo(){
    this.hkapi.deviceInfo()
  }
  setStorage(){
    this.storage.set('decode',{name:'老朱'})
  }
  getStorage(){
    let a=this.storage.get('decode')
    console.log(a)
  }
  getAllMonitor(){
    this.hkapi.getAllMonitor()
  }
  getMonitor(){
    this.hkapi.getMonitor()
  }
  getCapacity(){
    this.hkapi.capacity()
  }
  liveAddress(){
    this.hkapi.liveAddress()
  }
  preview(){
    this.hkapi.preview()
  }
  playback(){
    this.hkapi.playBack()
  }
}
