import { ProductService } from '../../../auth/product/product.service';
import { IProduct } from '../../product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productUpdateFormGroup: FormGroup;
  
  //produto: IProduct;

  constructor(private productService: ProductService, 
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.productUpdateFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      price: [null, [Validators.required, Validators.min(0.1), Validators.max(99999)]],
      qnt: ["", [Validators.required, ,Validators.min(1), Validators.max(99999) ]],
      id: ["", [Validators.required, ,Validators.min(1), Validators.max(99999) ]]
    })
    
  }

  ngOnInit(): void {
    this.productService.readById(this.activatedRoute.snapshot.params['id']).subscribe(
      {
        next: (produto) => {
          this.updateFormValues(produto)          
        },
        error: (error) => {
          this.productService.handleError('Nao foi possivel carregar os dados dos produtos', error)
        }
      }
    )
  }

  updateFormValues(product: IProduct):void{
    this.productUpdateFormGroup.setValue(
      {
       "name": product.name,
       "price": product.price,
       "qnt": product.qnt,
       "id": product.id
      }
    )
  }

  cancel():void {
    this.router.navigate(['/'])
  }

  save():void {
    if(this.productUpdateFormGroup.valid){
      this.productService.update(this.productUpdateFormGroup.value).subscribe({
        next: () =>{
          this.productService.showMessage("Produto Atualizado!")  
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.productService.handleError('Erro ao atualizar o produto', error)
        }
      })
        
    }  
  }
}
