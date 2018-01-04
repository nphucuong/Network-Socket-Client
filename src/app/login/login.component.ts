import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socket = io.connect('http://localhost:3000/');
  username = '';

  constructor(private router: Router) {

  }
  receiveUserConnected(){
    this.socket.on('userConnect',(result)=> {
      console.log ('User connected loginComponent: ',result);
    });
  }
  ngOnInit() {
  }

  checkName() {
    this.socket.emit('checkName', this.username);
    this.receiveUserConnected();
    this.socket.on('canLogin', (result) => {
      if (result == 1) {
        this.router.navigateByUrl('/questions');
      } else {
        alert('Tên này đã có người sử dụng. Vui lòng chọn tên khác!');
      }
    });
  }
}
