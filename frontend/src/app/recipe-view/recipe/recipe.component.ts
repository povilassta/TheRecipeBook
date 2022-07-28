import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recipe } from 'src/app/models/recipe.model';
import { CommentService } from 'src/app/services/comment.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Comment } from 'src/app/models/comment.model';
import { User } from 'src/app/models/user.model';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecipeDialogComponent } from '../delete-recipe-dialog/delete-recipe-dialog.component';
import { AppStateService } from 'src/app/services/appState.service';
import { TranslateService } from '@ngx-translate/core';
import { catchError, Observable, of, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent {
  constructor(
    private renderer: Renderer2,
    private _Activatedroute: ActivatedRoute,
    private recipeService: RecipeService,
    private commentService: CommentService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public deleteDialog: MatDialog,
    private appStateService: AppStateService,
    private translate: TranslateService
  ) {
    this._Activatedroute.paramMap
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        this.recipeId = params.get('recipeId') || '';
      });
    this.appStateService
      .select('currentUser')
      .pipe(untilDestroyed(this))
      .subscribe((user: User | undefined) => {
        this.currentUser = user;
      });

    this.recipe$ = recipeService.getRecipe(this.recipeId).pipe(
      catchError((err) => {
        this.displayErrorPopup();
        return of();
      })
    );
    this.comments$ = commentService.getComments(this.recipeId);
  }

  public recipe$: Observable<Recipe>;
  public comments$: Observable<Comment[]>;
  public recipeId = '';
  public currentUser: User | undefined | null;
  public commentForm: FormGroup = new FormGroup({
    commentContent: new FormControl<string | null>(null, [Validators.required]),
  });
  public isLoading = true;

  // Toggle completed for instruction
  public toggleClass(event: any, className: string) {
    if (event.view.getSelection().type !== 'Range') {
      const hasClass = event.target.classList.contains(className);
      if (hasClass) {
        this.renderer.removeClass(event.target, className);
      } else {
        this.renderer.addClass(event.target, className);
      }
    }
  }

  public displayErrorPopup() {
    const spinnerEl = document.getElementById('spinner');
    if (spinnerEl) spinnerEl.style.display = 'none';
    this.translate
      .get(['errors.500', 'errors.closeBtn'])
      .pipe(untilDestroyed(this))
      .subscribe((res: any) => {
        this._snackBar.open(res['errors.500'], res['errors.closeBtn']);
      });
  }

  public likeRecipe() {
    this.recipe$ = this.recipeService.likeRecipe(this.recipeId).pipe(
      catchError((err) => {
        this.displayErrorPopup();
        return of();
      })
    );
  }

  public updateComments() {
    this.commentForm.reset();
    this.comments$ = this.commentService.getComments(this.recipeId).pipe(
      catchError((err) => {
        this.displayErrorPopup();
        return of();
      })
    );
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    const { commentContent } = this.commentForm.value;
    this.commentService
      .insertComment({ content: commentContent }, this.recipeId)
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        formDirective.resetForm();
        this.updateComments();
      });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.deleteDialog.open(DeleteRecipeDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.recipeService
            .deleteRecipe(this.recipeId)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: (res: any) => {
                this.router.navigateByUrl('/recipes');
              },
              error: (error: any) => {
                this.translate
                  .get(['errors.500', 'errors.refreshBtn'])
                  .pipe(untilDestroyed(this))
                  .subscribe((res: any) => {
                    console.log(res);
                    this._snackBar.open(
                      res['errors.500'],
                      res['errors.refreshBtn']
                    );
                  });
              },
            });
        }
      });
  }
}
