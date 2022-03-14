import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecaptchaValueAccessorDirective } from 'ng-recaptcha';
import { Book } from '../models/book';
import {Comment} from '../models/comment'

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.css']
})
export class GuestBookComponent implements OnInit {
  vrednostocene:number;
  brojocena:number;
  max=10;
  rand="rand"
  read=true;
  book:Book;
  datum:string;
  coms:Comment[]=[];
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.brojocena=0;
    this.vrednostocene=0;
    this.http.get<{message:string,coms:Comment[]}>('http://localhost:3000/coms')
    .subscribe((comsData)=>{
      comsData.coms.forEach(elem=>{
        if(elem.naslov==localStorage.getItem('book'))
        {
          this.brojocena++;
          this.vrednostocene+=elem.ocena;
          this.coms.push(elem);
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
}
