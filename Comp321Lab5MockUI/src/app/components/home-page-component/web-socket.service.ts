import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<any> = webSocket('ws://localhost:8084/order-received');

  /**
   * Sends a message to the WebSocket server.
   * @param message The message to send.
   */
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  /**
   * Returns an Observable that emits messages from the WebSocket server.
   */
  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  /**
   * Closes the WebSocket connection.
   */
  close(): void {
    this.socket$.complete();
  }
}
