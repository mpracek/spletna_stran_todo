import { Component, OnInit, Input, TemplateRef, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notes } from '../note';
import { AppConfigService } from './services/appconfig.services';
import { Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: []
})

export class AppComponent implements OnInit {
  title = 'Zadolzitve';
  // notes = Notes;
  selectedNote: Notes;

  constructor(
    private configService: AppConfigService,
    private modalService: BsModalService
  ) { }

  notes = [];

  userInput = null;

  ngOnInit() {

    this.getAllNotes();
  }

  onSelect(note: Notes): void {
    this.selectedNote = note;
  }

  async getAllNotes() {
    this.configService.listAll().then(resp => {
      console.log(resp);
      if (resp && resp.data) {
        this.notes = resp.data;
      }
    })
  }

  createNote() {
    console.log({note: this.userInput})
    this.configService.createNote({note: this.userInput});
    this.userInput = null;
    this.getAllNotes();
  }


  updateNote(note) {
    console.log("UPDATE", note);
    this.configService.updateNote(note);
    this.getAllNotes();
    this.decline();
  }



  deleteNote(note) {
    console.log("DELETE", note.id);
    this.configService.deleteNote({id: note.id});
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

