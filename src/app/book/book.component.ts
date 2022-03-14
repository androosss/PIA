import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookUser } from '../models/bookuser';
import {Comment} from '../models/comment'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  vrednostocene:number;
  brojocena:number;
  max=10;
  ocena:number=0;
  stigo:number;
  strana:number;
  progr:number;
  bu:BookUser=null;
  rand="rand"
  read=true;
  tekst:string="";
  book:Book;
  datum:string;
  coms:Comment[]=[];
  myCom:Comment;
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.http.get<{message:string,bookusers:BookUser[]}>('http://localhost:3000/bookusers')
    .subscribe((bookuserData)=>{
      bookuserData.bookusers.forEach(elem => {
        if(JSON.parse(localStorage.getItem('loggedInUser')).username==elem.username &&
          localStorage.getItem('book')==elem.naslov)
          {
            this.bu=elem;
            if(elem.tip==1)
            {this.stigo=elem.stigo;
            this.strana=elem.strana;}
          }
      });
      if(this.bu)
      {
      this.stigo=this.bu.stigo;
      this.strana=this.bu.strana;
      this.progr=100*this.stigo/this.strana;
      }
    })
    this.brojocena=0;
    this.vrednostocene=0;
    this.http.get<{message:string,coms:Comment[]}>('http://localhost:3000/coms')
    .subscribe((comsData)=>{
      comsData.coms.forEach(elem=>{
        if(elem.naslov==localStorage.getItem('book'))
        {
          if(JSON.parse(localStorage.getItem('loggedInUser')).username==elem.username){
            this.brojocena++;
            this.vrednostocene+=elem.ocena;
            this.myCom=elem;
          }else{
          this.brojocena++;
          this.vrednostocene+=elem.ocena;
          this.coms.push(elem);}
        }
      });
      if(this.brojocena>0) this.vrednostocene=this.vrednostocene/this.brojocena;
    });
    this.http.get<{message:string,books:Book[]}>('http://localhost:3000/books')
    .subscribe((bookData)=>{
      let pom=bookData.books;
      pom.forEach(elem=>{
        if(elem.naslov==localStorage.getItem('book'))
        {
          this.book=elem;
          if(this.book.zanr1=='undefined')
            this.book.zanr1='';
          if(this.book.zanr2=='undefined')
            this.book.zanr2='';
          if(this.book.zanr3=='undefined')
            this.book.zanr3='';
        }
      });
      this.datum=`${this.book.dan}/${this.book.mesec}/${this.book.godina}`;
    });
  }
  citaj(){
    if(!this.bu){
    this.bu={username:JSON.parse(localStorage.getItem('loggedInUser')).username,naslov:localStorage.getItem('book'),
      tip:1, stigo:0, strana:100};
    this.strana=0;
    this.stigo=100;
    this.http.post<{message:string}>('http://localhost:3000/bookusers',this.bu).subscribe((responseData)=>{
      console.log(responseData.message);
    })}
    else{
      this.bu.tip=1;
      this.stigo=this.bu.stigo;
      this.strana=this.bu.strana;
      this.http.patch("http://localhost:3000/bookuser",this.bu).subscribe(respones=>{

      })
    }
  }
  lista(){
    if(!this.bu){
    const bookuser:BookUser={username:JSON.parse(localStorage.getItem('loggedInUser')).username,naslov:localStorage.getItem('book'),
      tip:2, stigo:0, strana:100};
    this.http.post<{message:string}>('http://localhost:3000/bookusers',bookuser).subscribe((responseData)=>{
      alert(responseData.message);
      console.log(responseData.message);
    })}
    else{
      this.bu.tip=2;
      this.http.patch("http://localhost:3000/bookuser",this.bu).subscribe(respones=>{

      })
    }
  }
  zavrsi(){
    if(!this.bu){
    const bookuser:BookUser={username:JSON.parse(localStorage.getItem('loggedInUser')).username,naslov:localStorage.getItem('book'),
      tip:0, stigo:0, strana:100};
    this.http.post<{message:string}>('http://localhost:3000/bookusers',bookuser).subscribe((responseData)=>{
      console.log(responseData.message);
    })}
    else{
      this.bu.tip=0;
      this.http.patch("http://localhost:3000/bookuser",this.bu).subscribe(respones=>{

      })
    }
  }
  komentarisi(){
    this.myCom={username:JSON.parse(localStorage.getItem('loggedInUser')).username,naslov:localStorage.getItem('book'),
    ocena:this.ocena, tekst:this.tekst};
    this.http.post<{message:string}>('http://localhost:3000/coms',this.myCom).subscribe((responseData)=>{
      console.log(responseData.message);
    });
  }
  promeni(){
    this.read=!this.read;
  }
  logout(){
    this.router.navigate(['login']);
  }
  reduser(username:string){
    localStorage.setItem('currentUser',username);
    this.router.navigate(['profil']);
  }
  update(){
    if(this.bu){
      this.bu.stigo=this.stigo;
      this.bu.strana=this.strana;
      this.progr=100*this.stigo/this.strana;
      this.http.patch("http://localhost:3000/bookuser",this.bu).subscribe(respones=>{

      })
    }
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
}
