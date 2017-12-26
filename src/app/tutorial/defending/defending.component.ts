import { Component, OnInit } from '@angular/core';


import * as WGo from 'wgo';
import {ActivatedRoute, Router} from '@angular/router';
import {LevelService} from '../level.service';
declare var $: any;

@Component({
  selector: 'app-defending',
  templateUrl: './defending.component.html',
  styleUrls: ['./defending.component.scss']
})
export class DefendingComponent implements OnInit {

  boardMain: WGo.Board;
  gameMain: WGo.Game;
  levels: any[];
  currentStep: number;
  text: String;
  title: String;
  description: String;
  color = true;
  initPosition: WGo.Position;
  nextLesson: any;
  nextStage: any;
  numOfSteps;


  constructor(private route: ActivatedRoute, private levelService: LevelService, private router: Router) {}

  ngOnInit() {
    this.levelService.initBoard(9, 300);
    this.route.params.subscribe(param => {
      this.update(this.route.snapshot.params['level']);
    });
  }

  update(stage: any) {
    this.boardMain = this.levelService.mainBoard;
    this.gameMain = this.levelService.mainGame;

    this.gameMain.firstPosition();
    this.boardMain.removeAllObjects();
    this.levels = this.levelService.jsonLevels[stage];
    this.text = this.levels['Text'];
    this.title = this.levels['Title'];
    this.currentStep = 0;
    this.color = true;
    this.nextLesson = this.levels['NextLesson'];
    this.nextStage = this.levels['NextStage'];
    this.numOfSteps = this.levels['NumberOfSteps'];
    this.initBoard();
    $('#mainWindow').animate({ scrollTop: 0 }, 500);
  }

  initBoard() {

    this.description = this.levels[this.currentStep][this.levels[this.currentStep].length - 1]['description'];
    const playFirst = this.levels[this.currentStep][this.levels[this.currentStep].length - 2]['playFirst'];
    if (playFirst === 1) {this.color = true; }
    if (playFirst === -1) {this.color = false; }

    if (this.currentStep === 0) {
      $('#backBtn').prop('disabled', true);

    }
    else {
      $('#backBtn').prop('disabled', false);
    }

    for (const level in this.levels[this.currentStep]) {
      const levelTmp = Number(level);
      if (levelTmp === this.levels[this.currentStep].length - 2) {
        break;
      }
      const stoneObject = this.levels[this.currentStep][levelTmp];
      this.boardMain.addObject(stoneObject);
      this.gameMain.play(stoneObject.x, stoneObject.y, stoneObject.c);
    }
    this.initPosition = this.gameMain.getPosition();

    const self = this;


    self.boardMain.addEventListener('click', function(x: any, y: any) {

      let deleted = null;
      if (self.color) {
        deleted = self.gameMain.play(x, y, 1);
      } else {
        deleted = self.gameMain.play(x, y, -1);
      }

      if (Number.isInteger(deleted)) {
        // console.log("Usao u ilegal move");
        // alert('Illegal move');
        return;
      }

      if (self.color) {
        self.boardMain.addObject({
          x: x,
          y: y,
          c: WGo.B
        });
        self.color = !self.color;
      } else {
        self.boardMain.addObject({
          x: x,
          y: y,
          c: WGo.W
        });
        self.color = !self.color;
      }

      for (const stone in deleted) {
        self.boardMain.removeObject(deleted[stone]);

      }

      const position = self.gameMain.getPosition();
      if (position === self.initPosition) {
        $('#undoBtn').prop('disabled', true);
      } else {
        $('#undoBtn').prop('disabled', false);
      }





    });

    $('#undoBtn').prop('disabled', true);
    if (this.currentStep === this.numOfSteps - 1) {
      $('#nextBtn').prop('disabled', true);
    } else {
      $('#nextBtn').prop('disabled', false);
    }

  }

  backToPastPosition() {

    // Undo from game
    this.gameMain.popPosition();
    let position = this.gameMain.getPosition();

    position = this.gameMain.getPosition();
    if (position === this.initPosition) {
      $('#undoBtn').prop('disabled', true);
    }


     // Undo from board
    this.boardMain.removeAllObjects();
    this.color = !this.color;
    let k = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (position['schema'][k] === 1) {
          this.boardMain.addObject({
            x: i,
            y: j,
            c: WGo.B
          });
        }
        if (position['schema'][k] === -1) {
          this.boardMain.addObject({
            x: i,
            y: j,
            c: WGo.W
          });
        }
        k++;

      }
    }
  }

  resetBoard() {
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();

    this.initBoard();
  }

  nextLevel() {
    this.currentStep++;
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();

    this.initBoard();
  }

  previousLevel() {
    this.currentStep--;
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();

    this.initBoard();
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextStage}]}}]);
  }
}
