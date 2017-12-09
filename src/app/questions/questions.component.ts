import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  socket = io.connect('http://localhost:3000/');

  noPlayersRequired = 2;
  noPlayers = 0;
  question = {
      'question_content': 'The mausoleum is ................. by Thien Thu mountain, two towering columns and a vast expanse of water.',
      'option1': 'feed',
      'option2': 'feeding',
      'option3': 'fed',
      'option4': 'feeds',
    };

  constructor() {
    this.socket.on('userConnect', (number_user_connected) => {
      this.noPlayers = number_user_connected;
      console.log('User connected', this.noPlayers);
    });
  }

  ngOnInit() {
  }



}
