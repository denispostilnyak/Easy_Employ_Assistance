import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private apiToken = '5903507739:AAGqi0sToQxMjg_FOD9TX2vfBkbNtXDuPqI';
  private chatId = '@easyemployassistance';
  private telegramApiUrl = `https://api.telegram.org/bot${this.apiToken}/sendMessage?chat_id=${this.chatId}`;
  constructor(private http: HttpClient) { }

  public sendMessage(body: string): Observable<void> {
    return this.http.get<void>(`${this.telegramApiUrl}&text=${encodeURIComponent(body)}`);
  }
}
