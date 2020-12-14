import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Prva naloga';
  totalAngularPackages;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.http.get<any>('http://localhost:4200/list').subscribe(data => {this.totalAngularPackages = data.total;})
    //this.http.post<any>('http://localhost:4200/new').subscribe(data => {this.postID = data.id})
  }
}
