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

  private drawBoard = () => {
    let board = new WGo.Board(document.getElementById("board"), {
      width: 600
    });

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
