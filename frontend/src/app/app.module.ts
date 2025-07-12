import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TopSliderComponent } from './pages/homeComponents/top-slider/top-slider.component';
import { FlightDetailHomeComponent } from './pages/homeComponents/flight-detail-home/flight-detail-home.component';
import { AboutHomeComponent } from './pages/homeComponents/about-home/about-home.component';
import { ExperienceHomeComponent } from './pages/homeComponents/experience-home/experience-home.component';
import { PackagesHomeComponent } from './pages/homeComponents/packages-home/packages-home.component';
import { TranportHomeComponent } from './pages/homeComponents/tranport-home/tranport-home.component';
import { WorkVisaHomeComponent } from './pages/homeComponents/work-visa-home/work-visa-home.component';
import { AllAvailableBlockComponent } from './pages/all-available-block/all-available-block.component';
import { HttpClientModule } from '@angular/common/http';
import { HolidayPackagesHomeComponent } from './pages/homeComponents/holiday-packages-home/holiday-packages-home.component';
import { LandPackagesHomeComponent } from './pages/homeComponents/land-packages-home/land-packages-home.component';
import { HajjPackagesHomeComponent } from './pages/homeComponents/hajj-packages-home/hajj-packages-home.component';
import { HotelsHomeComponent } from './pages/homeComponents/hotels-home/hotels-home.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { PackageDetailViewComponent } from './pages/package-detail-view/package-detail-view.component';
import { TransportationDetailsComponent } from './pages/transportation-details/transportation-details.component';
import { VisaComponent } from './pages/visa/visa.component';
import { VisaHomeComponent } from './pages/homeComponents/visa-home/visa-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactComponent,
    TopSliderComponent,
    FlightDetailHomeComponent,
    AboutHomeComponent,
    ExperienceHomeComponent,
    PackagesHomeComponent,
    TranportHomeComponent,
    WorkVisaHomeComponent,
    AllAvailableBlockComponent,
    HolidayPackagesHomeComponent,
    LandPackagesHomeComponent,
    HajjPackagesHomeComponent,
    HotelsHomeComponent,
    HotelsComponent,
    PackageDetailViewComponent,
    TransportationDetailsComponent,
    VisaComponent,
    VisaHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
