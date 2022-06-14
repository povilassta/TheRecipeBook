import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass'],
})
export class RecipeCatalogComponent implements OnInit {
  constructor() {}

  // Mock data of the same delicious burger
  public recipes: Recipe[] = [
    {
      title: 'American burger0',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger1',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger2',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger3',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger4',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger5',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger6',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger7',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger8',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger9',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger10',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger11',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger12',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger13',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger14',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger15',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger16',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger17',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger18',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
    {
      title: 'American burger19',
      categories: ['american', 'barbeque', 'fast'],
      time: 25,
    },
  ];
  public value: number = 60;
  public pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: this.recipes.length,
  };

  ngOnInit(): void {}
}
