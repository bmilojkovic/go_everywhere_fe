import 'rxjs/add/operator/finally';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

export interface Game {
    name: string;
    player: string;
    acceptable: boolean;
    time: string;
    size: string;
    ranked: boolean;
    handicap: boolean;
    rules: string;
}

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})



export class LobbyComponent implements OnInit {
    isLoading: boolean;
    games: Array<Game>;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {

        this.games = [
            {
                name: 'Game1',
                player: 'ojsa',
                acceptable: true,
                time: '2d/move',
                size: '19x19',
                ranked: false,
                handicap: false,
                rules: 'Japanese'
            },
            {
                name: 'Game2',
                player: 'ojsa2',
                acceptable: false,
                time: '2d/move',
                size: '9x9',
                ranked: true,
                handicap: true,
                rules: 'Japanese'
            }
        ];
     }
}
