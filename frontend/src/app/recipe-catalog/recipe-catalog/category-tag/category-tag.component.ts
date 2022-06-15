import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-tag',
  templateUrl: './category-tag.component.html',
  styleUrls: ['./category-tag.component.sass'],
})
export class CategoryTagComponent implements OnInit {
  constructor() {}

  @Input()
  public message: string = '';

  ngOnInit(): void {}
}
