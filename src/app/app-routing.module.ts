import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { StatsComponent } from './components/stats/stats.component';
import { PledgesComponent } from './components/pledges/pledges.component';



const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'statistics',
    component: StatsComponent
  },
  {
    path: 'pledges',
    component: PledgesComponent
  },
  {
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
