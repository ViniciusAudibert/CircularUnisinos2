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
  public circularServiceInfo;

  constructor(public navCtrl: NavController, private circularService: CircularService) {}

  getCircularInfo(): void {
    this.circularInfo = this.circularService.getCircularInfoByHour(this.circularServiceInfo,2, null, null);
  }

  ngOnInit(): void {
  this.circularServiceInfo = this.circularService.getCircularInfo();
  this.getCircularInfo();
}

}