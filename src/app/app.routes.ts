// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/apartamentos', pathMatch: 'full' },
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'contacto', component: ContactoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
