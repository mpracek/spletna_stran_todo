import { Notes } from './../../note';
import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class BaseService implements OnInit {

      constructor(private http: HttpClient) {}

    //ta izpiše vse
     getAPI(url: string): Observable<any> {
          const headers = new Headers({'Content-Type' : 'application/json'});
          return this.http.get(url)
              .pipe(map((response: Response) => response),
                catchError(this.handleError));
     }
     //ta dovoli dodati novo eno
      postAPI(url: string, data: Notes): Observable<any> {
           const headers = new Headers({'Content-Type' : 'application/json'});
          return this.http.post(url, data)
           .pipe(map((response: Response) => response),
             catchError(this.handleError));
      }
     //ta dovoli popraviti eno
     patchAPI(url: string, data: Notes): Observable<any> {
      const headers = new Headers({'Content-Type' : 'application/json'});
      return this.http.patch(url, {params: data})
      .pipe(map((response: Response) => response),
        catchError(this.handleError));
      }
     //ta izpiše eno
     get1API(url: string, data: any): Observable<any> {
      const headers = new Headers({'Content-Type' : 'application/json'});
      return this.http.get(url, {params: data})
          .pipe(map((response: Response) => response),
            catchError(this.handleError));
      }
  	  //ta izbriše eno
      deleteAPI(url: string, data: any): Observable<any> {
        console.log(url);
        const headers = new Headers({'Content-Type' : 'application/json'});
        return this.http.post(url, data)
        .pipe(map((response: Response) => response),
          catchError(this.handleError));
      }
        private handleError(error: Response) {
          console.log('ERROR::STATUS:::::' + error.status);
          console.log('ERROR::STATUS TEXT:::::' + error.statusText);
          if (error.status === 504 || error.status === 502 || error.status === 503) {
              return of('');
          } else {
             return of(JSON.stringify(error) || 'Server error');
          }
      }

      ngOnInit() {}
}
