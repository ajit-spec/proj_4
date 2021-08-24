import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class Service2Service {

  constructor() {
  }

  checkvalidemail(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(email)) {
      return (
        {
          notvalidemail: true
        }
      )
    }
    return null
  }

  checkvalidpassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
    if (!regex.test(password)) {
      return (
        {
          notvalidpassword: true
        }
      )
    }
    return null
  }

  checkvalidphone(control: AbstractControl): ValidationErrors | null {
    const phone = control.value;
    const regex = /^\d{10}$/
    if (phone) {
      if (!regex.test(phone)) {
        return (
          {
            notvalidphone: true
          }
        )
      }
    }

    return null
  }

}
