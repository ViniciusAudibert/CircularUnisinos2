import {
  Component,
  OnInit
} from '@angular/core';

import {
  CircularService
} from './circular.service';
import {
  NavController
} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'circular.html',
  providers: [CircularService]
})
export class Circular implements OnInit {
  public chosenWeek: any;
  public time: any;
  public circular: any;
  public circularHours: any;

  constructor(public navCtrl: NavController, private circularService: CircularService) {}

  getCircularInfo(time, chosenWeek): void {
    this.circular = this.circularService.getCircularInfoByHour(this.circularHours, 2, chosenWeek, time);
  }

  ngOnInit(): void {
    this.circularHours = this.circularService.getCircularInfo()['__zone_symbol__value'];
    this.getCircularInfo(null, null);
  }
}
