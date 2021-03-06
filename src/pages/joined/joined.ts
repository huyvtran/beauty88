import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams ,ViewController} from 'ionic-angular';
import { Store } from '../../models/store';
import firebase from 'firebase';
import { ReserveFinishPage } from '../reserve-finish/reserve-finish';
import { OpeningmodalPage } from '../openingmodal/openingmodal';
/**
 * Generated class for the JoinedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-joined',
  templateUrl: 'joined.html',
})
export class JoinedPage {
  closeflag:boolean=false;
  firedata2 = firebase.database().ref('clients');
  firedata = firebase.database().ref('store');
  reserver:any;
  phone:any;
  newtime:any;
  checked:any;
  time:any;
  name:any;
  storeName:any;

  store:any;
  newnewtime:any;
  m:any;
  h:any;
  nowtime:any;
  userId:any;
  numberofpeople:any;
  day:any;
  dayofweek:any;
  month:any;
  designer:any;
  mainImage:any;
  id:any;

  constructor(public modal:ModalController,public view : ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name=localStorage.getItem("name");
    this.userId=this.navParams.get("idd");
    this.mainImage=this.navParams.get("mainImage");
    this.storeName=this.navParams.get("storeName");
    this.day=this.navParams.get("day");
    this.dayofweek=this.navParams.get("dayofweek");
    this.month=this.navParams.get("month");
    this.store=this.navParams.get("store");
    this.time=this.navParams.get("time");
    this.id=this.navParams.get("id");
    this.designer=this.navParams.get("designer");


    var thisday = new Date();
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    var second=thisday.getSeconds();
    console.log("this is the dayㅛㅛㅛㅛ")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(month+1);
    this.month=month+1;
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)

    console.log(this.store);

     this.nowtime = ""+(month+1)+"월"+date+"일"+(hour)+"시"+minute+"분";

    console.log("store info "+this.store);
    console.log(this.time);
    this.h=this.time.time.split(':')[0];
    this.m=this.time.time.split(':')[1];
    this.newnewtime=this.time.time;
    if(this.time.time.split(":")[1]>9){

      this.m=Number(this.m)-10;

    }else{

      this.h=Number(this.h)-1
      if(this.m==0){
        this.m=50;
      }
     
    }
    console.log(this.h);
    console.log(this.m);
    console.log(this.name);
    console.log(this.storeName);
    console.log(this.time);
  }
  openmodal(){
    console.log("oepn")

    let modal = this.modal.create(OpeningmodalPage);
    modal.onDidDismiss(imagedata => {
      console.log("image data isㄴㄴㄴㄴ : ");
     
     
    });
      modal.present();

  }
  gotoback(){

    this.closeflag=true
    // this.matchedKeyword="t";
    this.view.dismiss();
  }
  checking(e){
    var isChecked = e.currentTarget.checked;
    console.log(e.currentTarget);//undefined
    console.log(this.checked);//it is working !!!
  }
  finishing(){

    console.log(this.reserver);
    console.log(this.phone);
    console.log(this.store);
    console.log(this.day);
    console.log(this.dayofweek);
    console.log(this.userId);
    if(this.checked){

    if(this.numberofpeople==undefined){
      this.numberofpeople="-";
    }
    if(this.reserver==''&&this.phone==''){
      window.alert("정보를 입력해주세요");
      return;
    }
    this.userId="test"
    var newRef = this.firedata.child(this.store).child("reservationList").push();
    var newItem = { "name":this.reserver,
    "flag":"normal",
    "requestor":this.userId,
    "phone":this.phone,
    "numberofpeople":this.numberofpeople,
    "month":this.month,
    "time":this.newnewtime,
    "dayofweek":this.dayofweek,
    "day":this.day,
    "requestDate":this.nowtime,
    "id":newRef.key,
    "designer":this.designer
  };
  console.log(newItem);
  newRef.set(newItem);


  console.log("dddd");
  var newRef2 = this.firedata2.child(this.userId).child("reservationList").push();
    var newItem2 = {
      "flag":"normal",
      "name":this.reserver,
    "requestor":this.userId,
    "numberofpeople":this.numberofpeople,
    "month":this.month,
    "time":this.newnewtime,
    "dayofweek":this.dayofweek,
    "day":this.day,
    "requestDate":this.nowtime,
    "storeId":this.store,
    "storeName":this.storeName,
    "mainImage":this.mainImage,
    "designer":this.designer
  };
  newRef2.set(newItem2);

   this.navCtrl.push(ReserveFinishPage,{"name":this.reserver,"time":this.newnewtime})
    this.view.dismiss();
    
  }else{
      window.alert("개인정보 3자동의 체크를 해주세요")
  }
  }
  
  ionViewDidLoad() {
    this.closeflag=false;
    console.log('ionViewDidLoad JoinedPage');
    console.log(this.closeflag);
  }

}
