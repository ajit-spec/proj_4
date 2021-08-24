import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public service3: Service3Service
  ) {
  }

  @Input('user') user: any
  @Input('isfollowed') isfollowed: any
  @Input('show_followers') show_followers: any

  @Output('all_unfollow_users') all_unfollow_users = new EventEmitter()
  @Output('all_follow_users') all_follow_users = new EventEmitter()

  ngOnInit(): void {

  }

  follow_user(): void {

    const request = {
      follow_id: this.user._id
    }

    if (this.isfollowed) {
      this.service1.unfollow_user(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        if (value.status === 1) {
          this.isfollowed = false
          this.all_follow_users.emit()
        }
      })
    } else {
      this.service1.follow_user(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        if (value.status === 1) {
          this.isfollowed = true
          this.all_unfollow_users.emit()
        }
      })
    }


  }

}
