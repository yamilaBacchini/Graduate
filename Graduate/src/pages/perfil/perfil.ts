import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage {
  editar: boolean = false;
  valueNombre: string = '';
  valueTelefono: string = '';
  valueMail: string = '';
  valueFechaNacimiento: Date = new Date();
  valueDescripcion: string = '';
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }

  onClickEditar() {
    this.editar = !this.editar;
  }

  
}
