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
  public mainImg;
  public additionalImg: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private getMercadoService: GetMercadoService,
    private router: Router

  ) { }

  ngOnInit() {
    this.supermercadoForm = this.formBuilder.group({
      superMarketName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
      superMarketDescription: this.formBuilder.control('', Validators.compose([Validators.maxLength(300)])),
      superMarketPhone: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])),
      superMarketLocation: new FormGroup({
        street: this.formBuilder.control('', Validators.compose([Validators.required])),
        number: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')])),
        district: this.formBuilder.control('', Validators.compose([Validators.required])),
        city: this.formBuilder.control('', Validators.compose([Validators.required])),
        state: this.formBuilder.control('', Validators.compose([Validators.required])),
        country: this.formBuilder.control('', Validators.compose([Validators.required])),
        zip: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^\\d+$')]))
      }),
      superMarketMainImage: this.formBuilder.array([]),
      superMarketAdditionalImages: this.formBuilder.array([])
    })
    this.extraControl = this.supermercadoForm.controls['superMarketAdditionalImages'] as FormArray;
    this.mainControl = this.supermercadoForm.controls['superMarketMainImage'] as FormArray
  }

  upload() {
    console.log(this.supermercadoForm.value)
    this.getMercadoService.addMercado(this.supermercadoForm.value)
      .pipe(finalize(() => {
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
            this.extraControl.push(this.formBuilder.control(event.target.result));
            this.additionalImg.push(event.target.result)
          } else {
            this.mainControl.push(this.formBuilder.control(event.target.result))
            this.mainImg = event.target.result
          }
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImg(ref, i) {
    if (ref == "extra") {
      this.extraControl.removeAt(i)
      this.additionalImg.splice(i, 1)
    } else {
      this.mainControl.removeAt[0]
      this.mainImg = ""
    }

  }


}
