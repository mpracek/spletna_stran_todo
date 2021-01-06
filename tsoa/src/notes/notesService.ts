/*
TODO:
typeorm uporaba
dependency injection: ko kličemo constructor->service, se ta service sam postavi. DepInj je tak mehanizem
princip: anotira se zadeve
ideja: postavi se kontainer npr iocContainter, se zadeve postavijo same
dependency injection je @Inject
za to potrebujemo še @Factory
*/

import { Notes } from './note';

import {
  db, SQL_CREATE_NOTE_TABLE,SQL_INSERT_DATA,SQL_QUERY_NOTES,SQL_UPDATE_DATA,SQL_DELETE_DATA,  SQL_FIND_DATA
} from './database';

export type NoteInsertParam = Pick<Notes,"creation"|"note">;
export type NoteUpdateParam = Pick<Notes,"id"|"creation"|"note">;
export type NoteQueryParam = Pick<Notes,"id">;
export type NoteDeleteParam = Pick<Notes,"id">;

export class NotesService {
  
public async getNotes(): Promise<Notes[]> {
    return new Promise((resolve,reject)=> {
      db.all(SQL_QUERY_NOTES,(err:any, vals:Notes[])=>{
        if (err) {
          console.log('reject');
          reject('Error: get Notes query failed');
          return;
        }
        console.log(vals);
        resolve(vals);
      });
    }
    )
  }

  public async findOneNote(id: number): Promise<Notes> {
  return new Promise((resolve, reject) => {
    db.get(SQL_FIND_DATA, [id], (err: any, vals: any) => {
      if (err) {
        console.log('reject', err);
        reject('Error: get Notes query failed');
        return;
      }
      console.log("VALS", vals);
      resolve(vals);
    });
    }
    )
  }

  public async insertNote(NoteInsertParam:NoteInsertParam): Promise<Notes> {
    return new Promise((resolve, reject) => {
    var today = NoteInsertParam.creation;
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var today2 = yyyy + '-' + mm + '-' + dd;
    
      db.run(SQL_INSERT_DATA,[today2,NoteInsertParam.note], (err: any, vals: any) => {
        if (err) {
          console.log('reject', err);
          reject('Error: insert Notes query failed');
          return;
        }
        console.log("VALS insert", vals);
        resolve(vals);
      });
    }
    )
    }

  public updateNote(NoteUpdateParam:NoteUpdateParam): Promise<Notes> {
    return new Promise((resolve, reject) => {     
      var today = NoteUpdateParam.creation;
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      var UpdateDate = yyyy + '-' + mm + '-' + dd;
      db.run(SQL_UPDATE_DATA,[NoteUpdateParam.note,UpdateDate,NoteUpdateParam.id], (err: any, vals: any) => {
        if (err) {
          console.log('reject', err);
          reject('Error: update Note query failed');
          return;
        }
        console.log("VALS", vals);
        resolve(vals);
      });
    })}

  public deleteNote(NoteDeleteParam:NoteDeleteParam): Promise<Notes> {
  return new Promise((resolve, reject) => {
    db.get(SQL_DELETE_DATA, NoteDeleteParam.id, (err: any, vals: any) => {
      if (err) {
        console.log('reject', err);
        reject('Error: delete Note query failed');
        return;
      }
      console.log("DeleteNote", vals);
      resolve(vals);
    });
  }
  )
  }

}

