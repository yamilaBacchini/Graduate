import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MensajesPage } from '../mensajes/mensajes';
import { ConversacionPage } from '../conversacion/conversacion';
import { AmigosPage } from '../amigos/amigos';

@Component({
  selector: 'page-grupo',
  templateUrl: 'grupo.html'
})
export class GrupoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToMensajes(params){
    if (!params) params = {};
    this.navCtrl.push(MensajesPage);
  }goToConversacion(params){
    if (!params) params = {};
    this.navCtrl.push(ConversacionPage);
  }goToAmigos(params){
    if (!params) params = {};
    this.navCtrl.push(AmigosPage);
  }
}
