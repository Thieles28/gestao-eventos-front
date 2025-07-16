import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullComponent} from './layouts/full/full.component';
import {CriarEventosComponent} from "./components/cadastrar-evento/criar-eventos.component";
import {EventosComponent} from "./components/eventos/eventos.component";


const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {path: '', redirectTo: '/criar', pathMatch: 'full'},
      {path: 'criar', component: CriarEventosComponent},
      {path: 'atualizar/:id', component: CriarEventosComponent},
      {path: 'eventos', component: EventosComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
