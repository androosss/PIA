import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Event} from '../models/event'

@Component({
  selector: 'app-guest-event',
  templateUrl: './guest-event.component.html',
  styleUrls: ['./guest-event.component.css']
})
export class GuestEventComponent implements OnInit {

  events:Event[]=[];
  danas:Date;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.danas=new Date();
    this.http.get<{message:string, events:Event[]}>("http://localhost:3000/events").subscribe(result=>{
      result.events.forEach(elem=>{
        if(elem.tip=="javni" && this.danas<=(new Date(elem.kraj)) && elem.zavrseno==0)
        {
          if(this.danas>=(new Date(elem.pocetak)))
            elem.tip="Aktivan";
          else{
            let pom=(new Date(elem.pocetak)).toDateString()
            elem.tip=`Počinje ${pom}`;
          }
          this.events.push(elem);
        }
      })
    })
  }

}
