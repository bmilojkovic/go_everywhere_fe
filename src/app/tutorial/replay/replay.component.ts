import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../loader.service';

@Component({
  selector: 'app-replay',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.scss']
})
export class ReplayComponent implements OnInit {

  gameDataURL: String;

  constructor(private route: ActivatedRoute, private loaderService: LoaderService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.update('assets/tutorial-games/game.sgf');
    });
    this.update('assets/tutorial-games/game.sgf');

  }

  update(level: String) {
    this.gameDataURL = level;
  }

}
