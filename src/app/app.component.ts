import {Component} from '@angular/core';
import {Service4Service} from "./services/service4.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(
    public service4: Service4Service
  ) {
  }



}

