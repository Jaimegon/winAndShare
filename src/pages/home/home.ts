import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MoneylenderPage } from '../moneylender/moneylender';
import { AccountsProvider } from '../../providers/accounts/accounts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  show: false;
  usersId: Array<Object>;
  users: any;

  constructor(public navCtrl: NavController, private accountsProvider: AccountsProvider) {
    this.usersId = ['5d96f767-f262-4344-937b-4296aa820eae', 'e7289227-5a39-43ed-8283-7718e198d8e5',
      'd75c65f1-1250-40a0-8e3b-2c52ce257a21', '9cc4702e-f40d-49d4-bbb9-efc46705ffb1',
      'f89a0b73-5443-4c5f-bb34-86753b669617']
    this.users = [
      { id_user: this.usersId[0], accounts: [], available: 0, interest: 5.1, maxMonth: 5, maxPeriods: 1 },
      { id_user: this.usersId[1], accounts: [], available: 0, interest: 1, maxMonth: 10, maxPeriods: 5 },
      { id_user: this.usersId[2], accounts: [], available: 0, interest: 2.4, maxMonth: 20, maxPeriods: 2 },
      { id_user: this.usersId[3], accounts: [], available: 0, interest: 3.2, maxMonth: 7, maxPeriods: 7 },
    ]

    console.log("USuarios:", this.users)

    for (let user of this.users) {
      console.log("this.usersId[i]:", user)
      this.accountsProvider.getAccount(user.id_user)
        .then(data => {
          let res: any = data;
          let accounts = res.data
          //this.users.push({id_user: this.usersId[i], accounts: accounts, available: 0})
          user.accounts = accounts
          console.log("Cuentas:", accounts)
          for (let account of accounts) {
            var idAccount = account.resourceId
            this.accountsProvider.getBalance(user.id_user, idAccount)
              .then(data => {
                let res: any = data;
                let balances = res.balances.forwardAvailable.amount.amount
                console.log("Cantidad:", balances)
                user.available = user.available + balances
                console.log("Usuario:", user)
              })
              .catch(err => {
                console.log("Error getBalance:", err)
              })
          }
        })
        .catch(err => {
          console.log("Error getAccount:", err)
        })
    }
  }

  public goToMoneylender(lender) {
    this.navCtrl.push(MoneylenderPage, { moneylender: lender })
  }

}
