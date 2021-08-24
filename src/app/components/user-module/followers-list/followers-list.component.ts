import { Component, OnInit } from '@angular/core';
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-followers-list',
  templateUrl: './followers-list.component.html',
  styleUrls: ['./followers-list.component.scss']
})
export class FollowersListComponent implements OnInit {

  constructor(
    public service1: Service1Service
  ) {
  }

  allusers: any = []

  ngOnInit(): void {
    this.followers_list()
  }

  followers_list(): void {
    this.service1.followers_list().subscribe(value => {
      this.allusers = value.users
    })
  }

}
