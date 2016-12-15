import { Component, OnInit } from '@angular/core';

import { CircularService } from './circular.service';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'circular.html',
  providers: [CircularService]
})
export class Circular implements OnInit {
  public chosenWeek: any;
  public time: any;
  public circularInfo: any;
  public circularHours: any;

  constructor(public navCtrl: NavController, private circularService: CircularService) {}

  getCircularInfo(): void {
    this.circularInfo = this.circularService.getCircularInfoByHour(this.circularHours,2, null, null);
  }

  ngOnInit(): void {
  this.circularHours = this.circularService.getCircularInfo()['__zone_symbol__value'];
  this.getCircularInfo();
}

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }

  getKeyByIndex(obj, index){
    return Object.keys(obj)[index];
  }

}