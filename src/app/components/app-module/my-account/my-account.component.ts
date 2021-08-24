import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service2Service} from "../../../services/service2.service";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service2: Service2Service,
    public service1: Service1Service,
    public service3: Service3Service,
    public router: Router
  ) {
  }

  editprofile = false

  form1 = this.formbuilder.group(
    {
      name: [
        {
          value: 1,
          disabled: !this.editprofile
        },
        Validators.compose(
          [Validators.required]
        )
      ],
      phone: [
        {
          value: 1,
          disabled: !this.editprofile
        },
        Validators.compose(
          [this.service2.checkvalidphone]
        )
      ],
      relationship_status: [
        {
          value: 1,
          disabled: !this.editprofile
        },
        Validators.compose(
          [Validators.required]
        )
      ],
    }
  )

  form2 = this.formbuilder.group(
    {
      old_password: '',
      new_password: [
        '',
        Validators.compose(
          [this.service2.checkvalidpassword]
        )
      ]
    }
  )

  user_info: any = null

  enableprofile(): void {
    this.editprofile = true
    this.form1.enable()
  }

  upload_file(ev: any): void {
    console.log(ev.target.files[0])
    const file = ev.target.files[0]
    const formdata = new FormData()
    formdata.append('file', file)
    this.service1.upload_file(formdata).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      if (value.status === 1) {
        this.get_user_info()
      }
    })
  }

  ngOnInit(): void {
    this.service1.get_user_info().subscribe(value => {
      if (value.status === 1) {
        this.user_info = value.data
        this.form1.patchValue(
          {
            name: this.user_info?.name,
            phone: this.user_info?.phone,
            relationship_status: this.user_info?.relationship_status,
          }
        )
      }
    }, error => {
      console.log(error)
    })
  }

  get_user_info(): void {
    this.service1.get_user_info().subscribe(value => {
      if (value.status === 1) {
        this.user_info = value.data
      }
    }, error => {
      console.log(error)
    })
  }

  getformcontrols(): any {
    return this.form1.controls
  }

  getformcontrols2(): any {
    return this.form2.controls
  }

  geterrormsgforname(): any {
    const name = this.getformcontrols().name;
    if (name.hasError('required')) {
      return `name is req`
    }
  }

  geterrormsgforphone(): any {
    const phone = this.getformcontrols().phone;
    if (phone.hasError('notvalidphone')) {
      return `phone is not valid`
    }
  }

  geterrormsgfornew_password(): any {
    const new_password = this.getformcontrols2().new_password;
    if (new_password.hasError('notvalidpassword')) {
      return `password must be min 8 characters and must contain uppercase, lowercase,digit, special character`
    }
  }


  profilesubmit(): void {

    console.log(this.form1)

    if (this.form1.invalid) {
      return
    }


    const request = {
      name: this.form1.get('name')?.value,
      phone: this.form1.get('phone')?.value,
      relationship_status: this.form1.get('relationship_status')?.value,
    }

    this.service1.update_profile(request).subscribe(value => {
      if (value.status === 1) {
        this.service3.openSnackBar(value.msg)
        this.form1.disable()
        this.editprofile = false
        this.get_user_info()
      }
    }, error => {
      console.log(error)
    })

  }

  change_password(): void {

    if (this.form2.invalid) {
      return
    }

    const request = {
      old_password: this.form2.get('old_password')?.value,
      new_password: this.form2.get('new_password')?.value
    }

    this.service1.change_password(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      if (value.status === 1) {
        setTimeout(() => {
          this.service1.logout()
        }, 3000)
      }
    }, error => {
      const error_object = error.error.errors[0]
      this.service3.openSnackBar(error_object[Object.keys(error_object)[0]])
    })

  }


}
