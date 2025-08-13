import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { json } from 'stream/consumers';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  log!:boolean;
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get getEmail() {
    return this.loginForm.get('email');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.auth.login(formValue).subscribe({
        next: (res) => {
          localStorage.setItem("token",res.data.tokens.access_token)
          this.auth.isLogged()
          this.showSuccessAlert()
          this.router.navigate(['/home']);
        },
        error:()=>this.showFailAlert()
      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: ' registered successfully🎉',
      confirmButtonText: 'ok'
    });
  }
  showFailAlert() {
    Swal.fire({
      icon: 'error',
      title: ' Invalid Email Or Password',
      confirmButtonText: 'ok'
    });
  }
}
