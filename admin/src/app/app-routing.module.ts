import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './adminPages/dashboard/dashboard.component';
import { HomeTopSliderComponent } from './adminPages/home-top-slider/home-top-slider.component';
import { BlockHomeComponent } from './adminPages/block-home/block-home.component';
import { ParallaxHomeComponent } from './adminPages/parallax-home/parallax-home.component';
import { TransportationComponent } from './adminPages/transportation/transportation.component';
import { WorkVisaHomeComponent } from './adminPages/work-visa-home/work-visa-home.component';
import { AvailableBlockComponent } from './adminPages/available-block/available-block.component';
import { AboutUsPageComponent } from './adminPages/about-us-page/about-us-page.component';
import { OurPackagesComponent } from './adminPages/our-packages/our-packages.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersEmailComponent } from './adminPages/users-email/users-email.component';
import { AddAgentComponent } from './adminPages/add-agent/add-agent.component';
import { AddHotelsComponent } from './adminPages/add-hotels/add-hotels.component';
import { AuthGuard } from './guard/auth.guard';
import { AddCountryVisaComponent } from './adminPages/add-country-visa/add-country-visa.component';
import { PackageDetailsComponent } from './adminPages/package-details/package-details.component';
import { AddVisaDocumentsComponent } from './adminPages/add-country-visa/add-visa-documents/add-visa-documents.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Admin layout routes
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'topSlider', component: HomeTopSliderComponent },
      { path: 'blockHome', component: BlockHomeComponent },
      { path: 'parallaxHome', component: ParallaxHomeComponent },
      { path: 'transportation', component: TransportationComponent },
      { path: 'workVisa', component: WorkVisaHomeComponent },
      { path: 'availableBlock', component: AvailableBlockComponent },
      { path: 'aboutUs', component: AboutUsPageComponent },
      { path: 'ourPackages', component: OurPackagesComponent },
      { path: 'usersEmail', component: UsersEmailComponent },
      { path: 'addAgent', component: AddAgentComponent },
      { path: 'addHotels', component: AddHotelsComponent },
      { path: 'addCountryVisa', component: AddCountryVisaComponent },
      { path: 'packageDetails', component: PackageDetailsComponent },
      { path: 'addVisaDocuments', component: AddVisaDocumentsComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
