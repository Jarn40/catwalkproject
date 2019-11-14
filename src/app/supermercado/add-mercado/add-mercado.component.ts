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
  private extraControl: FormArray;
  private mainControl: FormArray;
  public supermercadoForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private getMercadoService: GetMercadoService,
    private router: Router,

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
      superMarketMainImage: this.formBuilder.array([]),
      superMarketAdditionalImages: this.formBuilder.array([])
    })
    this.extraControl = this.supermercadoForm.controls['superMarketAdditionalImages'] as FormArray;
    this.mainControl = this.supermercadoForm.controls['superMarketMainImage'] as FormArray
    //this.control.push(this.formBuilder.control(2))
  }

  upload() {
    console.log("UPLOAD")
    console.warn(this.supermercadoForm.value);

    this.getMercadoService.addMercado(this.supermercadoForm.value)
      .pipe(finalize( () =>{
        this.router.navigate(['/']);
      }))
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

  onSelectFile(id, event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          if (id == 'extra') {
            console.log(event.target.result)
            this.extraControl.push(this.formBuilder.control(event.target.result));
          } else {
            this.mainControl.push(this.formBuilder.control(event.target.result))
          }
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }


}
