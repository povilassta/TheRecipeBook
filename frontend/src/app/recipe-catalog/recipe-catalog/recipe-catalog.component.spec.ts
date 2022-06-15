import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCatalogComponent } from './recipe-catalog.component';

describe('RecipeCatalogComponent', () => {
  let component: RecipeCatalogComponent;
  let fixture: ComponentFixture<RecipeCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
