import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopSliderComponent } from './pages/homeComponents/top-slider/top-slider.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AllAvailableBlockComponent } from './pages/all-available-block/all-available-block.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { PackageDetailViewComponent } from './pages/package-detail-view/package-detail-view.component';
import { TransportationDetailsComponent } from './pages/transportation-details/transportation-details.component';
import { VisaComponent } from './pages/visa/visa.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'allAvailableBlock', component: AllAvailableBlockComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'packageDetails', component: PackageDetailViewComponent },
  { path: 'transportationDetails', component: TransportationDetailsComponent },
  { path: 'visa', component: VisaComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
