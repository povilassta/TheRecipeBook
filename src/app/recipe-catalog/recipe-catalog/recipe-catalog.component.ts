import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-catalog',
  templateUrl: './recipe-catalog.component.html',
  styleUrls: ['./recipe-catalog.component.sass']
})
export class RecipeCatalogComponent implements OnInit {

  constructor() { }

  public value: number = 60;

  ngOnInit(): void {
  }

}
