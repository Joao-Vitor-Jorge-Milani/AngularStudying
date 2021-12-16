import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  createFormGroup: FormGroup;  

   constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
      this.createFormGroup = this.formBuilder.group({ 
        name: ["", Validators.required], 
        email: ["", [Validators.required, Validators.email]], 
        password: ["", Validators.required]
      })
    }

  ngOnInit(): void {
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top"
    })
  }

  login(): void { }

  onSubmit(): void {
    if(this.createFormGroup.valid) {
      this.userService.create(this.createFormGroup.value).subscribe({
        next: () => {
          this.showMessage("Usuário criado com sucesso!")
          this.router.navigate(['/login'])
          
        },
        error: (error) => {
          this.userService.handleError('Erro ao criar o usuário', error);       
        }
      })  
    }   
  }
}
