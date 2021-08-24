import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  constructor(
    public router: Router,
    public service1: Service1Service,
    public service3: Service3Service
  ) {
  }

  @Input('post') post: any
  @Output('getposts') getposts = new EventEmitter()

  ngOnInit(): void {
  }

  edit_post(): void {
    this.router.navigate(['/', 'post', 'add-post'], {queryParams: {post_id: this.post._id}})
  }

  deletepost(): void {
    const request = {
      post_id: this.post._id
    }

    this.service1.delete_post(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      this.getposts.emit();
    }, error => {
      console.log(error)
    })
  }

  like_post(): void {
    const request = {
      post_id: this.post._id
    }

    this.service1.like_post(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      this.getposts.emit();
    }, error => {
      console.log(error)
    })
  }

  dislike_post(): void {
    const request = {
      post_id: this.post._id
    }

    this.service1.dislike_post(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      this.getposts.emit();
    }, error => {
      console.log(error)
    })
  }

}
