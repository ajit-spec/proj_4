import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "../../components/user-module/users/users.component";
import {FollowUsersComponent} from "../../components/user-module/follow-users/follow-users.component";
import {FollowersListComponent} from "../../components/user-module/followers-list/followers-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'unfollow',
    pathMatch: 'full'
  },
  {
    path: 'unfollow',
    component: UsersComponent
  },
  {
    path: 'follow',
    component: FollowUsersComponent
  },
  {
    path: 'followers-list',
    component: FollowersListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
