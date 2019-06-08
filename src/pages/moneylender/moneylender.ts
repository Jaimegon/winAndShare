import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the MoneylenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moneylender',
  templateUrl: 'moneylender.html',
})
export class MoneylenderPage {

  moneylender: any;
  result: string;
  orderValues: any;
  initialMoney: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private alertCtrl: AlertController, private storage: Storage) {
    //this.moneylender = {available:50000, interest:5.3, maxMonth: 12, maxPeriods: 2}
    this.moneylender = this.navParams.get('moneylender')
    this.initialMoney = this.moneylender.available
    this.orderValues = {available:50000, interest:5.3, maxMonth: 12, maxPeriods: 2}
    console.log("Moneylender:", this.moneylender)
    this.result = null
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneylenderPage');
  }

  calculateInterest(){
    var valueInterest = 1 + (this.moneylender.interest/100)
    console.log("Value inters:", valueInterest)
    this.result = (this.moneylender.available*valueInterest).toFixed(2)
    console.log("Reulstado:", this.result)
  }

  confirmOrder(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar préstamo',
      subTitle: 'Presionando Aceptar se le transferirá el dinero a su cuenta inmediatamente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.order()
          }
        }
      ]
    });
    alert.present();
  }

  order(){
    this.storage.set('money_lended', this.result)
    this.moneylender.available = this.initialMoney - this.moneylender.available
    console.log("Solicitado préstamo de", this.result)
    let alert = this.alertCtrl.create({
      title: 'Dinero enviado',
      subTitle: 'Devolver ' + this.result + ' € en ' + this.moneylender.maxMonth+ ' meses.\
      Puede pagarlo en ' + this.moneylender.maxPeriods + ' plazos.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.navCtrl.pop()
          }
        }
      ]
    });
    alert.present();
  }


}
