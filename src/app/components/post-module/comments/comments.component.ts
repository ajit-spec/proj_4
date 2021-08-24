import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Service1Service} from "../../../services/service1.service";
import {Service5Service} from "../../../services/service5.service";
import {Service3Service} from "../../../services/service3.service";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public activatedroute: ActivatedRoute,
    public service1: Service1Service,
    public service5: Service5Service,
    public service3: Service3Service
  ) {
  }

  form = this.formbuilder.group(
    {
      description: [
        '',
        Validators.compose(
          [Validators.required]
        )
      ]
    }
  )

  post_id = null
  edit_comment = false
  comment_id = null
  post: any

  start_edit_comment(comment: any): void {
    console.log(comment)
    this.edit_comment = true
    this.comment_id = comment._id
    this.form.patchValue(
      {
        description: comment.description
      }
    )
  }

  delete_comment(comment: any): void {
    this.comment_id = comment._id
    const request = {
      comment_id: this.comment_id
    }
    this.service1.delete_comment(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      this.get_all_comments_for_post()
    })
  }

  ngOnInit(): void {

    this.activatedroute.queryParams.subscribe(value => {
      if (value.post_id) {
        this.post_id = value.post_id
        this.get_all_comments_for_post()
        this.getsinglepost()
      }

    })

  }

  getsinglepost(): void {
    this.service1.get_single_post({post_id: this.post_id}).subscribe(value => {
      this.post = value.post
    })
  }

  get_all_comments_for_post(): void {
    this.service1.get_all_comments_for_post({post_id: this.post_id}).subscribe(value1 => {
      if (value1.status === 1) {
        this.service5.allcomments = value1.comments
      }
    })
  }

  getformcontrols(): any {
    return this.form.controls
  }

  geterrormsgfordescription(): any {
    const description = this.getformcontrols().description;
    if (description.hasError('required')) {
      return `description is req`
    }
  }

  submit(): void {

    if (this.form.invalid) {
      return
    }

    if (this.edit_comment) {
      const request = {
        description: this.form.get('description')?.value,
        post_id: this.post_id,
        comment_id: this.comment_id
      }

      this.service1.edit_comment(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        this.form.reset()
        this.get_all_comments_for_post()
        this.edit_comment = false
      })
    } else {
      const request = {
        description: this.form.get('description')?.value,
        post_id: this.post_id
      }

      this.service1.add_comment(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        this.form.reset()
        this.get_all_comments_for_post()
      })
    }

  }

}
