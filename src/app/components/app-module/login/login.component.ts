import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Service2Service} from "../../../services/service2.service";
import {Service1Service} from "../../../services/service1.service";
import {Service3Service} from "../../../services/service3.service";
import {Service4Service} from "../../../services/service4.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    public formbuilder: FormBuilder,
    public service2: Service2Service,
    public service1: Service1Service,
    public service3: Service3Service,
    public service4: Service4Service,
    public router: Router
  ) {
  }

  form = this.formbuilder.group(
    {
      email: [
        '',
        Validators.compose(
          [Validators.required, this.service2.checkvalidemail]
        )
      ],
      password: [
        '',
        Validators.compose(
          [Validators.required]
        )
      ]
    }
  )

  getformcontrols(): any {
    return this.form.controls
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
    }
  }

  ngOnInit(): void {
  }

  submit(): void {

    if (this.form.invalid) {
      return
    }

    const request = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.service1.login(request).subscribe(value => {
      console.log(value)
      if (value.status === 1) {
        this.service3.openSnackBar(value.msg)
        setTimeout(() => {
          this.service4.settoken(value.token)
          this.router.navigate(['/', 'post'])
        }, 3000)
      } else if (value.status === 0) {
        this.service3.openSnackBar(value.msg)
      }

    }, error => {
      console.log(error)
    })

  }

}
