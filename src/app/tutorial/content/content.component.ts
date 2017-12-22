import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  change(path: any, stage: any) {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [path,  {level: stage}]}}] );
  }

  comboChange(path: any, example: any, capture: any) {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [path, {level: example, capture: capture}]}}]);
  }

  toggle(event: any) {
    $('#' + event.target.id + 'List').slideToggle();
  }

}
