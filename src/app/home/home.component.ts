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

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit() {
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

    interface LooseObject {
      [key: string]: any
    }

    let tool: LooseObject = document.getElementById("tool");

    board.addEventListener("click", (x: number, y: number) => {

      if (tool.value == "black") {
        board.addObject({
          x: x,
          y: y,
          c: WGo.B
        });
      }
      else if (tool.value == "white") {
        board.addObject({
          x: x,
          y: y,
          c: WGo.W
        });
      }
      else if (tool.value == "remove") {
        board.removeObjectsAt(x, y);
      }
      else {
        board.addObject({
          x: x,
          y: y,
          type: tool.value
        });
      }
    });
  };

}
