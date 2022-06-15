import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './guards/anonymous.guard';
import { LoginComponent } from './login/login/login.component';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog/recipe-catalog.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeCatalogComponent,
  },
  {
    path: 'login',
    canActivate: [AnonymousGuard],
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
