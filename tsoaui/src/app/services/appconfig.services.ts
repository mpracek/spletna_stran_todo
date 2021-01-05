import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService extends BaseService {

  private envUrl = '/api/note/';

  public listAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAPI(this.envUrl + "list").subscribe((response: any) => {
      resolve(response);
      });
    })
  }

  public createNote(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postAPI(this.envUrl, data).subscribe((response: any) => {
        console.log('dodano prek server:::', response);
        resolve(response);
      });
    })
  }

  public getOne(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.get1API(this.envUrl, data).subscribe((response: any) => {
        console.log('1 pobrana iz server:::', response);
        resolve(response);
      });
    })
  }

  public updateNote(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postAPI(this.envUrl + "update", data).subscribe((response: any) => {
        console.log('popravljena na server:::', response);
        resolve(response);
      });
    })
  }

  public deleteNote(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postAPI(this.envUrl + "delete", data).subscribe((response: any) => {
        console.log('izbrisana na server:::', response);
        resolve(response);
      });
    })
  };
}

