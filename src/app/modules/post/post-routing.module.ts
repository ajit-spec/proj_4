import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from "../../components/post-module/posts/posts.component";
import {AddPostComponent} from "../../components/post-module/add-post/add-post.component";
import {CommentsComponent} from "../../components/post-module/comments/comments.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    component: PostsComponent
  },
  {
    path: 'add-post',
    component: AddPostComponent
  },
  {
    path: 'comments',
    component: CommentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
