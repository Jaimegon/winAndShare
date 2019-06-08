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
    this.accessToken = 'AAIkOTgwYmVlMmUtMzA0NC00YzQ2LWEzY2YtZWI2OTQ2NWVkNzE5WW8QmEFEKkEpygeWH75FOZnhJ8fmX85AXD3wo0vmFVGsBlR7hbfQ8r3sP7NwBBbmULnQcCGgVyehpa8tsoFx-J5OvdJAVGFXszkwcn5T4PGmWSziQE8jkqFTKLNDALhLMv0KDPmf0oyfjZs-AbOMZ6KuoGRelz2B_pCcaOmgGLFp--YLebRiTi7KqVCRqxTb'
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
