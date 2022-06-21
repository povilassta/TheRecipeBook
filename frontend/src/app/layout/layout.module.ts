import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, PaginatorComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [HeaderComponent, PaginatorComponent],
})
export class LayoutModule {}
