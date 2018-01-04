import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  socket = null;
  username = null;
  selectedAns = null;
  showQuestion = false;
  cannotPlay = false;
  waitingForOthers = false;
  showResult = false;
  resultList = [];
  winnerList = [];
  question = {
    question_content: null,
    option1: null,
    option2: null,
    option3: null,
    option1_content: null,
    option2_content: null,
    option3_content: null,
  };

  constructor() {
    console.log ('showQuestion in constructor: ',this.showQuestion);
  };

  ngOnInit() {
    this.socket = io.connect('http://localhost:3000/');

    this.socket.on('username',(username)=>{
      console.log ('Current username: ',username);
      this.username = username;
    });

    this.socket.on('showQuestion', (showQuestion)=>{
      console.log ('evoked showQuestion event');
      this.showQuestion = showQuestion;
    });

    this.socket.on ('cannotPlay',(message)=>{
      alert(message);
      this.cannotPlay = true;
    });

    this.socket.on('waitingForOther',(message)=>{
      this.waitingForOthers = true;
    });

    this.socket.on('publishResult',(result)=>{
      console.log ('Received result: ',result);
      result.userList.forEach((username,idx)=>{
        var resultInstance = {username: username, point: result.pointList[idx]};
        this.resultList.push(resultInstance);
      }); 
      this.winnerList = result.winnerList;
      this.showResult = true;
      console.log ('ResultList ',this.resultList);
    });    

    this.socket.on('establishQuestion', (question) => { 
      console.log ('evoked establishQuestion event');
      this.question.question_content = question.content;
      this.question.option1 = question.answers[0];
      this.question.option2 = question.answers[1];
      this.question.option3 = question.answers[2];
      this.question.option1_content = question.answers[0].content;
      this.question.option2_content = question.answers[1].content;
      this.question.option3_content = question.answers[2].content;

      $(document).ready(()=>{
        $('input:checkbox').change(function (){
          console.log ('Change answer',this)
          $('input:checkbox').not(this).prop('checked', false);
        });
      });

    });
    
    this.socket.on('establishResult',function(result){
      console.log ('Inside establishResult event!',result);
      if (result === true){
        alert('Correct!');
      }
      else {
        alert('Wrong Answer!');
      }
    });
  };
  
  establishAns(){
    var answerInfo = {
      answer : null,
      username: this.username,
    }
    console.log ('username to be sent to server: ',this.username);
    this.selectedAns = $('input:checked').attr('id');
    if (typeof this.selectedAns === 'undefined'){
      console.log ('Undefined answer');
      alert('Please select one answer!');
    }
    else {
      if (this.selectedAns === 'ans1') {
        answerInfo.answer = this.question.option1;
        this.socket.emit('establishAns', answerInfo);
      }
      else if (this.selectedAns === 'ans2') {
        answerInfo.answer = this.question.option2;
        this.socket.emit('establishAns', answerInfo);
      }
      else if (this.selectedAns === 'ans3') {
        answerInfo.answer = this.question.option3;
        this.socket.emit('establishAns', answerInfo);
      }
    }
    
  }
}
