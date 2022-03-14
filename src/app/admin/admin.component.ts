import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {Book} from '../models/book'
import { Zanr } from '../models/zanr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  opcije=[1,2,3,5,10];
  brojKnjiga:number;
  poStrani:number;
  s:number;
  users:User[]=[];
  users1:User[]=[];
  tip:number;
  naslov:string;
  autori:string;
  opis:string;
  dan:number;
  mesec:number;
  godina:number;
  zanr1:string;
  zanr2:string;
  zanr3:string;
  novzanr:string;
  zanr:Zanr[]=[];
  zanr4:string;
  knjige:Book[]=[];
  username:string;
  message2:string;
  message1:string;
  prikazano:User[];
  strana:number;
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    if(JSON.parse(localStorage.getItem('loggedInUser')).tip<1)
      this.pocetna();
    let pom:User[];
    this.strana=1;
    this.poStrani=2;
    this.users=[];
    this.http.get<{message:string,users:User[]}>('http://localhost:3000/users')
    .subscribe((bookData)=>{
      pom=bookData.users;
      pom.forEach(elem=>{
        if(elem.tip==-1)
        {
           this.users.push(elem);
        }
        if(elem.tip<2)
        {
          this.users1.push(elem);
        }
      });
      this.prikazano=[];
      this.brojKnjiga=this.users.length;
      for (let index = (this.strana-1)*this.poStrani; index < this.users.length; index++) {
        this.prikazano.push(this.users[index]);
        if(index-this.strana*this.poStrani==-1)
          break;
      }
      this.s=1;
    });
    this.http.get<{message:string,books:Book[]}>('http://localhost:3000/books')
    .subscribe((bookData)=>{
      this.knjige=bookData.books;
    });
    this.http.get<{message:string,zanrs:Zanr[]}>('http://localhost:3000/zanr')
    .subscribe((userData)=>{
      this.zanr=userData.zanrs;
    });
  }
  knjigaupdate(){
    if(this.naslov)
    {
      let reqbody={naslov:this.naslov, autori:this.autori,opis:this.opis,zanr1:this.zanr1,zanr2:this.zanr2,
      zanr3:this.zanr3,dan:this.dan,mesec:this.mesec,godina:this.godina}
      this.http.patch<{message:string}>("http://localhost:3000/books",reqbody).subscribe(res=>{

      })
    }
  }

  logout(){
    this.router.navigate(['login']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
  onChange(pageData:PageEvent){
    this.strana=pageData.pageIndex+1;
    this.poStrani=pageData.pageSize;
    this.prikazano=[];
    this.brojKnjiga=this.users.length;
      for (let index = (this.strana-1)*this.poStrani; index < this.users.length; index++) {
        this.prikazano.push(this.users[index]);
        if(index-this.strana*this.poStrani==-1)
          break;
      }
  }
  azuriraj(){
    let reqbody={username:this.username,tip:this.tip}
    this.http.patch('http://localhost:3000/users/approved',reqbody).subscribe(res=>{
      this.username=null;
      this.tip=null;
    })

  }
  odobri(username1:string){
    let reqbody={username:username1,tip:0}
    this.http.patch('http://localhost:3000/users/approved',reqbody).subscribe(res=>{
      window.location.reload();
    })
  }
  dodajzanr(){
    if(this.novzanr){
    let cnt=0;
    this.zanr.forEach(elem=>{
      if(elem.ime==this.novzanr)
      {
        cnt=1;
      }
    })
      if(cnt==0){
        let reqbody={ime:this.novzanr};
        this.http.post<{message:string}>("http://localhost:3000/zanr",reqbody).subscribe(res=>{
          this.novzanr=null;
          window.location.reload();
        })
      }
      else{
        this.novzanr==null;
        this.message2="Žanr ceć postoji!";
      }
    }
  }
  uklonizanr(){
    if(this.zanr4){
      let cnt=0;
      this.knjige.forEach(elem=>{
        if(this.zanr4==elem.zanr1 || this.zanr4==elem.zanr2 || this.zanr4==elem.zanr3)
          cnt++;
      })
      if(cnt==0)
      {
        this.http.delete<{message:string}>("http://localhost:3000/zanr/"+this.zanr4).subscribe(res=>{
          window.location.reload()
        })
      }
      else{
        this.message1="Postoji knjiga datog žanra!";
      }
    }
  }
  update(){
    this.knjige.forEach(elem=>{
      if(elem.naslov==this.naslov)
      {
        this.autori=elem.autori;
        this.opis=elem.opis;
        this.dan=elem.dan;
        this.mesec=elem.mesec;
        this.godina=elem.godina;
        this.zanr1=elem.zanr1;
        this.zanr2=elem.zanr2;
        this.zanr3=elem.zanr3;
      }
    })
  }
}
