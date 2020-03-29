import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
