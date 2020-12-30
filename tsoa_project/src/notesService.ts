/*
TODO:
typeorm uporaba
dependency injection: ko kličemo constructor->service, se ta service sam postavi. DepInj je tak mehanizem
                      princip: anotira se zadeve
                      ideja: postavi se kontainer npr iocContainter, se zadeve postavijo same
dependency injection je @Inject
za to potrebujemo še @Factory
                      */

                     import { Notes } from './notes';

                     import {
                       db, SQL_CREATE_NOTE_TABLE,SQL_INSERT_DATA,SQL_QUERY_NOTES,SQL_UPDATE_DATA,SQL_DELETE_DATA, SQL_COUNT_DATA
                     } from './database';
                     
                     export type NoteInsertParam = Pick<Notes,"creation"|"note">;
                     export type NoteUpdateParam = Pick<Notes,"id"|"creation"|"note">;
                     export type NoteQueryParam = Pick<Notes,"id">;
                     export type NoteDeleteParam = Pick<Notes,"id">;
                     
                     export class NotesService {
                       public async getNotes(): Promise<Notes[]> {
                         return new Promise((resolve,reject)=> {
                           db.get(SQL_QUERY_NOTES,(err:any, vals:Notes[])=>{
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
                     
                       public insertNote(NoteInsertParam:NoteInsertParam): Notes {
                         let noviID = SQL_COUNT_DATA + 1;
                         db.run(SQL_INSERT_DATA,[NoteInsertParam.creation,NoteInsertParam.note]);
                         return {id: noviID ,...NoteInsertParam }
                       }
                     
                       public updateNote(NoteUpdateParam:NoteUpdateParam): void {
                         db.run (SQL_UPDATE_DATA, [NoteUpdateParam.note,NoteUpdateParam.creation,NoteUpdateParam.id]);
                     }
                     
                       public deleteNote(NoteDeleteParam:NoteDeleteParam): void {
                         db.get(SQL_DELETE_DATA, [NoteDeleteParam.id]);
                       }
                     
                     }
                     
                     