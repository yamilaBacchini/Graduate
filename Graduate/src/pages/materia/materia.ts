import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NuevoEventoPage } from '../nuevo-evento/nuevo-evento';
import { DetalleEventoPage } from '../detalle-evento/detalle-evento';
import { ForoPage } from '../foro/foro';
import { TemaPage } from '../tema/tema';

@Component({
  selector: 'page-materia',
  templateUrl: 'materia.html'
})
export class MateriaPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToNuevoEvento(params){
    if (!params) params = {};
    this.navCtrl.push(NuevoEventoPage);
  }goToMateria(params){
    if (!params) params = {};
    this.navCtrl.push(MateriaPage);
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
