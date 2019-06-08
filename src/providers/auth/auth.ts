import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CONFIG } from '../../app/config';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient, private iab: InAppBrowser) {
    console.log('Hello AuthProvider Provider');
  }

  authorize() {
    console.log("Aqui")

    //this.iab.create("https://www.marca.com/","_blank");

    var params = {
      response_type: 'code',
      scope: 'accountsList accountDetails paymentsOrder',
      redirect_uri: 'http://172.24.202.230:8100',
      state: 'stateApplication',
      client_id: CONFIG.client_id
    }

    var web = this.iab.create("https://marca.com");

    console.log("Web:", web)

    return new Promise(
      (resolve, reject) => {
        //this.http.get(CONFIG.url_base_auth + "/authorize", { params: params })
        this.http.get('https://marca.com')
          .subscribe(
            data => {
              console.log("Datos:", data)
              resolve(data);
            },
            err => {
              console.log(err)
              reject(err)
            }
          )
      })
  }

  getAccessToken(code) {

    var params = {
      grant_type: 'authorization_code',
      client_id: CONFIG.client_id,
      client_secret: CONFIG.client_secret,
      code: code,
      redirect_uri: CONFIG.redirect_uri,
      username: 'Blalblla',
      password: 'fsefsfs',
      scope: 'accountsList accountDetails paymentsOrder',
      refresh_token: ''
    }

    var header = {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    }
    
    var url = CONFIG.url_base_auth + "/token"

    console.log("Params:", params)
    console.log("URL:", url)

    return new Promise(
      (resolve, reject) => {
        this.http.post(url, { headers: header, params: params })
          .subscribe(
            data => {
              console.log("Datos:", data)
              resolve(data);
            },
            err => {
              console.log(err)
              reject(err)
            }
          )
      })
  }

}
