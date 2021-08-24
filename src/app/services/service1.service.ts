import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Service4Service} from "./service4.service";

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  // API_URL = 'http://localhost:8080'
  API_URL = 'https://cbvbunsxyb.herokuapp.com'

  constructor(
    public http: HttpClient,
    public router: Router,
    public service4: Service4Service
  ) {
  }

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/register`,
      data
    )
  }

  login(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/login`,
      data
    )
  }

  logout(): void {
    localStorage.removeItem('jwt_token')
    this.router.navigate(['/', 'login'])
  }

  get_user_info(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_user_info`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  update_profile(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/update_user`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }


  change_password(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/change_password`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  add_post(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  getallposts(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/get_all_post`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  get_single_post(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/get_single_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  edit_post(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/edit_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  get_all_comments_for_post(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/comment_for_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  add_comment(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/add_comment`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  edit_comment(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/edit_comment`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  delete_comment(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/delete_comment`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  delete_post(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/delete_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  like_post(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/like_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  dislike_post(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/dislike_post`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  upload_file(data: any): Observable<any> {
    return this.http.post(
      `${this.API_URL}/upload_file`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  all_unfollow_users(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/all_unfollow_users`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  all_follow_users(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/all_follow_users`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  followers_list(): Observable<any> {
    return this.http.get(
      `${this.API_URL}/followers_list`,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  follow_user(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/follow_user`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

  unfollow_user(data: any): Observable<any> {
    return this.http.put(
      `${this.API_URL}/unfollow_user`,
      data,
      {
        headers: new HttpHeaders({
          'authorization': `Bearer ${this.service4.gettoken()}`,
        })
      }
    )
  }

}
