import { CartService } from 'src/app/auth/cart/cart.service';
import { CheckoutService } from './../../../auth/checkout/checkout.service';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private checkoutService: CheckoutService,
              private cartService: CartService,
              private router: Router
              ) {
    
    let fb = this.formBuilder

    this.checkoutFormGroup = fb.group({
      address: fb.group({
        zipcode:  [null, Validators.required],
        street:   [null, Validators.required],
        number:   [null, Validators.required],
        state:   [null, Validators.required],
        city:     [null, Validators.required],
        neighbor: [null, Validators.required]
      }),
      payment: fb.group({
        name: [null, Validators.required],
        card: [null, [ Validators.required]],
        cv:   [null, [ Validators.required]],
        date: [null, Validators.required]
      })
    })

    
  }

  ngOnInit(): void {
  }

  verifyErrors(path: string): any {
    return this.checkoutFormGroup.get(path)?.errors   
  }

  submitCepConsult(){
    let cep = this.checkoutFormGroup.get("address.zipcode")?.value
  
    this.checkoutService.consultCep(cep).subscribe({
      next: data => {
        this.setDataFromCep(data)
      }
    })
  }

  setDataFromCep(data: any) {
    this.checkoutFormGroup.get('address.street')?.setValue(data.logradouro)
    this.checkoutFormGroup.get('address.state')?.setValue(data.uf)
    this.checkoutFormGroup.get('address.city')?.setValue(data.localidade)
    this.checkoutFormGroup.get('address.neighbor')?.setValue(data.bairro)
  }

  onSubmit() {
    if(this.checkoutFormGroup.valid) {
      this.checkoutService.checkout(this.checkoutFormGroup.get('address')?.value, this.checkoutFormGroup.get('payment')?.value)
      this.router.navigate(['/shop'])
    }
  }
}
