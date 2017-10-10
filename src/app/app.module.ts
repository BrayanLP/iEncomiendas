import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from '../app/services/firebase/firebase.service';

import { MaterializeModule } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { Error404Component } from './error-404/error-404.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ColaboradoresPipe } from './pipe/colaboradores.pipe';
import { VentasListadoComponent } from './ventas/listado/listado.component';
import { VentasRegistrarComponent } from './ventas/registrar/registrar.component';
import { ComprasRegistroComponent } from './compras/registro/registro.component';
import { ComprasListadoComponent } from './compras/listado/listado.component';
import { InventarioListadoComponent } from './inventario/listado/listado.component';
import { InventarioRegistrarComponent } from './inventario/registrar/registrar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EditComponent } from './inventario/listado/modal/edit/edit.component';

const appRoutes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: ':id',
    component: DashboardComponent
  },
  {
    path: ':id/usuarios',
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full'},
      // { path: 'registrar', component: VentasRegistrarComponent},
      { path: 'listado', component: UsuariosComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },

  {
    path: ':id/ventas',
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full'},
      { path: 'registrar', component: VentasRegistrarComponent},
      { path: 'listado', component: VentasListadoComponent}
    ]
  },
  {
    path: ':id/compras',
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full'},
      { path: 'registrar', component: ComprasRegistroComponent},
      { path: 'listado', component: ComprasListadoComponent}
    ]
  },
  {
    path: ':id/inventario',
    children: [
      { path: '', redirectTo: 'listado', pathMatch: 'full'},
      { path: 'registrar', component: InventarioRegistrarComponent},
      { path: 'listado', component: InventarioListadoComponent}
    ]
  },
  {
    path: '**',
    component: Error404Component
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyBDI6oVdAb0H2nLaNy6mmpHtYibrbbbnBE",
  authDomain: "breligo-1492382470222.firebaseapp.com",
  databaseURL: "https://breligo-1492382470222.firebaseio.com",
  storageBucket: "breligo-1492382470222.appspot.com",
  messagingSenderId: "578647227831"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarComponent,
    InicioComponent,
    Error404Component,
    UsuariosComponent,
    ColaboradoresPipe,
    VentasListadoComponent,
    VentasRegistrarComponent,
    ComprasRegistroComponent,
    ComprasListadoComponent,
    InventarioListadoComponent,
    InventarioRegistrarComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    EditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot()
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
  entryComponents: [
    EditComponent,
  ]
})
export class AppModule { }
