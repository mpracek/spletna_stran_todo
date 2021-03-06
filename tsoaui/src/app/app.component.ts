import { Component, OnInit, Input, TemplateRef, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from '../note';
import { AppConfigService } from './services/appconfig.services';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[]
})


export class AppComponent implements OnInit {
  title = 'Zadolzitve';

  selectedNote: Notes;
  dynamicForm: FormGroup;

  constructor(
    private configService: AppConfigService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) { }

  notes = [];

  //userInput = null;
  //userInput1 = null;
  submit: boolean = false;

  ngOnInit() {
    this.getAllNotes();
  }

   form_control = new FormGroup({
      note_control : new FormControl('', Validators.required),
      creation_control : new FormControl('', Validators.required)
    });



  onSelect(note: Notes): void {
    this.selectedNote = note;
  }

  async getAllNotes() {
    this.configService.listAll().then(resp => {
      console.log(resp);
      if (resp) {
        this.notes = resp;
      }
    })
  }


    createNote() {
    this.submit = true;
    if (this.form_control.invalid) return;
    this.configService.createNote({ note: this.form_control.value.note_control, creation: this.form_control.value.creation_control });
    this.getAllNotes();
    this.form_control.reset();
    this.submit = false;
  }


  updateNote(noteUpdate) {
    console.log("UPDATE", noteUpdate);
    this.configService.updateNote(noteUpdate);
    this.getAllNotes();
    this.decline();
  }



  deleteNote(note) {
    console.log("DELETE", note.id);
    this.configService.deleteNote({id:note.id}).then(resp => {
      console.log(resp);
      if (resp) {
        this.notes = resp;
      }
    });
    this.getAllNotes();
    this.decline();
  }

  modalRef: BsModalRef;

  message: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }
}

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
      { optional: true }
    ),
    query(':leave',
      animate('200ms', style({ opacity: 0 })),
      { optional: true}
    )
  ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);
