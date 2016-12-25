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
  public chosenWeek = 0;
  public time: any;
  public circular: any;
  public circularHours: any;

  constructor(public navCtrl: NavController, private circularService: CircularService) {}

  getCircularInfo(obj): void {    
    let chosenWeek = obj ? obj.chosenWeek ? obj.chosenWeek : this.chosenWeek : this.chosenWeek;
    this.circular = this.circularService.getCircularInfoByHour(JSON.parse(this.circularHours), 2, chosenWeek, this.time);
  }

  ngOnInit(): void {
    this.circularHours = JSON.stringify(this.circularService.getCircularInfo()['__zone_symbol__value']);
    this.getCircularInfo(null);
  }
}
