import { Component } from '@angular/core';
import { IonicPage, MenuController,AlertController,NavController,Platform, NavParams,LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ManagementPage } from '../management/management';
import { RequestPage } from '../request/request';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { StoremanagementPage } from '../storemanagement/storemanagement';
import { MypagePage } from '../mypage/mypage';

import { Device } from '@ionic-native/device';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { StoredetailPage } from '../storedetail/storedetail';
import { RulepagePage } from '../rulepage/rulepage';
import { Rule2pagePage } from '../rule2page/rule2page';
/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var naver: any;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  designerImage:any="http://i1.ruliweb.com/img/19/06/09/16b3880b7e63051.jpeg";
  categoryselected:any;
  rule:any;
  rule2:any;
  nickname:any;
  count:any=0;
  requestFlag:any="입점신청";
  flag:any;
  loadingdone:boolean=false;
  imageUrl:any;
  denyreason:any;
  myStoreId:any;
  id:any;
  geoflag:any=false;
  userUid:any;
  code:any;
  logined:any;
  name:any;
  firedata = firebase.database().ref('powerlink');
  firedata2 = firebase.database().ref('store');
  rootdata=firebase.database();
  slidestotal=[];
  slides=[];
  slides2=[];
  lat:any;
  location:any;
  test:any;
  lng:any;
  loading:any;
  storearray=[];
  platform:any;
  haha:any;
  alertC:any;
  
  constructor(public setting:OpenNativeSettings,public device:Device,private uniqueDeviceID: UniqueDeviceID,public _kakaoCordovaSDK: KakaoCordovaSDK,public menuCtrl: MenuController,alertC:AlertController,platform:Platform,loading:LoadingController,public geo:Geolocation,public viewer:PhotoViewer,public navCtrl: NavController, public navParams: NavParams) {
this.alertC=alertC;
    this.platform=platform;
    this.loading=loading;
  
  this.loading = this.loading.create({
              content: `Loading..`,
              });
              this.loading.present();
           
              this.generateStoredistance();
   console.log("constructor come!!!");
   this.rootdata.ref().child("rule").on('value',(snap)=>{

    console.log("newdistance")
    console.log(snap.val());
    this.rule=snap.val().content;
    
  })
  this.rootdata.ref().child("rule2").on('value',(snap)=>{

    console.log("newdistance")
    console.log(snap.val());
    this.rule2=snap.val().content;
  })

      console.log("ioniv view did loaded');")
     
  console.log(this.userUid);

          
            this.lat=localStorage.getItem("lat");
            this.lng=localStorage.getItem("lng");
            this.location=localStorage.getItem("location");
            console.log("this is location info")
            console.log(this.lat);
            console.log(this.lng);
            console.log(this.location);
            
           

  
    // if(this.userUid!=undefined){
    //   this.generateId();
     
    // }else{
    // }
//  }

    // setTimeout(()=>{
    //   if(this.platform.is("ios")){
    //     window.alert("ios come")

    //     var photo="";
    //     var name="";
    //     var id="";
    //     photo =localStorage.getItem("photo");
    //     name =localStorage.getItem("name");
    //     id =localStorage.getItem("id");
    //     console.log("this is basic")
    //     console.log(photo);
    //     console.log(name);
    //     console.log(id);
    //     if(photo!=null&&photo!=undefined){
    //       if(photo.length==9){
    //         this.uniqueDeviceID.get().then((e)=>{
    //           console.log("size is : "+e);
    //           this.userUid=e;
    //         }).catch((e)=>{
    //           window.alert("eeeeeeeerr"+e);
    //         })
    //       }else{
    //       console.log("showing kakao");
    //       this.imageUrl=photo;
    //       this.id=id;
    //       this.name=name;
    //       this.logined="true";
          
    //       this.userUid=this.id;
    //       }
    //       }else{
    //         console.log("size is null!")
    //         // this.logined="false";
    //         this.uniqueDeviceID.get().then((e)=>{
    //           console.log("size is : "+e);
    //           this.userUid=e;
    //         }).catch((e)=>{
    //           //here comes error!
    //           window.alert("ㅁㅁㅁㅁeraaaar"+e);
    //         })
    //         this.logined="true";
    //         this.id="1000334014";
    //         this.userUid="1000334014"
          
    //         this.name="마스터이름";
            
    //         this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
    //         // localStorage.setItem("photo",this.imageUrl);
    //       // localStorage.setItem("name",this.name);
    //       // localStorage.setItem("id",this.userUid);
    //       }
        
        
    //         console.log("ioniv view did loaded');")
    
    //         setTimeout(()=>{
    //           this.getGeo();
            
    //         },1000)
        
    //       if(this.userUid!=undefined){
    //         this.generateId();
           
    //       }else{
    //       }
  
    //   }
    // },1000)
   
      // this.rootdata.ref().child("powerlink").child(si).on('value',(snap)=>{
      //   this.test="https://firebasestorage.googleapis.com/v0/b/hamm-93bfc.appspot.com/o/powerLink%2F%EC%84%9C%EC%9A%B8%EC%8B%9C%2Fpowerlink10?alt=media&token=993404b9-f729-458b-8e99-9dd662dfa974";
     
      //   console.log(snap.numChildren());
      //   console.log(snap.val());
       
      //   for(var i in snap.val()){
      //     count++;
      //     if(count==1){
      //       this.haha=snap.val()[i].powerlink;
      //       console.log("ss")
           
      //     }
      //     console.log(snap.val()[i].powerlink)
      //     this.slidestotal.push(snap.val()[i])
         
      //     console.log("i push "+i);
      //   }
      //   // this.shuffle(this.slidestotal);
      //   // for( var ii=0; ii<this.slidestotal.length; ii++){
      //   //   if(ii<5){
      //   //     this.slides.push(this.slidestotal[ii]);
      //   //   }else{
      //   //     this.slides2.push(this.slidestotal[ii]);
      //   //   }
      //   // }
      //   this.test="done";
      //   var count=0;
      //   console.log("value finished")
      //   console.log(this.slidestotal);
      //   for(var j=0; j<this.slidestotal.length; j++){
      //     if(j==0){
      //       this.haha=this.slidestotal[j];
      //     }
      //     this.slides.push(this.slidestotal[j])
      //   }
      //   console.log("finished!")
      //   console.log(this.slides);
      // })
        // this.callingBySi("서울특별시");
     
        
      




  }
  category(value){
    console.log(value);

    this.categoryselected=value;

    this.navCtrl.push(HomePage,{"flag":"normal","nick":this.name,"category":value,"userId":this.userUid,"x":this.lat,"y":this.lng,"location":this.location,"logined":this.logined}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
       
        this.generateId();
      })

    });

  }
  mypage(){

    console.log(this.userUid);

    if(this.logined==true||this.logined=="true"){

      this.navCtrl.push(MypagePage,{"userid":this.userUid});
    }else{

      var alert = this.alertC.create({
        title: '로그인을 해야합니다.',
        buttons: [
          {
            text: '취소',
            handler: data => {
  
            }
          },
          {
            text: '로그인하기',
            handler: data => {
                this.kakaoLogin();
                    }
                  
            }
          ]
          });
      
        alert.present();


      };
     
  
    
  }
  entersharing(v){
    
      let alert = this.alertC.create({
        inputs: [
          {
            name: 'place',
            placeholder: '가게명을 정확히 입력해주세요'
          },
          
          {
            name: 'code',
            placeholder: '가게 관리자가 지정한 공유코드를 입력해주세요'
          }
        ],
        buttons: [
          {
            text: '취소',
            handler: data => {
              
            }
          },
          {
            text: '입력',
            handler: data => {
  
              console.log(data.code);
  
              this.firedata2.once('value',(snapshot)=>{
                var value:any;
                var code="";
                var name="";
                var flag=false;
                for(var result in snapshot.val()){
                   code=snapshot.val()[result].code
                   name=snapshot.val()[result].name

                  console.log(code);
                  console.log(name);
                  if(name==data.place&&code==data.code){


                    flag=true;
                  }
  
  
                }
                console.log("flag : "+flag);
                if(flag){
                  window.alert("매치 완료!")
                //                 this.id="1000334014";
                //   this.userUid="1000334014"
                // this.logined="true";
                //   this.name="마스터이름";
                //   this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
                  this.generateId();
                }else{
                  window.alert("찾을수없습니다")
                }
                console.log("code is : "+code);
                console.log("name is : "+name);
              });
  
            
            }
          }
          
        ]
      });

    alert.present();
    
  }
  openrulepage(){

    this.navCtrl.push(RulepagePage,{"rule":this.rule})
  }
  openrule2page(){
    console.log(this.rule2);
    this.navCtrl.push(Rule2pagePage,{"rule2":this.rule2})
  }
  sharing(v){
    let alert = this.alertC.create({
   
      inputs: [
       
        {
          name: 'code',
          placeholder: '4자리 공유코드를 입력해주세요'
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            
          }
        },
        {
          text: '등록',
          handler: data => {

            console.log(data.code);

            console.log(data.place);
           
            this.firedata2.child(this.myStoreId).update({
              "code":data.code
            }).then(()=>{
              window.alert("발급완료")
            })

          
          }
        }
        
      ]
    });
    alert.present();
  }
  ionViewWillEnter(){
    if(this.lat!=null){


      this.generateStore("서울특별시");
      this.generateId();
      this.getGeo();
        }else{
          setTimeout(()=>{ this.generateStore("서울특별시");
          // this.generateId();
            this.getGeo();
          
          },1000)
        }

        setTimeout(()=>{

          this.loadingdone=true;
        },600)
  }
  ionViewDidLoad(){

  
   
}
generateId(){

  console.log("come to generateId")

   

  console.log(this.loadingdone)
  var photo="";
  var name="";
  var id="";
  
  photo =localStorage.getItem("photo");
  name =localStorage.getItem("name");
  id =localStorage.getItem("id");
  this.logined =localStorage.getItem("logined");
  if(this.logined=="true"){
  }
  console.log("this is basic")
  console.log(photo);
  console.log(name);
  console.log(id);

  if(photo!=null){
   if(photo.length==9){
   
    this.logined="true";
    this.id="1000334014222";
    this.userUid="1000334014222"
  
    this.name="마스터이름2";
    
    this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
 
    this.generateStore("서울특별시");
    console.log("photo is null!")
    this.logined="true";
  this.id="1000334014";
  this.userUid="1000334014"

  this.name="마스터이름2";
  
  this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"

  }else{

    // console.log("showing kakao");
    this.imageUrl=photo;
    this.id=id;
    this.name=name;
    this.logined="true";
    
    this.userUid=this.id;
    console.log("photo is null!")
    this.logined="true";
  this.id="1000334014222";
  this.userUid="1000334014222"

  this.name="마스터이름112";
  
  this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"

   }
  
    }else{
      console.log("photo is null!")
      console.log("photo is null!")
      this.logined="true";
    this.id="1000334014222";
    this.userUid="1000334014222"
  
    this.name="마스터이름112";
    
    this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
  
    }

  this.firedata2.once('value',(snapshot)=>{
    var value:any;
    for(var result in snapshot.val()){
      var requestor=snapshot.val()[result].requestedby
      var flag=snapshot.val()[result].approval;
      var mystore=snapshot.val()[result].id;
      // console.log("match start");
      // console.log(requestor);
      // console.log(this.userUid);
      if(requestor==this.userUid){
        this.myStoreId=snapshot.val()[result].id;

        console.log("fffffis:"+flag);
        this.code=snapshot.val()[result].code;
        if(flag=="denied"){
          this.flag="거절됨";
          this.requestFlag="거절됨\n"+this.denyreason;
         
          this.denyreason=snapshot.val()[result].reason;
        }else if(flag=="true"||flag==true){
         
          this.flag="승인됨";
          this.requestFlag="예약 관리 페이지";
        }else if(flag==false||flag=="false"){
          this.flag="승인대기중";
          this.requestFlag="입점 승인 대기중"
        }
      }
    }

    console.log("flag conditionnnnnnn"+this.flag);
   
    return;
  });
  console.log("?????")
}
getGeo(){
  console.log("get geo come");
  var options = {
    timeout: 10000,
    enableHighAccuracy: false
    }

  this.geo.getCurrentPosition(options).then((success)=>{

    console.log(success);
    this.lat=success.coords.latitude;
    this.lng=success.coords.longitude; 
    // this.lat=37.565924;
    // this.lng=126.976895;
    console.log("currentlocatipn"+this.lat+"///"+this.lng);

  
    naver.maps.Service.reverseGeocode({
      location: new naver.maps.LatLng(this.lat, this.lng),
  }, (status,response)=> {
      if (status !== naver.maps.Service.Status.OK) {
        console.log("status not ok");
          console.log(status);
      }else{
        console.log("status  ok");
        console.log(status);
      }

      this.geoflag=true;
      var result = response.result, // 검색 결과의 컨테이너
          items = result.items; // 검색 결과의 배열
          console.log(result);
          console.log(items[0].address);
          var res=items[0].address.split(" ");
          console.log(res.length);
          for (var i=0; i<res.length; i++){
            console.log(res[i]); // 시 

          }
    
          console.log(res[0]+"/"+res[1]+"//"+res[2]);
           this.location=res[0]+" "+res[1]+" "+res[2];
           localStorage.setItem("lat",this.lat);
           localStorage.setItem("lng",this.lng);
           localStorage.setItem("location",this.location);
          this.generateStore("서울특별시");
          console.log("dooooooooo");
          console.log(this.userUid);
          this.generateId();
      // do Something
  })
  }).catch((e)=>{
    console.log("failed");
    console.log(e);
    console.log(this.geoflag+"count is : "+this.count);
   
    if(this.geoflag!=true){
      if(this.count<5){
      
        this.count++;
       
        setTimeout(()=>{
          if(e.code==1){
            
            this.geoflag=false;
            this.getGeo();
            this.generateStore("서울특별시");
            this.generateId();
          }else{
            console.log("gggg");
            this.getGeo();
            // this.generateStore("서울특별시");
            // this.generateId();
          console.log("geo loading error:");
  
          console.log(e);
          }
          
        },500)
      }
     
    
    }else{
    }
   
      // this.loading.dismiss();
      // this.lat=37.565924;
      // this.lng=126.976895;
      
      // this.generateStore("서울특별시");
  
    return;
  })
}
requesttoconfig(){
  if(this.logined=="true"){
    if(this.requestFlag=="입점신청"){
      this.navCtrl.push(RequestPage,{"id":this.userUid}).then(()=>{
        this.navCtrl.getActive().onDidDismiss(data => {
          console.log("dddddddismisssssss");
          this.generateId();
        });
      })
    }else{
      this.navCtrl.push(StoremanagementPage,{"store":this.myStoreId})
    }
  
  }else{
    alert("로그인을 해주세요")
  }

}
getData2 = data =>
{
  console.log(data);
  console.log("callbackcome") 
  this.menuCtrl.toggle();

};
requesttoopen(){
  console.log("flagㅎㅎ info is : "+this.flag);
  console.log(this.logined);
  if(this.logined=="false"){
    alert("로그인을 해주세요!")
  }else{
    
    if(this.flag!=undefined){
      console.log(this.flag);
      if(this.flag.trim()=="승인대기중"){
        alert("현재 입점 심청 승인작업중입니다");
      }else if(this.flag.trim()=="승인됨"){
        alert("관리화면으로 이동합니다.");
        this.navCtrl.push(ManagementPage,{"store":this.myStoreId,"callback":this.getData2})
      }else if(this.flag=="거절됨"){
        if(this.logined=="false"){
          alert("로그인 된 사용자만 입점 신청 가능합니다.");
        }else{
          alert("입점 신청화면으로 이동합니다");
          this.navCtrl.push(RequestPage)
        }
      }else{
        if(this.logined=="false"){
          alert("로그인 된 사용자만 입점 신청 가능합니다.");
        }else{
          alert("입점 신청화면으로 이동합니다");
          this.navCtrl.push(RequestPage)
        }
      }
    }else{
      alert("입점 신청화면으로 이동합니다");
      this.navCtrl.push(RequestPage,{"id":"92"})
    }
  }
  
  
  
}
gotoshop(a){
  console.log(a);
  this.navCtrl.push(StoredetailPage,{"logined":this.logined,"storeId":a.id,"nick":this.name,"userId":this.userUid})

}
generateStoredistance(){

  this.firedata2.once('value').then((snapshot) =>{
    this.storearray=[];
    var value:any;
    for(var result in snapshot.val()){
     
      console.log(snapshot.val()[result])
      if(snapshot.val()[result].approval==true||snapshot.val()[result].approval=="true"){
        // if(this.superdistance>Number(distance)*1000){

        
           

          
           
            var newdistance=this.calcCrow(snapshot.val()[result].lat,snapshot.val()[result].lng,this.lat,this.lng).toFixed(2);
            var nnewdistance=Number(newdistance);
              this.storearray.push({"promotion":snapshot.val()[result].promotion,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"name":snapshot.val()[result].name,"approval":snapshot.val()[result].approval,"category":snapshot.val()[result].category,"distance":nnewdistance,"mainImage":snapshot.val()[result].mainImage})


           
         
        // }
        }
      }
      

      
  
console.log(this.storearray);
var sortingField = "distance";

this.storearray.sort(function(a,b) { // 오름차순
// return (a[sortingField] === b[sortingField])? 0 : a[sortingField]? -1 : 1;
var x = a[sortingField]; var y = b[sortingField];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));

});
console.log(this.storearray);
var sortingField = "promotion";

this.storearray.sort(function(a,b) { // 오름차순
// return (a[sortingField] === b[sortingField])? 0 : a[sortingField]? -1 : 1;

var x = a[sortingField]; 
var y = b[sortingField];
return (x === y)? 0 : x? -1 : 1;
});
if(this.loading!=null){
  this.loading.dismiss();
}

  });
}

  generateStore(sii){
     
    var si="";
    if(sii=="서울특별시"){
       si="서울시";
    }
    

    this.firedata.child(si).once('value').then((snap) =>{

      this.slidestotal=[];
      this.slides=[];
      this.slides2=[];
    console.log("come to generating store..."+si);
      for(var i in snap.val()){
        this.slidestotal.push(snap.val()[i])
      };
      console.log(this.slidestotal)
      this.shuffle(this.slidestotal);
      console.log(this.slidestotal)
      for( var ii=0; ii<this.slidestotal.length; ii++){
        if(ii<5&&ii>=0){
          this.slides.push(this.slidestotal[ii]);
        }else if(ii<10&&ii>4){
          this.slides2.push(this.slidestotal[ii]);
        }
        console.log(this.slides);
        console.log(this.slides2);
      }
    
      // if(this.loading!=null){
      //   this.loading.dismiss();
      // }
    });
    //  if(this.loading!=null){
    //   this.loading.dismiss();
    // }
  }
  
  
  search(){
    let alert = this.alertC.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '키워드입력'
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            
          }
        },
        {
          text: '검색',
          handler: data => {

            console.log(data.keyword);


            // this.matchedKeyword=data.keyword;
            this.firedata2.once('value').then((snapshot) =>{
              this.storearray=[];
              var value:any;
              var flag=false;
              for(var result in snapshot.val()){
                var storename=snapshot.val()[result].name;
                var keywords=snapshot.val()[result].keywords;
                if(keywords!=undefined||storename!=undefined){
                  var array = [];
                 if(snapshot.val()[result].keywords!=undefined){
                  array=snapshot.val()[result].keywords.split(',');
                  for(var i=0; i<array.length; i++){
                    console.log(array[i]);
                    if(array[i].trim(0)==data.keyword){
                      console.log(array[i]+"가 일치");
                      flag=true;
                      console.log("printing");
                    console.log(snapshot.val()[result]);
                    this.storearray.push({"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage})
                  
                    }
                  }
                 }
                  console.log(storename);
                  console.log(storename.indexOf(data.keyword));
                  if(storename.indexOf(data.keyword)>-1){

                    console.log("storematching"+storename);
                    flag=true;
                  console.log(snapshot.val()[result]);
                  this.storearray.push({"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage})
                
                  }
                  if(flag){
                    
                  }
                }
              }

              if(!flag){
                window.alert("no matched")
              }else{
                console.log(this.storearray);
                console.log("go to home");
                this.navCtrl.push(HomePage,{"storearray":this.storearray,"flag":"keyword","category":value,"userId":this.userUid,"nick":this.name,"logined":this.logined,"location":this.location})

              }
            });
          }
        }
        
      ]
    });
    alert.present();
    // 
  }
  logout(){
    
      this._kakaoCordovaSDK.logout().then(()=>{
      console.log("success logout");
      localStorage.setItem("logined","false");
    localStorage.setItem("photo",undefined);
      localStorage.setItem("name",undefined);
      localStorage.setItem("id",undefined);
      this.logined="false";
      
      var alert = this.alertC.create({
        title: '로그아웃 되었습니다.',
        buttons: [
          {
            text: '확인',
            handler: data => {
              
                    }
            }
          ]
          });
      
        alert.present();
    }).catch((e)=>{
      window.alert(e);
    })
  }
  calcCrow(lat1, lon1, lat2, lon2) 
  {
    var lat1:any;
    var lat2:any;
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
     lat1 = this.toRad(lat1);
     lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
   toRad(Value) 
  {
      return Value * Math.PI / 180;
  }
  kakaoLogin(){
    let loginOptions = {};
    loginOptions['authTypes'] = [
                                  AuthTypes.AuthTypeTalk, 
                                  AuthTypes.AuthTypeStory,
                                  AuthTypes.AuthTypeAccount
                                ];
    
    this._kakaoCordovaSDK.login(loginOptions).then((res) => {
        console.log(res);
        localStorage.setItem("photo",res.properties.thumbnail_image)
            localStorage.setItem("name",res.properties.nickname);
            localStorage.setItem("id",res.id);
            localStorage.setItem("logined","true");
            this.userUid=res.id;
            this.name=localStorage.getItem("name");
            this.imageUrl=localStorage.getItem("photo");
            this.logined="true";
            console.log(this.userUid);
            console.log(this.name);
            console.log(this.imageUrl);
            console.log(this.logined);

      }
    ).catch((e)=>{
      alert( JSON.stringify(e, Object.getOwnPropertyNames(e)));
    })
    // this.kakao.login(
     

    //   ).then((result)=>{
    
    //     alert("success!!")
    //     alert(result.nickname);
    //     console.log("success");
    //     console.log(result);
    //   }).catch((e)=>{
    
    //     alert("falied")
    //     alert(e);
    //     alert( JSON.stringify(e, Object.getOwnPropertyNames(e)));
    //     console.log("failed");
    //     console.log(e);
    //   })
    // let loginOptions = {};
    // loginOptions['authTypes'] = [
    //                               AuthTypes.AuthTypeTalk, 
    //                               AuthTypes.AuthTypeStory,
    //                               AuthTypes.AuthTypeAccount
    //                             ];
    
    // this._kakaoCordovaSDK.login(loginOptions).then((res) => {
    //   console.log("done");
    //     console.log(res.properties);
    //     console.log(res.id);
    //     // this.navCtrl.setRoot(HomePage,{"id":res.id,"name":res.properties.nickname,"photo":res.properties.thumbnail_image})
    //     //res.id 를 키 값으로 사용해서 유저 구분 가능할듯? 
    //     //대체 왜 이메일은 못받지??? ㅜㅠㅜㅠㅜㅜㅜ
    //   
    //   }
    // ).catch((e)=>{
     
    //   
    // })
  }
  locate(){

    this.navCtrl.push(HomePage,{"flag":"normal","category":"All","userId":this.userUid,"nick":this.name,"logined":this.logined,"x":this.lat,"y":this.lng,"location":this.location})

  }

   shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  callingBySi(si){
    

  }
enlarge(v){
  console.log(v);
  if(v.flag=="imageonly"){

  }else{
    this.navCtrl.push(StoredetailPage,{"userId":this.userUid,"storeId":v.id,"nick":this.name,"category":this.categoryselected})
  }
  // this.viewer.show(v);
}
share(){
    let feedLink: KLLinkObject = {
      androidExecutionParams: "param1=value1&param2=value2",
      iosExecutionParams: "param1=value1&param2=value2"
    };
  
    let feedContent: KLContentObject = {
      title: '토탈 뷰티 앱 “네가 젤 예뻐”',
      link: feedLink,
      imageURL: 'http://i1.ruliweb.com/img/19/06/09/16b3880b7e63051.jpeg'
    };
    feedContent.imageWidth="700";
    feedContent.imageHeight="342";
    let feedTemplate: KLFeedTemplate = {
      content: feedContent
    };
    this._kakaoCordovaSDK
      .sendLinkFeed(feedTemplate)
      .then(
        res => {
          console.log(res);
        },
        err => {
          alert(err);
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });

}
}
export interface KLButtonObject {
  title: string;
  link: KLLinkObject;
}
export interface KLContentObject {
  title: string;
  link: KLLinkObject;
  imageURL: string;
  desc?: string;
  imageWidth?: string;
  imageHeight?: string;
}
export interface KLLinkObject {
  webURL?: string;
  mobileWebURL?: string;
  androidExecutionParams?: string;
  iosExecutionParams?: string;
}
export interface KLFeedTemplate {
  content: KLContentObject;
  buttonTitle?: string;
  buttons?: KLButtonObject[];
}

