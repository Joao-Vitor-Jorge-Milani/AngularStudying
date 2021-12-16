import { ProductService } from '../../../auth/product/product.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../product.model';
import { Router } from '@angular/router'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productCreateFormGroup: FormGroup;

  constructor(private productService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder
  ) { 
    this.productCreateFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      price: [null, [Validators.required, Validators.min(0.1), Validators.max(99999)]],
      qnt: ["", [Validators.required, ,Validators.min(1), Validators.max(999999999) ]]
    })

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.productCreateFormGroup.valid) {
      this.productService.create(this.productCreateFormGroup.value).subscribe({
        next: () => {
          this.productService.showMessage("Produto cadastrado!")
          this.router.navigate(['/'])          
        },
        error: (error) => {
          this.productService.handleError("Erro ao cadastrar novo produto", error)
        }
      })  
    }
  }

  cancel(): void {
    this.router.navigate(["/"])
  }

}
