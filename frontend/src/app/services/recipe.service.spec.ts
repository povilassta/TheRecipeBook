import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FilterModel } from '../models/filter.model';
import { RecipePost } from '../models/recipePost.model';

import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RecipeService);
    httpController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post once with correct body', (done: DoneFn) => {
    // Spy
    spyOn(httpClient, 'post').and.callThrough();
    // Test input data
    const page = 1;
    const filterObj: FilterModel = {
      sort: 'sort',
      categories: [],
      time: 60,
    };
    service.getRecipes(page, filterObj).subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledOnceWith(service.BASE_URL, {
        ...filterObj,
        page,
      });
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'POST',
        url: service.BASE_URL,
      })
      .flush({});
  });

  it('should call get with correct url', (done: DoneFn) => {
    spyOn(httpClient, 'get').and.callThrough();
    const recipeId = '1';
    service.getRecipe(recipeId).subscribe(() => {
      expect(httpClient.get).toHaveBeenCalledOnceWith(
        `${service.BASE_URL}${recipeId}`
      );
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'GET',
        url: `${service.BASE_URL}${recipeId}`,
      })
      .flush({});
  });

  it('should call put with correct form data', (done: DoneFn) => {
    // Spy
    spyOn(httpClient, 'put').and.callThrough();
    // Mock data
    const recipeId = '1';
    const recipe: RecipePost = {
      title: 'Test recipe',
      ingredients: ['test'],
      instructions: ['test'],
      categories: ['62cbc2658f9482b118b26328'],
      imageUrls: ['test url'],
      timeMinutes: 55,
    };
    const markedForDeletion = ['image to delete'];
    const file = <File>new Blob([''], { type: 'image/*' });
    // Expected form data
    const expectedFormData = new FormData();
    expectedFormData.append('file', file);
    expectedFormData.append('data', JSON.stringify(recipe));
    expectedFormData.append(
      'markedForDeletion',
      JSON.stringify(markedForDeletion)
    );

    service
      .putRecipe([file], recipe, recipeId, markedForDeletion)
      .subscribe(() => {
        expect(httpClient.put).toHaveBeenCalledOnceWith(
          `${service.BASE_URL}${recipeId}`,
          expectedFormData
        );
        done();
      });

    // Mock request
    httpController
      .expectOne({
        method: 'PUT',
        url: `${service.BASE_URL}${recipeId}`,
      })
      .flush({});
  });

  it('should call post with correct form data', (done: DoneFn) => {
    // Spy
    spyOn(httpClient, 'post').and.callThrough();
    // Mock data
    const recipe: RecipePost = {
      title: 'Test recipe',
      ingredients: ['test'],
      instructions: ['test'],
      categories: ['62cbc2658f9482b118b26328'],
      imageUrls: ['test url'],
      timeMinutes: 55,
    };
    const file = <File>new Blob([''], { type: 'image/*' });
    // Expected form data
    const expectedFormData = new FormData();
    expectedFormData.append('file', file);
    expectedFormData.append('data', JSON.stringify(recipe));

    service.postRecipe([file], recipe).subscribe(() => {
      expect(httpClient.post).toHaveBeenCalledOnceWith(
        `${service.BASE_URL}create`,
        expectedFormData
      );
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'POST',
        url: `${service.BASE_URL}create`,
      })
      .flush({});
  });

  it('should call delete with correct url', (done: DoneFn) => {
    // Spy
    spyOn(httpClient, 'delete').and.callThrough();
    // Mock data
    const recipeId = '1';

    service.deleteRecipe(recipeId).subscribe(() => {
      expect(httpClient.delete).toHaveBeenCalledOnceWith(
        `${service.BASE_URL}${recipeId}`
      );
      done();
    });

    // Mock request
    httpController
      .expectOne({
        method: 'DELETE',
        url: `${service.BASE_URL}${recipeId}`,
      })
      .flush({});
  });
});
