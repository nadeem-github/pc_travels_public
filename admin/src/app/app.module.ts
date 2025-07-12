import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordionModule, NgbCarouselModule, NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardComponent } from './adminPages/dashboard/dashboard.component';
import { HomeTopSliderComponent } from './adminPages/home-top-slider/home-top-slider.component';
import { BlockHomeComponent } from './adminPages/block-home/block-home.component';
import { ParallaxHomeComponent } from './adminPages/parallax-home/parallax-home.component';
import { AboutUsPageComponent } from './adminPages/about-us-page/about-us-page.component';
import { OurPackagesComponent } from './adminPages/our-packages/our-packages.component';
import { TransportationComponent } from './adminPages/transportation/transportation.component';
import { WorkVisaHomeComponent } from './adminPages/work-visa-home/work-visa-home.component';
import { AvailableBlockComponent } from './adminPages/available-block/available-block.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BlockHomeAddModalComponent } from './adminPages/block-home/block-home-add-modal/block-home-add-modal.component';
import { AddNewAvailableBlockModalComponent } from './adminPages/available-block/add-new-available-block-modal/add-new-available-block-modal.component';
import { UsersEmailComponent } from './adminPages/users-email/users-email.component';
import { AboutUsAddModalComponent } from './adminPages/about-us-page/about-us-add-modal/about-us-add-modal.component';
import { AddAgentComponent } from './adminPages/add-agent/add-agent.component';
import { AddHotelsComponent } from './adminPages/add-hotels/add-hotels.component';
import { AddPackageModalComponent } from './adminPages/our-packages/add-package-modal/add-package-modal.component';
import { AddNewAgentModalComponent } from './adminPages/add-agent/add-new-agent-modal/add-new-agent-modal.component';
import { AddHotelModalComponent } from './adminPages/add-hotels/add-hotel-modal/add-hotel-modal.component';
import { AddCountryVisaComponent } from './adminPages/add-country-visa/add-country-visa.component';
import { PackageDetailsComponent } from './adminPages/package-details/package-details.component';
import { PackageDetailsModalComponent } from './adminPages/package-details/package-details-modal/package-details-modal.component';
import { AddNewCountryModalComponent } from './adminPages/add-country-visa/add-new-country-modal/add-new-country-modal.component';
import { AddCountryVisaModalComponent } from './adminPages/add-country-visa/add-country-visa-modal/add-country-visa-modal.component';
import { AddVisaDocumentsComponent } from './adminPages/add-country-visa/add-visa-documents/add-visa-documents.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent,
    HomeTopSliderComponent,
    BlockHomeComponent,
    ParallaxHomeComponent,
    AboutUsPageComponent,
    OurPackagesComponent,
    TransportationComponent,
    WorkVisaHomeComponent,
    AvailableBlockComponent,
    LoginComponent,
    RegistrationComponent,
    BlockHomeAddModalComponent,
    AddNewAvailableBlockModalComponent,
    UsersEmailComponent,
    AboutUsAddModalComponent,
    AddAgentComponent,
    AddHotelsComponent,
    AddPackageModalComponent,
    AddNewAgentModalComponent,
    AddHotelModalComponent,
    AddCountryVisaComponent,
    PackageDetailsComponent,
    PackageDetailsModalComponent,
    AddNewCountryModalComponent,
    AddCountryVisaModalComponent,
    AddVisaDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbCarouselModule,
    NgbAccordionModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
