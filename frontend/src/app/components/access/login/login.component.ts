import { UserService } from '../../../auth/user/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  selected = new FormControl(0);  

  loginFormGroup: FormGroup;  

  constructor(
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router
    ) { 
      this.loginFormGroup = this.formBuilder.group({ 
        email: ["", [Validators.required, Validators.email]], 
        password: ["", Validators.required]
      })
    }

  ngOnInit(): void {
  }


  login(): void { }

  onSubmit(): void {
    if(this.loginFormGroup.valid) {
      this.userService.login(this.loginFormGroup.value).subscribe({
        next: (data) => {
          let token = data['accessToken']
          window.localStorage.setItem("token", token)
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.userService.handleError('Erro ao entrar na plataforma', error)
        }
      })  
    }   
  }
}
