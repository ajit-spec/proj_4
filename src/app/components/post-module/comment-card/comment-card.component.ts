import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {

  constructor() { }

  @Input('comment') comment: any
  @Output('editcomm') editcomm = new EventEmitter()
  @Output('delcomm') delcomm = new EventEmitter()

  ngOnInit(): void {
  }


}
