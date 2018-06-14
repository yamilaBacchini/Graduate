import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PerfilPage } from '../pages/perfil/perfil';
import { AmigosPage } from '../pages/amigos/amigos';
import { GrupoPage } from '../pages/grupo/grupo';
import { CursadaPage } from '../pages/cursada/cursada';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { MensajesPage } from '../pages/mensajes/mensajes';
import { MateriaPage } from '../pages/materia/materia';
import { NuevoEventoPage } from '../pages/nuevo-evento/nuevo-evento';
import { DetalleEventoPage } from '../pages/detalle-evento/detalle-evento';
import { HistorialPage } from '../pages/historial/historial';
import { AgregarMateriasALaCursadaPage } from '../pages/agregar-materias-ala-cursada/agregar-materias-ala-cursada';
import { ConversacionPage } from '../pages/conversacion/conversacion';
import { LoginPage } from '../pages/login/login';
import { RegistrarsePage } from '../pages/registrarse/registrarse';
import { ForoPage } from '../pages/foro/foro';
import { TemaPage } from '../pages/tema/tema';
import { SeleccioneCarreraPage } from '../pages/seleccione-carrera/seleccione-carrera';


//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    PerfilPage,
    AmigosPage,
    GrupoPage,
    CursadaPage,
    TabsControllerPage,
    MensajesPage,
    MateriaPage,
    NuevoEventoPage,
    DetalleEventoPage,
    HistorialPage,
    AgregarMateriasALaCursadaPage,
    ConversacionPage,
    LoginPage,
    RegistrarsePage,
    ForoPage,
    TemaPage,
    SeleccioneCarreraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PerfilPage,
    AmigosPage,
    GrupoPage,
    CursadaPage,
    TabsControllerPage,
    MensajesPage,
    MateriaPage,
    NuevoEventoPage,
    DetalleEventoPage,
    HistorialPage,
    AgregarMateriasALaCursadaPage,
    ConversacionPage,
    LoginPage,
    RegistrarsePage,
    ForoPage,
    TemaPage,
    SeleccioneCarreraPage
  ],
  providers: [
    //StatusBar,
    //SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
