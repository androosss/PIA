import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from 'src/app/models/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser'))
    {
      let reqbody={username:JSON.parse(localStorage.getItem('loggedInUser')).username,lastLog:new Date(),aktivan:0}
      this.http.patch<{message:string}>('http://localhost:3000/users/patchdate',reqbody).subscribe(resp=>{

      })
    }
    localStorage.clear();
    /*const user:User={username:"aleksa", password:"al",tip:2};
    this.http.post<{message:string}>('http://localhost:3000/users',user).subscribe((responseData)=>{
      alert(responseData.message);
      console.log(responseData.message);
    })*/
  }
   login(){
    this.message="";

    this.http.get<{message:string,users:User[]}>('http://localhost:3000/users')
    .subscribe((userData)=>{
      userData.users.forEach((elem)=>{
        if(this.username==elem.username)
          this.user=elem;
      });
    });

    const user={username:this.username, password:this.password};
    this.http.post<{message:string,tip:number}>('http://localhost:3000/users/login',user)
    .subscribe((loginData)=>{
        console.log(JSON.stringify(loginData));
        if(loginData.message!="Ok")
          this.message="Pogrešni kredincijali!";
        else{
          if(loginData.tip==-1)
            this.message="Još vam nije odobren nalog!";
          else{
            let reqbody={username:this.user.username,lastLog:new Date(),aktivan:1}
            this.http.patch<{message:string}>('http://localhost:3000/users/patchdate',reqbody).subscribe(resp=>{
              localStorage.setItem('loggedInUser',JSON.stringify(this.user));
              localStorage.setItem('currentUser',this.username);
              localStorage.setItem('userType',JSON.stringify(loginData.tip));
              this.router.navigate(['profil']);
          });
         }
        }
    });
  }
  username:string;
  password:string;
  message:string;
  user:User;
}
