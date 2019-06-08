import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoneylenderPage } from './moneylender';

@NgModule({
  declarations: [
    MoneylenderPage,
  ],
  imports: [
    IonicPageModule.forChild(MoneylenderPage),
  ],
})
export class MoneylenderPageModule {}
