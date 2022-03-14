import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import {Book} from '../models/book'
import {Zanr} from '../models/zanr'
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  constructor(private http:HttpClient, private router:Router) { }
  opcije=[1,2,3,5,10];
  brojKnjiga:number;
  poStrani:number;
  knjige:Book[]=[];
  prikazano:Book[];
  strana:number;
  naslov:string;
  autori:string;
  zanr1:string;
  zanr:Zanr[];
  queryParams:string;
  ngOnInit(): void {
    this.poStrani=2;
    this.brojKnjiga=0;
    this.strana=1;
    this.http.get<{message:string,zanrs:Zanr[]}>('http://localhost:3000/zanr')
    .subscribe((userData)=>{
      this.zanr=userData.zanrs;
    });
  }
  onChange(pageData:PageEvent){
    this.strana=pageData.pageIndex+1;
    this.poStrani=pageData.pageSize;
    this.prikazano=[];
    this.brojKnjiga=this.knjige.length;
      for (let index = (this.strana-1)*this.poStrani; index < this.knjige.length; index++) {
        this.prikazano.push(this.knjige[index]);
        if(index-this.strana*this.poStrani==-1)
          break;
      }
  }
  redirect(naslov:string,odobreno:number){
    if(odobreno!=0){
      localStorage.setItem('book',naslov);
      this.router.navigate(['guestBook']);
    }
  }
  trazi(){
    let pom:Book[];
    this.knjige=[];
    this.http.get<{message:string,books:Book[]}>('http://localhost:3000/books')
    .subscribe((bookData)=>{
      pom=bookData.books;
      pom.forEach(elem=>{
        if((elem.autori.includes(this.autori) || this.autori==null) && (elem.naslov.includes(this.naslov) ||this.naslov==null)
        && (elem.zanr1==this.zanr1 || elem.zanr2==this.zanr1 || elem.zanr3==this.zanr1 || this.zanr1==null))
        {
           this.knjige.push(elem);
        }
      });
      this.prikazano=[];
      this.brojKnjiga=this.knjige.length;
      for (let index = (this.strana-1)*this.poStrani; index < this.knjige.length; index++) {
        this.prikazano.push(this.knjige[index]);
        if(index-this.strana*this.poStrani==-1)
          break;
      }
    });
  }
}
