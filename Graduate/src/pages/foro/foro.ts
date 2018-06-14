import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TemaPage } from '../tema/tema';

@Component({
  selector: 'page-foro',
  templateUrl: 'foro.html'
})
export class ForoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToTema(params){
    if (!params) params = {};
    this.navCtrl.push(TemaPage);
  }
}
