import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { Pipe1Pipe } from '../../pipes/pipe1.pipe';


@NgModule({
  declarations: [
    Pipe1Pipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Pipe1Pipe
  ]
})
export class SharedModule {
}
