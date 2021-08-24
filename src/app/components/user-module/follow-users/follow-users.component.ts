import { Component, OnInit } from '@angular/core';
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-follow-users',
  templateUrl: './follow-users.component.html',
  styleUrls: ['./follow-users.component.scss']
})
export class FollowUsersComponent implements OnInit {

  constructor(
    public service1: Service1Service
  ) {
  }

  allusers: any = []

  ngOnInit(): void {
    this.all_follow_users()
  }

  all_follow_users(): void {
    this.service1.all_follow_users().subscribe(value => {
      this.allusers = value.users
    })
  }

}
