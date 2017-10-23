import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Turn {
  x: number;
  y: number;
  player: boolean
}

@Injectable()
export class GoActionsService {
  /**
   * Submits our player turn to backend.
   * @param {Turn} turn - coordinates of player.
   * @return {Observable<Turn>} The placement of player figures.
   */
  submitTurn(turn: Turn): Observable<Turn> {
    return Observable.of(turn);
  }

  /**
   * Gets placement of opponent figure from backend
   * @param {any} board - coordinates of player.
   * @return {Observable<Turn>} The placement of player figures.
   */

  receiveTurn(board: any) : Observable<Turn> {
    const turn: Turn =  {
      x: 10,
      y: 10,
      player: false
    };

    while (1) {
      let x = Math.floor(Math.random() * board.size);
      let y = Math.floor(Math.random() * board.size);
      if (!board.obj_arr[x][y].length){
        turn.x = x;
        turn.y = y;
        break;
      }
    }

    return Observable.of(turn).delay(2000);
  }

  /**
   * Backend gives us response are we black or white
   * @return {Observable<boolean>} returns boolean are we playing as white or black
   */

  assignColor (): Observable<boolean> {
    return Observable.of(Math.random() > 0.5);
  };


}
