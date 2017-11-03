import 'rxjs/add/operator/finally';
import {Component, OnInit} from '@angular/core';

interface Friend {
  status: boolean;
  firstName: string;
  lastName: string;
}

interface Friends extends Array<Friend> {
}

interface Game {
  firstPlayer: string,
  firstPlayerTime: string,
  secondPlayer: string,
  secondPlayerTime: string
}

interface Games extends Array<Game> {
}

const friends: Friends = [
  {status: true, firstName: 'George', lastName: 'Hill'},
  {status: true, firstName: 'Deandre', lastName: 'Jordan'},
  {status: true, firstName: 'Blake', lastName: 'Griffin'},
  {status: true, firstName: 'Patrick', lastName: 'Beverly'},
  {status: true, firstName: 'Mill', lastName: 'Peter'},
  {status: true, firstName: 'Hayward', lastName: 'Gordon'},
  {status: true, firstName: 'Kyrie', lastName: 'Irving'},
  {status: false, firstName: 'George', lastName: 'Hill'},
  {status: false, firstName: 'Deandre', lastName: 'Jordan'},
  {status: false, firstName: 'Blake', lastName: 'Griffin'},
  {status: false, firstName: 'Patrick', lastName: 'Beverly'},
  {status: false, firstName: 'Mill', lastName: 'Peter'},
  {status: false, firstName: 'Hayward', lastName: 'Gordon'},
  {status: false, firstName: 'Kyrie', lastName: 'Irving'},
];

const games: Games = [
  {
    firstPlayer: "Jordan",
    firstPlayerTime: "3:00",
    secondPlayer: "Michael",
    secondPlayerTime: "2:55"
  },
  {
    firstPlayer: "Jack",
    firstPlayerTime: "4:00",
    secondPlayer: "Loef",
    secondPlayerTime: "4:55"
  },
  {
    firstPlayer: "Lires",
    firstPlayerTime: "3:20",
    secondPlayer: "Klof",
    secondPlayerTime: "5:55"
  },
  {
    firstPlayer: "Uler",
    firstPlayerTime: "5:00",
    secondPlayer: "Mische",
    secondPlayerTime: "4:55"
  },
  {
    firstPlayer: "xxtof",
    firstPlayerTime: "2:00",
    secondPlayer: "treof",
    secondPlayerTime: "2:55"
  },
  {
    firstPlayer: "lover",
    firstPlayerTime: "3:00",
    secondPlayer: "jjookkerr",
    secondPlayerTime: "2:55"
  },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myFriends: any;
  games: Games;

  constructor() {
  }

  onKey(event: any) {
    if (event.target.value.length > 0) {
      this.myFriends = friends.filter(
        (friend) =>
          (`${friend.firstName} ${friend.lastName}`).toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    } else {
      this.myFriends = friends;
    }
  }

  ngOnInit() {
    this.myFriends = friends;
    this.games = games;
  }

}
