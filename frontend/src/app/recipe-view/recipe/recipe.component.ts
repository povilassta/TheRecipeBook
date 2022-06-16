import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recipe } from 'src/app/models/recipe.model';
import { CommentService } from 'src/app/services/comment.service';
import { ComponentCommunicationService } from 'src/app/services/componentCommunication.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Comment } from 'src/app/models/comment.model';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

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
    private componentCommunicationService: ComponentCommunicationService,
    private _Activatedroute: ActivatedRoute,
    private recipeService: RecipeService,
    private commentService: CommentService,
    private userService: UserService
  ) {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.recipeId = params.get('recipeId') || '';
    });
    this.componentCommunicationService.updateUserCalled$.subscribe(() => {
      this.currentUser = undefined;
    });
  }

  public recipe: Recipe | undefined;
  public comments: Comment[] | undefined;
  public recipeId = '';
  public currentUser: User | undefined;
  public commentForm: FormGroup = new FormGroup({
    commentContent: new FormControl('', [Validators.required]),
  });

  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);

    if (hasClass) {
      this.renderer.removeClass(event.target, className);
    } else {
      this.renderer.addClass(event.target, className);
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

  ngOnInit(): void {
    this.recipeService
      .getRecipe(this.recipeId)
      .subscribe((data: Recipe) => (this.recipe = data));
    this.commentService
      .getComments(this.recipeId)
      .subscribe((data: Comment[]) => {
        this.comments = data;
      });
    this.userService
      .getUser(localStorage.getItem('userId') || '')
      .subscribe((data: User) => {
        this.currentUser = data;
      });
  }
}