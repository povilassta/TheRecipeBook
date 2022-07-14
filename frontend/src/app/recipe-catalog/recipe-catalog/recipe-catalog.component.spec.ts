import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RecipeCatalogComponent } from './recipe-catalog.component';

describe('RecipeCatalogComponent', () => {
  let component: RecipeCatalogComponent;
  let fixture: ComponentFixture<RecipeCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatSnackBarModule,
        TranslateModule.forRoot(),
      ],
      declarations: [RecipeCatalogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
