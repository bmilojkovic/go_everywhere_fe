import 'rxjs/add/operator/finally';

import {Component, OnInit} from '@angular/core';

import {QuoteService} from './quote.service';

const WGo = require('wgo');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;
  turn: string;
  getTurn = () => {
    return this.turn === "W"
      ?
      "WHITE's Turn"
      :
      "BLACK's Turn"
  };

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit() {
    this.turn = "W";
    this.isLoading = true;
    this.quoteService.getRandomQuote({category: 'dev'})
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe((quote: string) => {
        this.quote = quote;
      });
    this.drawBoard();
  }

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

  private drawBoard = () => {
    const offset = -0.5;
    const width = 600;

    let board = new WGo.Board(document.getElementById("board"), {
      width: width,
      section: {
        top: offset,
        left: offset,
        right: offset,
        bottom: offset
      }
    });

    board.addCustomObject(this.drawCoordinates());

    board.addEventListener("click", (x: number, y: number) => {
      if (!board.obj_arr[x][y].length) {
        board.addObject({
          x: x,
          y: y,
          c: WGo[this.turn]
        });
        this.turn = this.turn === "W" ? "B" : "W";
      }
    });
  };

}
