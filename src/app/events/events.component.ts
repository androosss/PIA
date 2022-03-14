import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:Event[]=[];
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.http.get<{message:string,events:Event[]}>("http://localhost:3000/events").subscribe(result=>{
      this.events=result.events;
    })
  }
  logout(){
    this.router.navigate(['login']);
  }
  redirect(naziv:string){
    localStorage.setItem('event',naziv);
    this.router.navigate(['event']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
}
