import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event';
import {EventUser} from '../models/eventuser'
import {EventCom} from '../models/eventcom'
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  event:Event;
  j:number;
  pz:number;
  kom:string;
  po:number;
  mz:number;
  mo:number;
  zahtev:number;
  zahtevi:EventUser[]=[];
  vlasnik:number=0;
  danas:Date;
  coms:EventCom[]=[];
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.danas=new Date();
    this.http.get<{message:string,events:Event[]}>("http://localhost:3000/events").subscribe(res=>{
      res.events.forEach(elem=>{
        if(elem.naziv==localStorage.getItem('event'))
          this.event=elem;
      })
      this.event.pocetak=new Date(this.event.pocetak);
      this.event.kraj=new Date(this.event.kraj);
    if(JSON.parse(localStorage.getItem('loggedInUser')).username==this.event.vlasnik)
    {
      this.vlasnik=1;
      if(this.event.zavrseno==1)
      {
        this.mo=1;
        this.j=1;
      }
      if(this.event.zavrseno==0 && this.danas<=(new Date(this.event.kraj)))
      {
        this.mz=1;
        this.j=1;
      }
    }
    else{
      if(this.event.tip=="javni")
      {
        this.j=1;
      }
      else {
        this.zahtev=0;
        this.http.get<{message:string,eventusers:EventUser[]}>("http://localhost:3000/eventusers").subscribe(res=>{
          res.eventusers.forEach(elem=>{
            if(elem.event==this.event.naziv && elem.username==JSON.parse(localStorage.getItem('loggedInUser')).username)
            {
              if(elem.dozvoljen==1)
                this.j=1;
              else this.zahtev=1;
            }
          })
          if(!this.j)
          {

            if(this.event.zavrseno==1 || (new Date(this.event.kraj))<=this.danas)
            {
              this.pz=1;
            }
            else this.po=1;
          }
        })
      }
    }
  })
  this.http.get<{message:string,eventusers:EventUser[]}>("http://localhost:3000/eventusers").subscribe(result=>{
    result.eventusers.forEach(elem=>{
      if(elem.dozvoljen==0)
        this.zahtevi.push(elem);
    })
  })
  this.http.get<{message:string,eventcoms:EventCom[]}>("http://localhost:3000/eventcoms").subscribe(result=>{
    result.eventcoms.forEach(elem=>{
      if(elem.event==this.event.naziv)
        this.coms.push(elem);
    })
  })
  }
  zatvori(){
    let reqbody={naziv:this.event.naziv,zavrseno:1}
    this.http.patch<{message:string}>("http://localhost:3000/events",reqbody).subscribe(res=>{
      window.location.reload();
    })
  }
  otvori(){
    let reqbody={naziv:this.event.naziv,zavrseno:0}
    this.http.patch<{message:string}>("http://localhost:3000/events",reqbody).subscribe(res=>{
      window.location.reload();
    })
  }
  zahtevaj(){
    if(!this.zahtev){
    let reqbody={naziv:this.event.naziv,username:JSON.parse(localStorage.getItem('loggedInUser')).username,dozvoljen:0};
    this.http.post<{message:string}>("http://localhost:3000/eventusers",reqbody).subscribe(res=>{
    })}
  }
  odobri(user:string){
    let reqbody={event:this.event.naziv,username:user,dozvoljen:1}
    this.http.patch<{message:string}>("http://localhost:3000/eventusers",reqbody).subscribe(res=>{
      window.location.reload()
    })
  }
  logout(){
    this.router.navigate(['login']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
  koment(){
    let reqbody={tekst:this.kom,event:this.event.naziv,username:JSON.parse(localStorage.getItem('loggedInUser')).username}
    this.http.post<{message:string}>("http://localhost:3000/eventcoms",reqbody).subscribe(result=>{
      window.location.reload();
    })
  }
}
