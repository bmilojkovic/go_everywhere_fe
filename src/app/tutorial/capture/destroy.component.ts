import { Component, OnInit} from '@angular/core';

import * as WGo from 'wgo';
import {ActivatedRoute, Router} from '@angular/router';
import {LevelService} from '../level.service';
declare var $: any;

@Component({
  selector: 'app-dist-all-whites',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})

export class DestroyComponent implements OnInit {

  boardMain: WGo.Board;
  gameMain: WGo.Game;
  levels: any[];
  currentStep: number;
  text: String;
  title: String;
  description: String;

  isSuccessVisible = false;
  visible = false;
  message: String = '';

  nextLesson;
  nextStage;

  constructor(private route: ActivatedRoute, private levelService: LevelService, private router: Router) {}

  ngOnInit() {
    this.levelService.initBoard();
    this.route.params.subscribe(param => {
      this.update(this.route.snapshot.params['level']);
    });
    this.update(this.route.snapshot.params['level']);
  }

  update(stage: any) {
    this.boardMain = this.levelService.mainBoard;
    this.gameMain = this.levelService.mainGame;

    this.isSuccessVisible = false;
    this.visible = false;
    this.gameMain.firstPosition();
    this.boardMain.removeAllObjects();
    this.levels = this.levelService.jsonLevels[stage];
    this.text = this.levels['Text'];
    this.title = this.levels['Title'];
    this.nextLesson = this.levels['NextLesson'];
    this.nextStage = this.levels['NextStage'];
    this.currentStep = 0;
    this.initBoard();
  }

  initBoard() {
    this.description = this.levels[this.currentStep][this.levels[this.currentStep].length - 1]['description'];

    for (const level in this.levels[this.currentStep]) {
      const levelTmp = Number(level);
      if (levelTmp === this.levels[this.currentStep].length - 2) {
        break;
      }
      const stoneObject = this.levels[this.currentStep][levelTmp];
      this.boardMain.addObject(stoneObject);
      this.gameMain.play(stoneObject.x, stoneObject.y, stoneObject.c);

    }
    const self = this;

    self.boardMain.addEventListener('click', function(x: any, y: any) {
      const deleted = self.gameMain.play(x, y, 1);
      if (Number.isInteger(deleted)) {
        //console.log("Usao u ilegal move");
        // alert('Illegal move');
        return;
      }

      self.boardMain.addObject({
        x: x,
        y: y,
        c: WGo.B
      });

      setTimeout(function(){
        console.log(deleted);


        for (const stone in deleted) {
          self.boardMain.removeObject(deleted[stone]);

        }
        const board = self.boardMain.getState().objects;
        for (const i in board)  {
          for (const j in board[i]) {
            if (board[i][j].length !== 0) {
              if (board[i][j][0].c === -1) {
                return;
              }
            }
          }
        }

        if (self.currentStep === 0) {
          $('#nextBtn').prop('disabled', true);
          self.message = 'Success! You are ready for NEXT LESSON.';

        }
        self.isSuccessVisible = true;
        self.visible = true;
        return;

      }, 300);
    });



    $('#nextBtn').prop('disabled', true);
  }

  resetBoard() {
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();
    this.visible = false;
    this.initBoard();
  }

  nextLevel() {
    this.currentStep++;
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();
    this.visible = false;
    this.initBoard();
  }

  previousLevel() {
    this.currentStep--;
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();
    this.visible = false;
    this.initBoard();
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextStage}]}}]);
  }

}
