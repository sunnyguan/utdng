import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionsComponent } from './sections/sections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { SectionSearchComponent } from './section-search/section-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/smart', pathMatch: 'full' },
  { path: 'detail/:sid', component: SectionDetailComponent },
  { path: 'sections/:query', component: SectionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'smart', component: SectionSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }