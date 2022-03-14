import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { Zanr } from '../models/zanr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  constructor(private http:HttpClient, private router:Router) { }
  opcije=[1,2,3,5,10];
  brojKnjiga:number;
  poStrani:number;
  s:number;
  knjige:Book[]=[];
  prikazano:Book[];
  strana:number;
  naslov:string;
  autori:string;
  zanr1:string;
  zanr:Zanr[];
  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.poStrani=2;
    this.s=0;
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
  trazi(){
    let pom:Book[];
    this.strana=1;
    this.poStrani=2;
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
      this.s=1;
    });
  }
  redirect(naslov:string,odobreno:number){
    if(odobreno){
      localStorage.setItem('book',naslov);
      this.router.navigate(['book']);
    }
  }
  logout(){
    this.router.navigate(['login']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
}
