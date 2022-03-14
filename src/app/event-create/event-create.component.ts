import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Follow } from '../models/follow';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  naziv:string;
  tipovi:string[];
  tip:string;
  pocetak:Date;
  opis:string;
  kraj:Date;
  ucesnici:string;
  privatni:number=0;
  d1:number;
  message:string;
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    if(JSON.parse(localStorage.getItem('loggedInUser')).tip<1)
    {
      this.tipovi=["privatni"]
    }
    else this.tipovi=["privatni","javni"];
  }
  logout(){
    this.router.navigate(['login']);
  }
  update(){
    if(this.tip=="privatni")
      this.privatni=1;
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
  unesi(){
    if(this.d1==0)
      this.pocetak=new Date();
    if(this.naziv && this.tip && this.pocetak && this.opis){
    let reqbody={naziv:this.naziv,vlasnik:JSON.parse(localStorage.getItem('loggedInUser')).username,
                tip:this.tip,zavrseno:0,pocetak:this.pocetak,kraj:this.kraj,opis:this.opis}
    if(this.ucesnici && this.tip=="privatni"){
      this.http.get<{message:string,follows:Follow[]}>("http://localhost:3000/follows").subscribe(res=>{
        res.follows.forEach(elem=>{
          if(elem.username1==JSON.parse(localStorage.getItem('loggedInUser')).username)
          {
            let reqb={username:elem.username2,naziv:this.naziv,dozvoljen:1}
            this.http.post<{message:string}>("http://localhost:3000/eventusers",reqb).subscribe(res=>{

            })
          }
        })
      })
    }
    this.http.post<{message:string}>("http://localhost:3000/events",reqbody).subscribe(res=>{
      window.location.reload();
    })}
    else{
      this.message="Naziv, početak, tip i opis su obavezni!";
    }
  }
}
