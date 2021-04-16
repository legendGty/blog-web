import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3000';
  private socket = io(this.url);

  sendMessage(message) {
   this.socket.emit('add-message', message);
  }

  getMessages() {
   const observable = new Observable(observer => {
    this.socket.on('message', (data) => {
     observer.next(data);
     observer.complete();
    });
    return () => {
     this.socket.disconnect();
    };
   });
   return observable;
  }
}
