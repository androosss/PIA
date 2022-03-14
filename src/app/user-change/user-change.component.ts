import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user-change',
  templateUrl: './user-change.component.html',
  styleUrls: ['./user-change.component.css']
})
export class UserChangeComponent implements OnInit {
  myUser:User;
  ime:string;
  prezime:string;
  grad:string;
  drzava:string;
  dan:number;
  mesec:number;
  godina:number;
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.myUser=JSON.parse(localStorage.getItem('loggedInUser'));
    this.ime=this.myUser.ime;
    this.prezime=this.myUser.prezime;
    this.grad=this.myUser.grad;
    this.drzava=this.myUser.drzava;
    this.dan=this.myUser.dan;
    this.mesec=this.myUser.mesec;
    this.godina=this.myUser.godina;
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
    this.router.navigate(['profil']);
  }
  logout(){
    this.router.navigate(['login']);
  }
  save(){
    this.myUser.ime=this.ime;
    this.myUser.prezime=this.prezime;
    this.myUser.grad=this.grad;
    this.myUser.drzava=this.drzava;
    this.myUser.dan=this.dan;
    this.myUser.mesec=this.mesec;
    this.myUser.godina=this.godina;
    this.http.patch<{message:string}>('http://localhost:3000/users',this.myUser)
     .subscribe((userData)=>{
     });
    localStorage.setItem('loggedInUser',JSON.stringify(this.myUser));
  }
}
