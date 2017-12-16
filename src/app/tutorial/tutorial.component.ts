import { Component, OnInit } from '@angular/core';
import {LoaderService} from './loader.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.getPageContent();
  }

}
