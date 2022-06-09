import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog/recipe-catalog.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeCatalogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
