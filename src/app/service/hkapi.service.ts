import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HkapiService {
  private headers: Object = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  }
  appKey='16378437062165692'
  secretKey='RBnjdkepUKQZQaAAcoOZ'
  productCode='1637843786816841'
  projectId='1320066173340208'

  constructor(
    private http: HttpClient,
    private storage:StorageService
  ) { 

  }

  async setHeader(){
    let token=this.storage.get('token')
    console.log(new Date().getMilliseconds()/1000000 - token.expires_in)
    let header: any = { "Content-Type": "application/json" }
    if(token){
      header["access_token"] = token.access_token
    }
    this.headers = { headers: new HttpHeaders(header) }
    console.log(this.headers)
    // return this.headers
  }
  getAccessToken(){
    return new Promise((resolve, reject) => {
      const param = new HttpParams().append('accessKey', this.appKey).append('secretKey', this.secretKey).append('productCode', this.productCode );
      this.http.post('/url/artemis/oauth/token/v2', {
        "accessKey": this.appKey,
        "secretKey": this.secretKey,
        "productCode":this.productCode,
        "projectId":this.projectId
      },this.headers).subscribe((data:any) => {
        /*
        code: "400"
        msg: "参数productId格式错误"
        **/

        /*
        code: "200"
        data: {
          access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhY2Nlc3NfdG9rZW4iL…qUCfeYEot7i7s-b793mxVL28e0KUL7TQ6riBylV7ogvYcNLwA', 
          expires_in: 43200
        }
        msg: "操作成功"
        */ 
       if(data.code==200){
          this.storage.set('token',data.data)
        }
        resolve(data)
      }, err => {
        console.log(err)
      })
    })
  }
  addDevice(){
    return new Promise(resolve=>{  ///url/artemis/api/eits/v2/global/device/ezviz/save
      this.http.post('/url/artemis/api/eits/v2/global/device/ezviz/save',{
        "devices":[
          {
            "deviceTypeCode":"IPCamera",
            "deviceSerial":"C89069309",
            "deviceCategory":"Video",
            "connection":{
              "validateCode":"ZHIFIW"
            },
            "projectId":"1320066173340208",
            "deviceName":"边缘设备test",
            "treatyType":"hiksdk_net"
          }
        ],
        "access_token":this.storage.get('token').access_token
      },{headers:new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization":this.storage.get('token').access_token
      })}).subscribe(data=>{
        console.log(data)
        resolve(data)
      })
    })
  }
  deviceInfo(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v2/global/device/info',{
        "deviceSerial":"G24607690",
        "isAllProductDevice":1,
        "projectId":"1320066173340208"
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //分页查询监控点
  getAllMonitor(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/monitor/page',{
        "monitorSerial":"G24607690",
        // "deviceOrgId":1319963094125104,
        // "model":"CAMERA",
        // "page":1
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //获取监控点
  getMonitor(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/global/monitor/by/code',{
        "monitorCode":"G24607690#1",
        "projectId":"1320066173340208"
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //获取设备能力集
  capacity(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/global/v1/device/capacity/get',{
        "deviceSerial":"G24607690",
        "projectId":"1320066173340208"
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //获取播放地址
  liveAddress(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/global/live/address/get/by/deviceSerial',{
        "deviceSerial":"G24607690",
        "projectId":"1320066173340208",
        "channelNo":1
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //获取设备视频预览界面
  preview(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/global/live/video/preview',{
        "deviceSerial":"G24607690",
        "projectId":"1320066173340208",
        "channelNo":1
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
  //获取设备录像回放界面
  playBack(){
    return new Promise((resolve, reject) => {
      this.http.post('url/artemis/api/eits/v1/global/live/video/playBack',{
        "deviceSerial":"G24607690",
        "projectId":"1320066173340208",
        "channelNo":1
      }, this.headers).subscribe(data => {
        // let res= this.responseData(data)
        console.log(data)
        if(data){
          resolve(data)
        }
        reject('服务器无响应')
      }, err => {
        console.log(err)
      })
    })
  }
}
