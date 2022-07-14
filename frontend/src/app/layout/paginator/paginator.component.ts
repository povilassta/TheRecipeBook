import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  constructor() {}

  @Input()
  public perPageCount = 0;
  @Input()
  public currentPage = 0;
  @Input()
  public itemCount = 0;
  @Output()
  public updateRecipes = new EventEmitter<number>();

  public pageCount = 0;
  public pages: number[] = [];
  public displayedPages: number[] = [];

  public changePage(pageNum: number): void {
    //Update current page
    this.currentPage = pageNum;
    //Emit update recipes
    this.updateRecipes.emit(pageNum);
    //Change displayed pages
    this.displayedPages = this.pages.slice(pageNum < 5 ? 0 : pageNum - 3);
    // Reset scrolling
    window.scrollTo(0, 0);
  }

  public updateCount() {
    this.pageCount = Math.ceil(this.itemCount / this.perPageCount);
    this.pages = Array.from({ length: this.pageCount }, (_, i) => i + 1);
    this.displayedPages = this.pages.slice(
      this.currentPage < 5 ? 0 : this.currentPage - 3
    );
  }

  ngOnInit(): void {
    this.updateCount();
  }

  ngOnChanges(): void {
    this.updateCount();
  }
}
