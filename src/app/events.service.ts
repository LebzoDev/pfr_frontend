import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private specialApiEvent = "http://127.0.0.1:8000/api/special";

  constructor(private http:HttpClient) { }

  getSpecialEvent(){
    return this.http.get<any>(this.specialApiEvent);
  }

}
