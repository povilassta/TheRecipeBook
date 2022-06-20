import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.sass'],
})
export class PaginatorComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private componentCommunicationService: ComponentCommunicationService,
    private _Activatedroute: ActivatedRoute
  ) {
    this._Activatedroute.queryParamMap.subscribe((params) => {
      this.timeFilter = Number(params.get('time')) || 60;
      this.categoryFilter = params.get('filter')?.split(',') || [];
      this.updateCount(); // Update page count everytime url changes
    });
  }

  @Input()
  public perPageCount = 0;
  @Input()
  public currentPage = 0;

  public timeFilter: number = 60;
  public categoryFilter: string[] = [];

  public itemCount = 0;
  public pageCount = 0;
  public pages: number[] = [];
  public displayedPages: number[] = [];

  public changePage(pageNum: number): void {
    // Change current page number
    this.currentPage = pageNum;
    //Change displayed pages
    this.displayedPages = this.pages.slice(
      this.currentPage < 5 ? 0 : this.currentPage - 3
    );
    // Call to update displayed values
    this.componentCommunicationService.callUpdateRecipes(pageNum);
    // Reset scrolling
    window.scrollTo(0, 0);
  }

  private updateCount() {
    this.recipeService
      .getCount(this.categoryFilter.join(','), this.timeFilter)
      .subscribe((count) => {
        this.itemCount = count;
        this.pageCount = Math.ceil(this.itemCount / this.perPageCount);
        this.pages = Array.from({ length: this.pageCount }, (_, i) => i + 1);
        this.displayedPages = this.pages.slice(
          this.currentPage < 5 ? 0 : this.currentPage - 3
        );
        console.log(this.itemCount);
      });
  }

  ngOnInit(): void {
    this.updateCount();
  }
}
