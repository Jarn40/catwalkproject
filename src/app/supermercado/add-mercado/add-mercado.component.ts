import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GetMercadoService } from '../../services/api-mercado/api-mercado.service'

import { HttpEvent, HttpEventType } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Supermercado } from 'src/app/interfaces/supermercado.interface';

@Component({
  selector: 'app-add-mercado',
  templateUrl: './add-mercado.component.html',
  styleUrls: ['./add-mercado.component.scss']
})
export class AddMercadoComponent implements OnInit {
  private control: FormArray;
  public supermercadoForm: FormGroup;
  router: any;

  constructor(
    private formBuilder: FormBuilder,
    private getMercadoService: GetMercadoService

  ) { }

  ngOnInit() {
    this.supermercadoForm = this.formBuilder.group({
        superMarketName: this.formBuilder.control(''),
        superMarketDescription: this.formBuilder.control(''),
        superMarketPhone: this.formBuilder.control(''),
        superMarketLocation: new FormGroup({
        street: this.formBuilder.control(''),
        number: this.formBuilder.control(''),
        district: this.formBuilder.control(''),
        city: this.formBuilder.control(''),
        state: this.formBuilder.control(''),
        country: this.formBuilder.control(''),
        zip: this.formBuilder.control('')
      }),
      superMarketMainImage: this.formBuilder.control(''),
      superMarketAdditionalImages: this.formBuilder.array([])
    })
    this.control = this.supermercadoForm.controls['superMarketAdditionalImages'] as FormArray;
    //this.control.push(this.formBuilder.control(2))
  }

  upload() {
    // console.warn(this.supermercadoForm.value);
    // console.log(typeof(this.supermercadoForm.value))
    this.getMercadoService.addMercado(JSON.stringify(this.supermercadoForm.value))
    // .subscribe((data)=>{console.log(data)})
    .subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {                  
                  this.control.push(this.formBuilder.control(event.target.result));
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


}
