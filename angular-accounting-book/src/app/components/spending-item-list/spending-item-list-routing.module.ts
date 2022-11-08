import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpendingItemListComponent } from './spending-item-list.component';

const routes: Routes = [{ path: '', component: SpendingItemListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpendingItemListRoutingModule {}
