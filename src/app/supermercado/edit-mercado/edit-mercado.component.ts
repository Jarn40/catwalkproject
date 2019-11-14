import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supermercado } from 'src/app/interfaces/supermercado.interface';
import { Observable } from 'rxjs';
import { GetMercadoService } from 'src/app/services/api-mercado/api-mercado.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-mercado',
  templateUrl: './edit-mercado.component.html',
  styleUrls: ['./edit-mercado.component.scss']
})
export class EditMercadoComponent implements OnInit {

  mercadoId: string
  public mainImg;
  public additionalImg: any[] = [];
  public supermercadoForm: FormGroup;
  private extraControl: FormArray;
  private mainControl: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private getMercadoService: GetMercadoService,
    private router: Router,
    private route: ActivatedRoute
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
    this.mercadoId = this.route.snapshot.params.id;
    this.getMercadoService.getMercado(this.mercadoId).subscribe(mercado => {
      this.supermercadoForm.patchValue({
        superMarketName: mercado.superMarketName,
        superMarketDescription: mercado.superMarketDescription,
        superMarketPhone: mercado.superMarketPhone,
        superMarketLocation: mercado.superMarketLocation,
      })
      this.mainImg = mercado.superMarketMainImage;
      this.additionalImg = mercado.superMarketAdditionalImages;
    })
  }

  edit() {
    this.getMercadoService.editMercado(this.mercadoId, this.supermercadoForm.value)
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