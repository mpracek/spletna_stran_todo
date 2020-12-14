import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
/*
@Injectable()
  export class HttpService{

      http:HttpClient;
      baseUrl: String;

      constructor(http:HttpClient){
          this.http = http;
          this.baseUrl = 'some_url';
      }

      getAPI() {
        this.http.get<any>('http://localhost:8080/api/note/list').subscribe(data => {
            console.log(data)
      }
    )
      }
    postAPI() {
      this.http.post<any>('http://localhost:8080/api/note/',data).subscribe(data => {
          console.log(data)
    })
    }
    get1API() {
      this.http.get<any>('http://localhost:8080/api/note/list/:id').subscribe(data => {
          console.log(data)
    })
    }

     patchAPI() {
      this.http.patch<any>('http://localhost:8080/api/note/update/id',data).subscribe(data => {
          console.log(data)
    })
    }

     deleteAPI() {
      this.http.delete('http://localhost:8080/api/note/:id/delete').subscribe(data => {
          console.log(data)
    })
    }


  }
*/
