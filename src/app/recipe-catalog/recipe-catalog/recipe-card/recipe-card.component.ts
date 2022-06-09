import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit {

  constructor() { }

  public tags: string[] = ["American", "Barbeque", "Fast"];

  ngOnInit(): void {
  }

}
