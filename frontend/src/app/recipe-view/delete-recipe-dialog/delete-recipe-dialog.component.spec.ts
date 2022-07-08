import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DeleteRecipeDialogComponent } from './delete-recipe-dialog.component';

describe('DeleteRecipeDialogComponent', () => {
  let component: DeleteRecipeDialogComponent;
  let fixture: ComponentFixture<DeleteRecipeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DeleteRecipeDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteRecipeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
