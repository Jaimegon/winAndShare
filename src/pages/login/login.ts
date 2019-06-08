import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public auth: AuthProvider, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login() {
    this.platform.ready().then(() => {
        this.liberbankLogin().then(success => {
            alert(success.access_token);
        }, (error) => {
            alert(error);
        });
    });
}

public liberbankLogin(): Promise<any> {
  return new Promise(function(resolve, reject) {
      var browserRef = window.open("https://api-glbk.liberbank.es/tpps/sb/oauth2/authorize?response_type=code&scope=accountsList%20accountDetails%20paymentsOrder&redirect_uri=http://172.24.202.230:8100&state=stateApplication&client_id=980bee2e-3044-4c46-a3cf-eb69465ed719");
      browserRef.addEventListener("loadstart", (event) => {
        console.log("Eventos:", event)
          /*if ((event.url).indexOf("http://localhost/callback") === 0) {
              browserRef.removeEventListener("exit", (event) => {});
              browserRef.close();
              var responseParameters = ((event.url).split("#")[1]).split("&");
              var parsedResponse = {};
              for (var i = 0; i < responseParameters.length; i++) {
                  parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
              }
              if (parsedResponse["access_token"] !== undefined && parsedResponse["access_token"] !== null) {
                  resolve(parsedResponse);
              } else {
                  reject("Problem authenticating with Facebook");
              }
          }*/
          if ((event.url).indexOf('?code=') !== -1) {
            let token = event.url.slice(event.url.indexOf('?code=') + '?code='.length);
            // here is your token, now you can close the InAppBrowser
            browserRef.close();
          }
      });

      browserRef.addEventListener("beforeunload", function(e){
        console.log("Evento:", e)
     }, false);
      browserRef.addEventListener("exit", function(event) {
          reject("The Facebook sign in flow was canceled");
      });
  });
}

  authenticate(){
    console.log("En page")
    this.auth.authorize()
    .then(data => console.log("Data en page:", data))
    .catch(err => console.log("Error en page:", err))
  }

  goToHome(){
    this.navCtrl.push(TabsPage)
  }

}
