import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate pages correctly', () => {
    component.perPageCount = 20;
    component.itemCount = 1257;
    component.updateCount();
    expect(component.pageCount).toBe(63);
  });

  it('should calculate displayed pages correctly', () => {
    component.perPageCount = 20;
    component.currentPage = 5;
    component.itemCount = 200;
    component.updateCount();
    expect(component.displayedPages).toEqual([3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should change page', () => {
    component.changePage(5);
    expect(component.currentPage).toBe(5);
  });

  it('should update displayed pages correctly when changing page', () => {
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.changePage(8);
    expect(component.displayedPages).toEqual([6, 7, 8, 9, 10]);
  });

  it('should update displayed pages correctly when changing to page less than 5', () => {
    component.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    component.changePage(2);
    expect(component.displayedPages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should emit updateRecipe when changing page', () => {
    spyOn(component.updateRecipes, 'emit');
    component.changePage(69);
    expect(component.updateRecipes.emit).toHaveBeenCalledWith(69);
  });

  it('should change to next page', () => {
    spyOn(component, 'changePage');
    component.currentPage = 2;
    const button = fixture.nativeElement.querySelector('#nextBtn');
    button.dispatchEvent(new Event('click'));
    expect(component.changePage).toHaveBeenCalledWith(3);
  });

  it('should change to previous page', () => {
    spyOn(component, 'changePage');
    component.currentPage = 2;
    const button = fixture.nativeElement.querySelector('#previousBtn');
    button.dispatchEvent(new Event('click'));
    expect(component.changePage).toHaveBeenCalledWith(1);
  });

  it('should change to first page', () => {
    spyOn(component, 'changePage');
    component.currentPage = 58;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#firstBtn');
    button.dispatchEvent(new Event('click'));
    expect(component.changePage).toHaveBeenCalledWith(1);
  });
  it('should change to last page', () => {
    spyOn(component, 'changePage');
    component.currentPage = 1;
    component.displayedPages = [1, 2, 3, 4, 5, 6];
    component.pages = [1, 2, 3, 4, 5, 6];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('#lastBtn');
    button.dispatchEvent(new Event('click'));
    expect(component.changePage).toHaveBeenCalledWith(6);
  });
  it('should update count when input values change', () => {
    spyOn(component, 'ngOnChanges');
    component.itemCount = 100;
    fixture.detectChanges;
    expect(component.ngOnChanges).toHaveBeenCalled();
  });
});
