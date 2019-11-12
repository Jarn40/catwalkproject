import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-mercado',
  templateUrl: './add-mercado.component.html',
  styleUrls: ['./add-mercado.component.scss']
})
export class AddMercadoComponent implements OnInit {

  mercadoForm: FormGroup;
  file: File;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.mercadoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }
}
