import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CursadaPage } from '../cursada/cursada';
import { AmigosPage } from '../amigos/amigos';
import { MensajesPage } from '../mensajes/mensajes';
import { PerfilPage } from '../perfil/perfil';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = CursadaPage;
  tab2Root: any = AmigosPage;
  tab3Root: any = MensajesPage;
  tab4Root: any = PerfilPage;
  constructor(public navCtrl: NavController) {
  }
  
}
