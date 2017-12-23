import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class BasicComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': ['example', {level: 'capture-stones'}]}}]);
  }

}
