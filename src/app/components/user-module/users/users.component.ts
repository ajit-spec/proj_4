import {Component, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    public service1: Service1Service
  ) {
  }

  allusers: any = []

  ngOnInit(): void {
    this.all_unfollow_users()
  }

  all_unfollow_users(): void {
    this.service1.all_unfollow_users().subscribe(value => {
      this.allusers = value.users
    })
  }

}
