import { Component, OnInit} from '@angular/core';

import * as WGo from 'wgo';
import {ActivatedRoute, Router} from '@angular/router';
import {LevelService} from '../level.service';
declare var $: any;

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit {

  boardMain: WGo.Board;
  gameMain: WGo.Game;
  levels: any[];
  currentStep: number;
  text: String;
  title: String;
  numOfSteps;
  description: String;
  stage;

  isSuccessVisible = false;
  visible = false;
  message: String = '';
  success: String;
  fail: String;

  check = false;

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
    this.check = false;


    this.gameMain.firstPosition();
    this.boardMain.removeAllObjects();
    this.levels = this.levelService.jsonLevels[stage];
    console.log(this.levels);
    this.text = this.levels['Text'];
    this.title = this.levels['Title'];
    this.nextLesson = this.levels['NextLesson'];
    this.nextStage = this.levels['NextStage'];
    this.numOfSteps = this.levels['NumberOfSteps'];
    this.currentStep = 0;
    this.initBoard();
  }

  initBoard() {

    this.description = this.levels[this.currentStep][this.levels[this.currentStep].length - 1]['description'];
    this.stage = this.levels[this.currentStep][this.levels[this.currentStep].length - 2]['service'];
    this.success = this.levels[this.currentStep][this.levels[this.currentStep].length - 3]['success'];
    this.fail = this.levels[this.currentStep][this.levels[this.currentStep].length - 3]['fail'];

    if (this.currentStep === 0) {
      $('#backBtn').prop('disabled', true);

    }
    else {
      $('#backBtn').prop('disabled', false);
    }


    //if (this.success === '') {this.success = 'Success! You are ready for NEXT step.'; }
    //if (this.fail === '') {this.fail = 'Fail! RESET BOARD and try again.'; }

    for (const level in this.levels[this.currentStep]) {
      const levelTmp = Number(level);
      if (levelTmp === this.levels[this.currentStep].length - 3) {
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

      let handicap = true;

      setTimeout(function() {
        console.log(deleted);
        if (deleted.length <= 0) {

          for (const scen in self.stage) {


            const stoneObject = {
              x: self.stage[scen].x,
              y: self.stage[scen].y,
              c: self.stage[scen].c,

            };

            if ( self.stage[scen].c === 1 && self.gameMain.getStone(stoneObject.x, stoneObject.y) === WGo.B && self.check === false){
              if (self.stage[scen].f === 1){
                self.visible = true;
                self.isSuccessVisible = true;
                if (self.currentStep === self.numOfSteps - 1) {
                  $('#nextBtn').prop('disabled', true);
                  self.message = 'Success! ' + self.success + ' You are ready for NEXT LESSON.';

                }
                else {
                  $('#nextBtn').prop('disabled', false);
                  self.message = 'Success! ' + self.success + ' You are ready for NEXT step.';
                }

                return;
              }
            }


            if (self.gameMain.getStone(stoneObject.x, stoneObject.y) === 0 && self.stage[scen].c !== 1) {

              if (Number(scen) !== 0 && self.stage[Number(scen) - 1].c === 1) {
                self.check = true;
              }
              if (self.stage[Number(0)].c === 1) {
                self.check = true;
              }

              handicap = false;
              self.boardMain.addObject(stoneObject);
              const deleted1 = self.gameMain.play(stoneObject.x, stoneObject.y, -1);
              for (const stone in deleted1) {
                self.boardMain.removeObject(deleted1[stone]);
              }
              console.log(deleted1);

              if (self.stage[scen].f === 1) {
                self.visible = true;
                self.isSuccessVisible = false;
                self.message = null;
                self.message = 'Fail! ' + self.fail + ' RESET BOARD and try again.';
                return;
              }
              break;
            } else {handicap = true; }

          }
        }

        for (const stone in deleted) {
          self.boardMain.removeObject(deleted[stone]);

        }

        if (deleted.length > 0 || (handicap && deleted.length <= 0)) {

          if( (handicap && deleted.length <= 0) || ((self.gameMain.getStone(deleted[0].x, deleted[0].y)) === 0)) {
            if(self.currentStep === self.numOfSteps - 1) {

              $('#nextBtn').prop('disabled', true);
              self.message = 'Success! ' + self.success + ' You are ready for NEXT LESSON.';

            }
            else {
              $('#nextBtn').prop('disabled', false);
              self.message = 'Success! ' + self.success + ' You are ready for NEXT step.';
            }
            self.isSuccessVisible = true;
            self.visible = true;
            return;
          }
        }

      }, 300);
    });



    $('#nextBtn').prop('disabled', true);
  }

  resetBoard() {
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();
    this.visible = false;
    this.check = false;
    this.fail = '';
    this.success = '';
    this.initBoard();
  }

  nextLevel() {
    this.currentStep++;
    this.boardMain.removeAllObjects();
    this.gameMain.firstPosition();
    this.visible = false;
    this.check = false;
    this.success = '';
    this.fail = '';
    this.initBoard();
  }

  previousLevel() {

      this.currentStep--;
      this.boardMain.removeAllObjects();
      this.gameMain.firstPosition();
      this.visible = false;
      this.check = false;
      this.fail = '';
      this.success = '';
      this.initBoard();
  }

  next() {
    this.router.navigate(['/tutorial', {outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextStage}]}}]);
  }

}
