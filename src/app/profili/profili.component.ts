import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-profili',
  templateUrl: './profili.component.html',
  styleUrls: ['./profili.component.css']
})
export class ProfiliComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient) { }
  email:string;
  ime:string;
  prezime:string;
  username:string;
  users:User[];
  upit:User[];
  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.http.get<{message:string,users:User[]}>('http://localhost:3000/users')
    .subscribe((userData)=>{
      this.users=userData.users;
    });
  }

  trazi(){
    this.upit=[];
    this.users.forEach(elem=>{
      if((this.username==null || elem.username.includes(this.username)) && (this.ime==null || elem.ime.includes(this.ime)) &&
      (this.prezime==null || elem.prezime.includes(this.prezime))&& (this.email==null || elem.email.includes(this.email))
      && elem.tip>=0)
        this.upit.push(elem);
    });
  }
  redirect(user){
    localStorage.setItem('currentUser',user);
    this.router.navigate(['profil']);
  }
  logout(){
    this.router.navigate(['login']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
}
