import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBookListComponent } from './account-book-list.component';

const routes: Routes = [{ path: '', component: AccountBookListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountBookListRoutingModule {}
