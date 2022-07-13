import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CommentService } from 'src/app/services/comment.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipeComponent } from './recipe.component';
import { MatIconModule } from '@angular/material/icon';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;
  let recipeService: RecipeService;
  let commentService: CommentService;
  let router: Router;
  let snackBar: MatSnackBar;

  let RECIPE: Recipe = {
    _id: '1',
    title: 'test',
    likeCounter: 10,
    timeMinutes: 50,
    categories: [
      {
        _id: '2',
        name: 'test',
      },
    ],
    instructions: ['test'],
    imageUrls: ['test'],
    ingredients: ['test'],
    userId: '3',
    date: new Date(),
  };

  let COMMENTS: Comment[] = [
    {
      _id: '4',
      content: 'test',
      user: {
        _id: '3',
        username: 'test',
        email: 'test',
        profilePictureUrl: 'test',
      },
      date: new Date(),
      recipeId: '1',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        MatMenuModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
      declarations: [RecipeComponent],
    }).compileComponents();

    // Inject services
    recipeService = TestBed.inject(RecipeService);
    commentService = TestBed.inject(CommentService);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);

    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get required data on init', async () => {
    spyOn(recipeService, 'getRecipe').and.returnValue(of(RECIPE));
    spyOn(commentService, 'getComments').and.returnValue(of(COMMENTS));
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.recipe).toEqual(RECIPE);
    expect(component.comments).toEqual(COMMENTS);
    expect(component.isLoading).toBeFalse();
  });

  it('should redirect to 404', async () => {
    spyOn(recipeService, 'getRecipe').and.returnValue(
      throwError({ status: 404 })
    );
    spyOn(router, 'navigateByUrl');

    component.ngOnInit();
    await fixture.whenStable();

    expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/404');
  });

  it('should open a snackbar', async () => {
    spyOn(recipeService, 'getRecipe').and.returnValue(
      throwError({ status: 500 })
    );
    spyOn(snackBar, 'open');

    component.ngOnInit();
    await fixture.whenStable();

    expect(snackBar.open).toHaveBeenCalledTimes(1);
  });

  it('should toggle completed class', () => {
    component.isLoading = false;
    component.recipe = RECIPE;
    component.comments = COMMENTS;
    fixture.detectChanges();

    let instructionLi = fixture.nativeElement.querySelector(
      '.recipe__instructions li'
    );

    instructionLi.click();
    expect(instructionLi).toHaveClass('completed');

    instructionLi.click();
    expect(instructionLi).not.toHaveClass('completed');
  });

  it('should reset comment form, fetch comments', async () => {
    spyOn(commentService, 'getComments').and.returnValue(of(COMMENTS));
    spyOn(component.commentForm, 'reset');

    component.updateComments();
    await fixture.whenStable();

    expect(component.commentForm.reset).toHaveBeenCalledTimes(1);
    expect(component.comments).toEqual(COMMENTS);
  });

  it('should insert comment', async () => {
    spyOn(commentService, 'insertComment').and.returnValue(of(COMMENTS));
    spyOn(component, 'updateComments');
    // Stop loading
    component.isLoading = false;
    // Set recipe
    component.recipe = RECIPE;
    // Set recipe id
    component.recipeId = '1';
    // Set current user
    component.currentUser = {
      _id: '3',
      username: 'test',
      email: 'test',
      profilePictureUrl: 'test',
    };
    // Pre-fill comment form
    component.commentForm.setValue({ commentContent: 'test comment' });

    fixture.detectChanges();

    // Select comment button
    const btn = fixture.nativeElement.querySelector('#commentBtn');

    btn.click();
    await fixture.whenStable();

    expect(commentService.insertComment).toHaveBeenCalledOnceWith(
      { content: 'test comment' },
      '1'
    );
    expect(component.updateComments).toHaveBeenCalledTimes(1);
  });
});
