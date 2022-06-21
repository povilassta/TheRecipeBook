import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.sass'],
})
export class CommentCardComponent implements OnInit {
  constructor() {}

  @Input()
  public comment: Comment | undefined;
  public howLongAgo = '';

  public ngOnInit(): void {
    this.howLongAgo = moment(this.comment?.date).fromNow();
  }
}
