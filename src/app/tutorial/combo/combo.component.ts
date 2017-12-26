import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderService} from '../loader.service';
import * as WGo from 'wgo';
import {LevelService} from '../level.service';
declare var $: any;

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.scss']
})
export class ComboComponent implements OnInit {

  content: any[];
  title;
  text;
  postText;
  postTextTitle;
  subtitle;
  nextLesson;
  nextStage;
  nextLevel;
  imageObjects: any[];

  boardMain: WGo.Board;
  gameMain: WGo.Game;
  levels: any[];
  currentStep: number;
  description: String;
  stage;

  isSuccessVisible = false;
  visible = false;
  message: String = '';

  check = false;

  constructor(private route: ActivatedRoute, private loaderService: LoaderService, private router: Router,
              private levelService: LevelService) { }

  ngOnInit() {
    this.levelService.initBoard(9, 300 );
    this.route.params.subscribe(param => {
      this.update(this.route.snapshot.params['level'], this.route.snapshot.params['capture']);
    });
  }

  update(level: any, capture: any) {
    this.content = this.loaderService.pageContent[level];
    this.title = this.content['Title'];
    this.text = this.content['Text'];
    this.subtitle = this.content['Subtitle'];
    this.postText = this.content['PostText'];
    this.postTextTitle = this.content['PostTextTitle'];
    this.nextLesson = this.content['NextLesson'];
    this.nextLevel = this.content['NextLevel'];
    this.nextStage = this.content['NextStage'];
    this.imageObjects = [];
    for (const x in this.content) {
      if (Number.isInteger(Number(x))) {
        this.imageObjects.push({'url': this.content[x]['ImageUrl'],
          'description': this.content[x]['ImageDescription'] });
      }
    }

    this.boardMain = this.levelService.mainBoard;
    this.gameMain = this.levelService.mainGame;

    this.isSuccessVisible = false;
    this.visible = false;
    this.check = false;
    this.gameMain.firstPosition();
    this.boardMain.removeAllObjects();
    this.levels = this.levelService.jsonLevels[capture];
    this.currentStep = 0;
    this.initBoard();
  }

  initBoard() {
    this.description = this.levels[this.currentStep][this.levels[this.currentStep].length - 1]['description'];
    this.stage = this.levels[this.currentStep][this.levels[this.currentStep].length - 2]['service'];

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

            if ( self.stage[scen].c === 1 && self.gameMain.getStone(stoneObject.x, stoneObject.y) === WGo.B && self.check === false) {
              if (self.stage[scen].f === 1) {
                self.visible = true;
                self.isSuccessVisible = true;
                $('#nextBtn').prop('disabled', false);
                self.message = 'Success! You are ready for NEXT LESSON.';
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

              if(self.stage[scen].f === 1) {
                self.visible = true;
                self.isSuccessVisible = false;
                self.message = 'Fail! RESET BOARD and try again';
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
            $('#nextBtn').prop('disabled', false);
            self.isSuccessVisible = true;
            self.visible = true;
            self.message = 'Success! You are ready for NEXT LESSON.';
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
    this.initBoard();
  }

  next() {
    this.router.navigate(['/tutorial', {
      outlets: {'tutorialOutlet': [this.nextLesson, {level: this.nextLevel, capture: this.nextStage}]}}]);
  }

}
