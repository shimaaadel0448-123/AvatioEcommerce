import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Iuser } from '../../Module/iuser';
import { AuthService } from '../../services/auth.service'; // 👈 استيراد الخدمة
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator()]],
    });
  }

  ngOnInit(): void { }

  matchPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!this.signUpForm) return null;
      const password = this.signUpForm.get('password')?.value;
      return control.value === password ? null : { mismatch: true };
    };
  }
  get getFirstName() { return this.signUpForm.get('firstName'); }
  get getLastName() { return this.signUpForm.get('lastName'); }
  get getEmail() { return this.signUpForm.get('email'); }
  get getPassword() { return this.signUpForm.get('password'); }
  get getPhone() { return this.signUpForm.get('phone'); }
  get getConfirmPassword() { return this.signUpForm.get('confirmPassword'); }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;
      const newUser: Iuser = {
        first_name: formValue.firstName,
        last_name: formValue.lastName,
        email: formValue.email,
        confirm_password: formValue.confirmPassword,
        phone_number: formValue.phone,
        password: formValue.password
      };
      this.authService.register(newUser).subscribe(
        {
          next: (res) => {
            console.log(res);
            localStorage.setItem("name",formValue.firstName+' '+formValue.lastName)
            this.showSuccessAlert();
            this.router.navigate(['/login']);
          }
        }
      )
    }
  }
  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: ' registered successfully🎉',
      confirmButtonText: 'ok'
    });
  }
}
