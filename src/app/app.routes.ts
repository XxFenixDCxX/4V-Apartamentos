import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/apartamentos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
