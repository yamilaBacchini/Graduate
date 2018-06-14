import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CursadaPage } from '../cursada/cursada';
import { MateriaPage } from '../materia/materia';
import { NuevoEventoPage } from '../nuevo-evento/nuevo-evento';
import { DetalleEventoPage } from '../detalle-evento/detalle-evento';
import { ForoPage } from '../foro/foro';
import { TemaPage } from '../tema/tema';
import { AgregarMateriasALaCursadaPage } from '../agregar-materias-ala-cursada/agregar-materias-ala-cursada';

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html'
})
export class HistorialPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToCursada(params){
    if (!params) params = {};
    this.navCtrl.push(CursadaPage);
  }goToMateria(params){
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
  }goToHistorial(params){
    if (!params) params = {};
    this.navCtrl.push(HistorialPage);
  }goToAgregarMateriasALaCursada(params){
    if (!params) params = {};
    this.navCtrl.push(AgregarMateriasALaCursadaPage);
  }
}
