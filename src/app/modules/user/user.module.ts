import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from '../../components/user-module/users/users.component';
import { UserCardComponent } from '../../components/user-module/user-card/user-card.component';
import {SharedModule} from "../shared/shared.module";
import { FollowUsersComponent } from '../../components/user-module/follow-users/follow-users.component';
import { FollowersListComponent } from '../../components/user-module/followers-list/followers-list.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    FollowUsersComponent,
    FollowersListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
