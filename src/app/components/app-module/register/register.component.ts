import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service2Service} from "../../../services/service2.service";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public formbuilder: FormBuilder,
    public service2: Service2Service,
    public service1: Service1Service,
    public service3: Service3Service,
    public router: Router
  ) {
  }

  form = this.formbuilder.group(
    {
      name: [
        '',
        Validators.compose(
          [Validators.required]
        )
      ],
      email: [
        '',
        Validators.compose(
          [Validators.required, this.service2.checkvalidemail]
        )
      ],
      password: [
        '',
        Validators.compose(
          [Validators.required, this.service2.checkvalidpassword]
        )
      ]
    }
  )

  getformcontrols(): any {
    return this.form.controls
  }

  geterrormsgforname(): any {
    const name = this.getformcontrols().name;
    if (name.hasError('required')) {
      return `name is req`
    }
  }

  geterrormsgforemail(): any {
    const email = this.getformcontrols().email;
    if (email.hasError('required')) {
      return `email is req`
    } else if (email.hasError('notvalidemail')) {
      return `email is not valid`
    }
  }

  geterrormsgforpassword(): any {
    const password = this.getformcontrols().password;
    if (password.hasError('required')) {
      return `password is req`
    } else if (password.hasError('notvalidpassword')) {
      return `password must be min 8 characters and must contain uppercase, lowercase,digit, special character`
    }
  }

  ngOnInit(): void {
  }

  submit(): void {

    if (this.form.invalid) {
      return
    }

    const request = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.service1.register(request).subscribe(value => {
      this.service3.openSnackBar(value.msg)
      setTimeout(() => {
        this.router.navigate(['/', 'login'])
      }, 3000)
    }, error => {
      console.log(error)
    })

  }

}
