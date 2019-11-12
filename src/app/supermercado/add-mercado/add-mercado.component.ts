import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-mercado',
  templateUrl: './add-mercado.component.html',
  styleUrls: ['./add-mercado.component.scss']
})
export class AddMercadoComponent implements OnInit {

  supermercadoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      number: new FormControl(''),
      district: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      zip: new FormControl('')
    }),
    mainImage: new FormControl(''),
    additionalImages: new FormControl('')
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.supermercadoForm = this.formBuilder.group({
    //   file: ['', Validators.required],
    //   description: ['', Validators.maxLength(300)],
    //   allowComments: [true]
    // })
  }

  upload() {
    console.warn(this.supermercadoForm.value);
  }

}
