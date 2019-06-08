import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  available: number;
  borrowed: number;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.available = 931.52
    this.borrowed = 0
  }

  ionViewWillLoad() {
    console.log("Entra")
    this.available = 931.52
    this.borrowed = 0
    console.log("avaibla:", this.available)
    this.storage.get('money_lended')
      .then(money => {
        this.available += parseFloat(money)
        this.borrowed += parseFloat(money)
        console.log("Money lended:", money)
      })
      .catch(err => {
        console.log("Error getavailable:", err)
      })
  }

}
