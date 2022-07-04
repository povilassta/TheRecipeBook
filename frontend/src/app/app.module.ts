import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeCatalogModule } from './recipe-catalog/recipe-catalog.module';
import { LoginModule } from './login/login.module';
import { RecipeViewModule } from './recipe-view/recipe-view.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CreateRecipeModule } from './create-recipe/create-recipe.module';
import { NotFoundModule } from './not-found/not-found.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecipeCatalogModule,
    LoginModule,
    RecipeViewModule,
    LayoutModule,
    HttpClientModule,
    CreateRecipeModule,
    NotFoundModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forRoot({ user: userReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
