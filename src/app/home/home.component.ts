import 'rxjs/add/operator/finally';

import {Component, OnInit} from '@angular/core';
import {GoActionsService, Turn} from '../core/go_actions/go_actions.service';

const WGo = require('wgo');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GoActionsService]
})

export class HomeComponent implements OnInit {

  isLoading: boolean;
  turn: string;
  player: boolean;
  board: any;

  getTurn = () => {
    return this.player
      ?
      "Your Turn"
      :
      "Opponents Turn"
  };

  constructor(private goActionsService: GoActionsService) {
  }

  ngOnInit() {
    this.turn = "W";
    this.drawBoard();
    this.decideMyColor();
  }

  private swapPlayers = () => {
    this.player = !this.player;
    this.turn = this.turn === "W" ? "B" : "W";
  };

  decideMyColor = () => {
    this.goActionsService.assignColor()
      .subscribe((turn: boolean) => this.player = turn);
    if (!this.player) {
      this.receiveTurn();
    }
  };

  submitTurn = (turn: Turn) => {
    this.isLoading = true;
    this.goActionsService.submitTurn(turn)
      .finally(() => {
        this.isLoading = false
      })
      .subscribe((myTurn: Turn) => {
        console.log(myTurn);
      });
  };

  receiveTurn = () => {
    this.isLoading = true;
    this.goActionsService.receiveTurn(this.board)
      .finally(() => {
        this.isLoading = false;
        this.swapPlayers();
      })
      .subscribe((turn: Turn) => {
        this.board.addObject(this.getCurrentFigure(turn.x, turn.y));
      });
  };

  /**
   * Method for rendering helper coordinates (1-19, A-T)
   * @returns {{grid: {draw: ((args: any, board: any) => any)}}}
   */
  private drawCoordinates = () => {
    return {
      grid: {
        draw: function (args: any, board: any) {
          let ch, t, xright, xleft, ytop, ybottom;

          this.fillStyle = "rgba(0,0,0,0.7)";
          this.textBaseline = "middle";
          this.textAlign = "center";
          this.font = board.stoneRadius + "px " + (board.font || "");

          xright = board.getX(-0.75);
          xleft = board.getX(board.size - 0.25);
          ytop = board.getY(-0.75);
          ybottom = board.getY(board.size - 0.25);

          for (let i = 0; i < board.size; i++) {
            ch = i + "A".charCodeAt(0);
            if (ch >= "I".charCodeAt(0)) ch++;

            t = board.getY(i);
            this.fillText(board.size - i, xright, t);
            this.fillText(board.size - i, xleft, t);

            t = board.getX(i);
            this.fillText(String.fromCharCode(ch), t, ytop);
            this.fillText(String.fromCharCode(ch), t, ybottom);
          }

          this.fillStyle = "black";
        }
      }
    }
  };


  /**
   * This method depending on whose turn it is returns black or white figure
   * @param {number} x
   * @param {number} y
   * @returns {{x: number; y: number; c: any}}
   */

  private getCurrentFigure = (x: number, y: number) => {
    return {
      x: x,
      y: y,
      c: WGo[this.turn]
    }
  };

  /**
   * Draws board at beginning of application
   */
  private drawBoard = () => {
    const offset = -0.5;
    const width = 600;

    this.board = new WGo.Board(document.getElementById("board"), {
      width: width,
      section: {
        top: offset,
        left: offset,
        right: offset,
        bottom: offset
      }
    });

    this.board.addCustomObject(this.drawCoordinates());
    this.board.addEventListener("click", (x: number, y: number) => {
      if (!this.board.obj_arr[x][y].length && this.player) {
        this.board.addObject(this.getCurrentFigure(x, y));
        const turn: Turn = {
          x: x,
          y: y,
          player: this.player
        };
        if (this.player) {
          this.submitTurn(turn);
        }
        this.swapPlayers();
        this.receiveTurn();
      }
    });
  };

}
