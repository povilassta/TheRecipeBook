import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './create-recipe/recipe-form/recipe-form.component';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog/recipe-catalog.component';
import { RecipeComponent } from './recipe-view/recipe/recipe.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeCatalogComponent,
  },
  {
    path: 'recipes/:recipeId',
    component: RecipeComponent,
  },
  {
    path: 'login',
    canActivate: [AnonymousGuard],
    component: LoginComponent,
  },
  {
    path: 'create',
    component: RecipeFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
