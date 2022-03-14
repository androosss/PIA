import { HttpClient} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { User } from '../models/user';
import {BookUser} from '../models/bookuser'
import { ChartType, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { Zanr } from '../models/zanr';
import {Follow} from '../models/follow';
import {Comment} from '../models/comment'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;
  myUser:User;

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartColors=[{backgroundColor:[]}];

  constructor(private router:Router, private http:HttpClient) { }
  coms:Comment[]=[];
  tip:number;
  datumr:string;
  buttonText:string;
  datuma:string;
  opcije=[1,2,3,5,10];
  brojKnjiga:number;
  poStrani:number;
  strana:number;
  prikazano:Book[]=[];
  knjige:Book[]=[];
  my:number;
  bu:number;
  ca:number;
  vrsta:number;
  ngOnInit(): void {
    if(localStorage.getItem('loggedInUser')==null) this.router.navigate(['login']);
    this.buttonText="Prati";
    this.http.get<{message:string,follows:Follow[]}>('http://localhost:3000/follows')
    .subscribe((followData)=>{
       followData.follows.forEach(elem=>{
        if(elem.username1==JSON.parse(localStorage.getItem('loggedInUser')).username &&
          elem.username2==localStorage.getItem('currentUser'))
            this.buttonText="Pratite";
      });
    });
    this.bu=0;
    this.ca=0;
    this.strana=1;
    this.poStrani=2;
    this.tip=JSON.parse(localStorage.getItem('userType'));
    this.http.get<{message:string,users:User[]}>('http://localhost:3000/users')
     .subscribe((userData)=>{
       userData.users.forEach(elem=>{
         if(elem.username==localStorage.getItem('currentUser'))
          this.myUser=elem;
       })
       this.datumr=`${this.myUser.dan}/${this.myUser.mesec}/${this.myUser.godina}`
       if(this.myUser.aktivan==1) this.datuma='Aktivan sada';
       else
       {
        let pom=this.myUser.lastLog as unknown as string;
        this.datuma=`Poslednji put aktivan ${pom[8]}${pom[9]}/${pom[5]}${pom[6]}/${pom[0]}${pom[1]}${pom[2]}${pom[3]} ${pom[11]}${pom[12]}${pom[13]}${pom[14]}${pom[15]}`;
       }
       if((JSON.parse(localStorage.getItem('loggedInUser'))).username==this.myUser.username)
        this.my=1;
      else this.my=0;
     });
     let i=100;
     this.http.get<{message:string,zanrs:Zanr[]}>('http://localhost:3000/zanr')
    .subscribe((userData)=>{
      userData.zanrs.forEach((elem,index)=>{
        this.pieChartLabels.push(elem.ime);
        this.pieChartData.push(0);
        let color = Math.floor(0x1000000 * Math.random()).toString(16);
        let color1= '#' + ('000000' + color).slice(-6);
        this.pieChartColors[0].backgroundColor.push(color1);
      })
    });
    this.http.get<{message:string,coms:Comment[]}>('http://localhost:3000/coms')
    .subscribe((comsData)=>{
      comsData.coms.forEach(elem=>{
        if(elem.username==localStorage.getItem('currentUser'))
          this.coms.push(elem);
      });
    });
  }
  change(){
    this.router.navigate(['userChange']);
  }
  show(){
    if(this.vrsta==2) this.bu=1;
    else this.bu=0;
    if(this.vrsta==0) this.ca=1;
    else this.ca=0;
    this.knjige=[];
    this.prikazano=[];
    let pom:Book[];
    let pom1:BookUser[];
    this.http.get<{message:string,books:Book[]}>('http://localhost:3000/books')
    .subscribe((bookData)=>{
      pom=bookData.books;
    });
    this.http.get<{message:string,bookusers:BookUser[]}>('http://localhost:3000/bookusers')
    .subscribe((bookuserData)=>{
      for (let index = 0; index < this.pieChartData.length; index++)
        this.pieChartData[index]=0;
      pom1=bookuserData.bookusers;
      pom.forEach(elem=>{
        pom1.forEach(elem1=>{
          if(elem1.username==localStorage.getItem('currentUser') && elem.naslov==elem1.naslov && elem1.tip==this.vrsta)
          {
            this.knjige.push(elem);
            if(this.vrsta==0)
              for (let index = 0; index < this.pieChartLabels.length; index++) {
                if(this.pieChartLabels[index]==elem.zanr1)
                  this.pieChartData[index]++;
                if(this.pieChartLabels[index]==elem.zanr2)
                  this.pieChartData[index]++;
                if(this.pieChartLabels[index]==elem.zanr3)
                  this.pieChartData[index]++;
              }
              this.chart.chart.update();
          }
        });
      });
      this.brojKnjiga=this.knjige.length;
      this.prikazano=[];
      for (let index = (this.strana-1)*this.poStrani; index < this.knjige.length; index++) {
        this.prikazano.push(this.knjige[index]);
        if(index-this.strana*this.poStrani==-1)
          break;
      }
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
  redirect(naslov:string){
    localStorage.setItem('book',naslov);
    this.router.navigate(['book']);
  }
  remove(naslov:string){
    this.http.delete('http://localhost:3000/bookusers/'+naslov+'/'+localStorage.getItem('currentUser'))
      .subscribe(()=>{
        console.log('deleted');
      })
  }
  follow(){
    if(this.buttonText=="Prati"){
    let follow={username1:JSON.parse(localStorage.getItem('loggedInUser')).username,username2:localStorage.getItem('currentUser')};
    this.http.post<{message:string}>('http://localhost:3000/follows',follow).subscribe((responseData)=>{
      console.log(responseData.message);
      })
    }
    this.buttonText="Pratite";
  }
  logout(){
    this.router.navigate(['login']);
  }
  pocetna(){
    localStorage.setItem('currentUser',JSON.parse(localStorage.getItem('loggedInUser')).username);
    window.location.reload();
  }
}
