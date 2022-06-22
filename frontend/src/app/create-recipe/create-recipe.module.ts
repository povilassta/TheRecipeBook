import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { FileInputComponent } from './file-input/file-input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { AppModule } from '../app.module';
import { DropZoneDirective } from '../directives/drop-zone.directive';

@NgModule({
  declarations: [
    RecipeFormComponent,
    FileInputComponent,
    ThumbnailComponent,
    DropZoneDirective,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CreateRecipeModule {}
