import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service1: Service1Service,
    public service3: Service3Service,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
  }

  form = this.formbuilder.group(
    {
      title: [
        '',
        Validators.compose(
          [Validators.required]
        )
      ],
      description: [
        '',
        Validators.compose(
          [Validators.required]
        )
      ]
    }
  )

  isedit = false
  post_id = ''

  getformcontrols(): any {
    return this.form.controls
  }

  geterrormsgfortitle(): any {
    const title = this.getformcontrols().title;
    if (title.hasError('required')) {
      return `title is req`
    }
  }

  geterrormsgfordescription(): any {
    const description = this.getformcontrols().description;
    if (description.hasError('required')) {
      return `description is req`
    }
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(value => {

      if (value.post_id) {
        this.isedit = true
        this.post_id = value.post_id
        this.service1.get_single_post({post_id: this.post_id}).subscribe(value1 => {
          this.form.patchValue(
            {
              title: value1.post.title,
              description: value1.post.description
            }
          )
        })
      }

    })

  }

  submit(): void {

    if (this.form.invalid) {
      return;
    }

    const request = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value
    }

    if (this.isedit) {
      const request = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
        post_id: this.post_id
      }

      this.service1.edit_post(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        if (value.status === 1) {
          setTimeout(() => {
            this.router.navigate(['/', 'post'])
          }, 3000)
        }

      }, error => {
        const error_object = error.error.errors[0]
        this.service3.openSnackBar(error_object[Object.keys(error_object)[0]])
      })

    } else {
      const request = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value
      }

      this.service1.add_post(request).subscribe(value => {
        this.service3.openSnackBar(value.msg)
        if (value.status === 1) {
          setTimeout(() => {
            this.router.navigate(['/', 'post'])
          }, 3000)
        }

      }, error => {
        const error_object = error.error.errors[0]
        this.service3.openSnackBar(error_object[Object.keys(error_object)[0]])
      })

    }


  }

}
