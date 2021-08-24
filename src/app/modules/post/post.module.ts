import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostRoutingModule} from './post-routing.module';
import {PostsComponent} from "../../components/post-module/posts/posts.component";
import {PostCardComponent} from "../../components/post-module/post-card/post-card.component";
import {SharedModule} from "../shared/shared.module";
import { AddPostComponent } from '../../components/post-module/add-post/add-post.component';
import { CommentsComponent } from '../../components/post-module/comments/comments.component';
import { CommentCardComponent } from '../../components/post-module/comment-card/comment-card.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    AddPostComponent,
    CommentsComponent,
    CommentCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostRoutingModule
  ]
})
export class PostModule {
}
