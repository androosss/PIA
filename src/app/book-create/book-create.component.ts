import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Zanr } from '../models/zanr';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  naslov:string;
  autori:string;
  opis:string;
  dan:number;
  mesec:number;
  godina:number;
  zanr1:string;
  zanr2:string;
  zanr3:string;
  zanr:Zanr[];
  slika=null;
  slikapr: string;
  message:string;

  constructor(private router:Router, private http:HttpClient){}

  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.http.get<{message:string,zanrs:Zanr[]}>('http://localhost:3000/zanr')
    .subscribe((userData)=>{
      this.zanr=userData.zanrs;
    });
  }
  dodaj(){
      if(this.naslov!=null && this.autori!=null && this.opis!=null && this.dan!=null && this.mesec!=null && this.godina!=null ){
       const userData=new FormData();
        userData.append("naslov",this.naslov);
        userData.append("autori",this.autori);
        userData.append("opis",this.opis);
        userData.append("dan",this.dan  as unknown as string);
        userData.append("mesec",this.mesec  as unknown as string);
        userData.append("godina",this.godina  as unknown as string);
        userData.append("odobreno",0 as unknown as string)
        userData.append("zanr1",this.zanr1);
        userData.append("zanr2",this.zanr2);
        userData.append("zanr3",this.zanr3);
        if(this.slika!=null) userData.append("image",this.slika,this.slika.name);
        this.http.post<{message:string}>("http://localhost:3000/books",userData).subscribe(response =>{
            console.log("done");
        })
        localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);}
      else this.message="Knjiga mora imati naslov, autora, opis i datum izdavanja!";
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
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
        this.router.navigate(['profil']);
  }
  logout(){
    this.router.navigate(['login']);
  }
}
