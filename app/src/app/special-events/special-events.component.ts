import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
  specialEvents:any;
  constructor(private specialEvent:EventService,private route:Router) { }

  ngOnInit(): void {
    this.getSpecialEvents()
  }
  getSpecialEvents(){
    this.specialEvent.getSpecialEvents().subscribe(
      res=>this.specialEvents=res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.route.navigate(['/login'])
          }
          else if(err.status===500){
            this.route.navigate(['/login'])
          }
        }
      }
    )
  }

}
