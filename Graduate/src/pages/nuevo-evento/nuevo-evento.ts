import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MateriaPage } from '../materia/materia';
import { DetalleEventoPage } from '../detalle-evento/detalle-evento';
import { ForoPage } from '../foro/foro';
import { TemaPage } from '../tema/tema';

@Component({
  selector: 'page-nuevo-evento',
  templateUrl: 'nuevo-evento.html'
})
export class NuevoEventoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToMateria(params){
    if (!params) params = {};
    this.navCtrl.push(MateriaPage);
  }goToNuevoEvento(params){
    if (!params) params = {};
    this.navCtrl.push(NuevoEventoPage);
  }goToDetalleEvento(params){
    if (!params) params = {};
    this.navCtrl.push(DetalleEventoPage);
  }goToForo(params){
    if (!params) params = {};
    this.navCtrl.push(ForoPage);
  }goToTema(params){
    if (!params) params = {};
    this.navCtrl.push(TemaPage);
  }
}
