import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  //rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private authProvider: AuthProvider, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (document.URL.indexOf("?code=") > 0) {
        console.log("URL:", document.URL)
        let splitURL = document.URL.split("?code=");
        let code = splitURL[1].split("&")[0]
        console.log("Codigo:", code)
        storage.set('code', code);
        this.authProvider.getAccessToken(code)
        .then(data => {
          let res: any = data
          console.log("Datos access:", res)
          storage.set('accessToken', res.access_token);
        })
        .catch(err => {
          console.log("Error access:", err)
          let token = 'AAIkOTgwYmVlMmUtMzA0NC00YzQ2LWEzY2YtZWI2OTQ2NWVkNzE5Wdkd3-uYYB7vaFRDeZ3WrEzTAinj3I-OXQjZHqCrJtkvu170WsQPV32FOlWpMW5r4jHLJX2VMtf8QVWMzHM7tRHqrEQzgLzXys_Lln_LprLgSipL7sY4TnRO_mZkDMyzBkk2ij6ufnBZM1RLyCtyQuRfZKgtq9Q7Zoz4uaQAtzs'
          storage.set('accessToken', token);
        })
        this.goToHome()
      }

    });
  }

  goToHome(){
    this.rootPage = TabsPage;
  }
}
