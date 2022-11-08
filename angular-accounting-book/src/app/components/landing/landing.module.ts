import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { LoginStatusModule } from '../login-status/login-status.module';

@NgModule({
  declarations: [LandingComponent],
  exports: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MdbCarouselModule,
    LoginStatusModule,
  ],
})
export class LandingModule {}
