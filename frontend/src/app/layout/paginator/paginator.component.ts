import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterModel } from 'src/app/models/filter.model';
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
      this.updateCount(); // Update page count everytime url changes
    });
  }

  @Input()
  public perPageCount = 0;
  @Input()
  public currentPage = 0;
  @Input()
  public filterObj: FilterModel = {
    time: 60,
    categories: [],
    sort: 'recent',
  };

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
    this.recipeService.getCount(this.filterObj).subscribe((count) => {
      this.itemCount = count;
      this.pageCount = Math.ceil(this.itemCount / this.perPageCount);
      this.pages = Array.from({ length: this.pageCount }, (_, i) => i + 1);
      this.displayedPages = this.pages.slice(
        this.currentPage < 5 ? 0 : this.currentPage - 3
      );
    });
  }

  ngOnInit(): void {}
}
