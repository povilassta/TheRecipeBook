import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeCatalogModule } from '../recipe-catalog/recipe-catalog.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RecipeComponent, CommentCardComponent],
  imports: [
    CommonModule,
    RecipeCatalogModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
})
export class RecipeViewModule {}
