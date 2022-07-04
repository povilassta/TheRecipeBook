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

@UntilDestroy()
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private _Activatedroute: ActivatedRoute,
    private recipeService: RecipeService,
    private commentService: CommentService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public deleteDialog: MatDialog,
    private appStateService: AppStateService
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
  }

  public recipe: Recipe | undefined;
  public comments: Comment[] | undefined;
  public recipeId = '';
  public currentUser: User | undefined | null;
  public commentForm: FormGroup = new FormGroup({
    commentContent: new FormControl('', [Validators.required]),
  });
  public isLoading = true;

  toggleClass(event: any, className: string) {
    if (event.view.getSelection().type !== 'Range') {
      const hasClass = event.target.classList.contains(className);

      if (hasClass) {
        this.renderer.removeClass(event.target, className);
      } else {
        this.renderer.addClass(event.target, className);
      }
    }
  }

  public updateComments() {
    this.commentForm.reset();
    this.commentService
      .getComments(this.recipeId)
      .subscribe((data: Comment[]) => {
        this.comments = data;
      });
  }

  public onSubmit(formDirective: FormGroupDirective): void {
    const { commentContent } = this.commentForm.value;
    this.commentService
      .insertComment({ content: commentContent }, this.recipeId)
      .subscribe((data: any) => {
        formDirective.resetForm();
        this.updateComments();
      });
  }

  public openDeleteDialog(): void {
    const dialogRef = this.deleteDialog.open(DeleteRecipeDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.deleteRecipe(this.recipeId).subscribe({
          next: (res: any) => {
            this.router.navigateByUrl('/recipes');
          },
          error: (error: any) => {
            this._snackBar.open(
              'Something went wrong with the server. Please try again in a few minutes',
              'Close'
            );
          },
        });
      }
    });
  }

  ngOnInit(): void {
    this.recipeService.getRecipe(this.recipeId).subscribe({
      next: (data: Recipe) => {
        this.recipe = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        if (err.status === 400 || err.status === 404) {
          this.router.navigateByUrl('/404');
        } else {
          this.isLoading = false;
          this._snackBar.open(
            'Something went wrong with the server. Please try to access the site again in a few minutes',
            'Refresh'
          );
          this._snackBar._openedSnackBarRef?.afterDismissed().subscribe(() => {
            window.location.reload();
          });
        }
      },
    });
    this.commentService
      .getComments(this.recipeId)
      .subscribe((data: Comment[]) => {
        this.comments = data;
      });
  }
}
