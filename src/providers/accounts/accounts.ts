import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { CONFIG } from '../../app/config';

/*
  Generated class for the AccountsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AccountsProvider {

  accessToken: string;
  code: string;

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.set('money_lended', 0)
    this.accessToken = 'AAIkOTgwYmVlMmUtMzA0NC00YzQ2LWEzY2YtZWI2OTQ2NWVkNzE5Wdkd3-uYYB7vaFRDeZ3WrEzTAinj3I-OXQjZHqCrJtkvu170WsQPV32FOlWpMW5r4jHLJX2VMtf8QVWMzHM7tRHqrEQzgLzXys_Lln_LprLgSipL7sY4TnRO_mZkDMyzBkk2ij6ufnBZM1RLyCtyQuRfZKgtq9Q7Zoz4uaQAtzs'
    this.storage.get('accessToken').then((val) => {
      console.log('Access token:', val);
      this.accessToken = val
    });

    this.storage.get('code').then((val) => {
      console.log('Access code:', val);
      this.code = val
    });
  }

  public getAccount(idAccount){

    var url = CONFIG.url_base_accounts;
    var headers = {
    'x-request-id': idAccount,
     authorization: 'Bearer ' + this.accessToken
    }

    return new Promise(
      (resolve, reject) => {
        this.http.get(url, { headers: headers })
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err)
              reject(err)
            }
          )
      })
  }

  public getBalance(idUser, idAccount){

    var url = CONFIG.url_base_accounts + "/" + idAccount + "/balances";
    var headers = {
      accept: 'application/json',
    'x-request-id': idUser,
     authorization: 'Bearer ' + this.accessToken
    }

    return new Promise(
      (resolve, reject) => {
        this.http.get(url, { headers: headers })
          .subscribe(
            data => {
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
