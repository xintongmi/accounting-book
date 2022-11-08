import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginStatusComponent } from './login-status.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [LoginStatusComponent],
  exports: [LoginStatusComponent],
  imports: [CommonModule, MatButtonModule],
})
export class LoginStatusModule {}
