import { Component, OnInit } from '@angular/core';
import {Service4Service} from "../../../services/service4.service";
import {Service1Service} from "../../../services/service1.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public service4: Service4Service,
    public service1: Service1Service
  ) { }

  ngOnInit(): void {
  }

}
