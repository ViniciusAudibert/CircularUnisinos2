import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Circular } from '../pages/circular/circular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = Circular;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
