import {Component, OnInit} from '@angular/core';
import {Service1Service} from "../../../services/service1.service";
import {Service5Service} from "../../../services/service5.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    public service1: Service1Service,
    public service5: Service5Service
  ) {
  }

  ngOnInit(): void {
    this.getallposts()
  }

  getallposts(): void {
    this.service1.getallposts().subscribe(value => {
      this.service5.allposts = value.posts
    }, error => {
      console.log(error)
    })
  }

}
