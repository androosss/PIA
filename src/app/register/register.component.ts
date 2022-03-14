import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {User} from '../models/user'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  slika=null;
  slikapr:string;
  potvrda:string;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  register()
  {
    this.message="";
    const user:User={
      aktivan:0,
      username:this.username,
      password:this.password,
      tip:-1,
      ime:this.ime,
      prezime:this.prezime,
      grad:this.grad,
      drzava:this.drzava,
      email:this.email,
      dan:this.dan,
      mesec:this.mesec,
      godina:this.godina,
      imagePath:null,
      lastLog: new Date()
    };
    if(this.username==null || this.password==null || this.ime==null || this.prezime==null
      || this.grad==null || this.drzava==null || this.dan==null || this.mesec==null || this.godina==null)
      this.message="Popunite sva polja!";
    //if(!this.notrobot && this.message=="") this.message="Popunite reCAPTCHA formu!";
    this.http.get<{message:string,users:User[]}>('http://localhost:3000/users')
    .subscribe((userData)=>{
      this.users=userData.users;
      this.users.forEach((elem)=>{
        if(elem.username==this.username)
        {
          this.message="Korisničko ime već postoji!";
        }
        if(this.message=="" && elem.email==this.email)
          this.message="E-mail se već kosristi!"
      })
    if(this.password.length<7 && this.message=="") this.message="Neodgovarajuća lozinka!";
    if(this.message=="" && !(this.password[0]>='a' && this.password[0]<='z') && !(this.password[0]>='A' && this.password[0]<='Z'))
      this.message="Neodgovarajuća lozinka!";
    let a:number=0;
    let b:number=0;
    let c:number=0;
    for (let index = 0; index < this.password.length; index++) {
      const element = this.password[index];
      if(element>="A" && element<="Z") a++;
      if(element>="0" && element<="9") b++;
      if(!(element>='a' && element<='z') && !(element>='A' && element<='Z') && !(element>="0" && element<="9")) c++;
    }
    if(this.message=="" && (a==0 || b==0 || c==0))
      this.message="Neodgovarajuća lozinka!";
    if(this.password!=this.potvrda) this.message="Potvrda i lozinka se ne poklapaju!";
    if(this.message=="")
      {
        const userData=new FormData();
        userData.append("username",this.username);
        userData.append("password",this.password);
        userData.append("ime",this.ime);
        userData.append("tip",user.tip as unknown as string);
        userData.append("prezime",this.prezime);
        userData.append("grad",this.grad);
        userData.append("drzava",this.drzava);
        userData.append("dan",this.dan  as unknown as string);
        userData.append("mesec",this.mesec  as unknown as string);
        userData.append("godina",this.godina  as unknown as string);
        userData.append("email",this.email);
        userData.append('aktivan',0 as unknown as string);
        userData.append("lastLog",user.lastLog  as unknown as string);
        if(this.slika!=null) userData.append("image",this.slika,this.slika.name);
        this.http.post<{message:string}>("http://localhost:3000/users",userData).subscribe(response =>{
            console.log(this.message);
        })
        this.message="Zahtev za registraciju je poslat administratorima!";
        grecaptcha.reset();
        this.username=null;
        this.password=null;
        this.ime=null;
        this.prezime=null;
        this.grad=null;
        this.drzava=null;
        this.dan=null;
        this.mesec=null;
        this.godina=null;
        this.email=null;
        this.slikapr=null;
        this.potvrda=null;
      }
    })
  }
  onSelect(event){
    this.slika=event.target.files[0];
    console.log(this.slika);
    const reader=new FileReader();
    reader.onload=()=>{
      this.slikapr=reader.result as string;
    };
    reader.readAsDataURL(this.slika);
  }
  resolved(captchResponse:string){
    const response:string=captchResponse;
    this.http.post<{message:boolean}>('http://localhost:3000/captcha',{token:response}).subscribe((responseData)=>{
      this.notrobot=responseData.message;
    })
  }
  notrobot:boolean;
  username:string;
  password:string;
  tip:number;
  ime:string;
  prezime:string;
  grad:string;
  drzava:string;
  email:string;
  dan:number;
  mesec:number;
  godina:number;
  users:User[]=[];
  message:string;
}
