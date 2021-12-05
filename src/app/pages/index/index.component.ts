import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HkapiService } from 'src/app/service/hkapi.service';
import { OcxService } from 'src/app/service/ocx.service';
import { StorageService } from 'src/app/service/storage.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild('cctvwin') cctv!:ElementRef
  appKey='16378437062165692'
  secretKey='RBnjdkepUKQZQaAAcoOZ'

  constructor(
    private hkapi:HkapiService,
    private storage:StorageService,
    private ocxPlayer:OcxService
  ) { }

  ngOnInit(): void {
    this.setStorage()
  }
  ocxPlayerInit () {

    this.ocxPlayer.init(this.cctv)
  }
  // 获取插件版本信息
  getLocalVersion () {
    this.ocxPlayer.request({
      funcName: 'Hik_GetVersion',
      arguments: {}
    }).then((res) => {
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
