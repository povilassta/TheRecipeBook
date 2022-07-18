import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Comment } from 'src/app/models/comment.model';

@UntilDestroy()
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.sass'],
})
export class CommentCardComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe((langChangeEvent: LangChangeEvent) => {
        this.locale = langChangeEvent.lang;
      });
  }

  @Input()
  public comment: Comment | undefined;

  public locale = localStorage.getItem('language') || 'en';

  public ngOnInit(): void {}
}
