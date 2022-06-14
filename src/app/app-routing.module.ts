import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog/recipe-catalog.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeCatalogComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
