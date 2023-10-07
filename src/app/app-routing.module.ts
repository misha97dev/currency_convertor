import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './pages/converter/converter.component';

const routes: Routes = [
  {
    path: 'converter',
    component: ConverterComponent,
  },
  {
    path: '',
    redirectTo: 'converter',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'converter',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
