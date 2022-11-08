import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginStatusComponent } from './login-status.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginStatusComponent],
  exports: [LoginStatusComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
})
export class LoginStatusModule {}
