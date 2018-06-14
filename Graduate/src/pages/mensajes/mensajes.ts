import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversacionPage } from '../conversacion/conversacion';
import { AmigosPage } from '../amigos/amigos';

@Component({
  selector: 'page-mensajes',
  templateUrl: 'mensajes.html'
})
export class MensajesPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToConversacion(params){
    if (!params) params = {};
    this.navCtrl.push(ConversacionPage);
  }goToAmigos(params){
    if (!params) params = {};
    this.navCtrl.push(AmigosPage);
  }
}
