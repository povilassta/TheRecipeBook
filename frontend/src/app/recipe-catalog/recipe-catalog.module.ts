import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCatalogComponent } from './recipe-catalog/recipe-catalog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { RecipeCardComponent } from './recipe-catalog/recipe-card/recipe-card.component';
import { CategoryTagComponent } from './recipe-catalog/category-tag/category-tag.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    RecipeCatalogComponent,
    RecipeCardComponent,
    CategoryTagComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    FormsModule,
    MatPaginatorModule,
  ],
  exports: [CategoryTagComponent],
})
export class RecipeCatalogModule {}
