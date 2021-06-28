import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public apiUrl = localStorage.getItem('api');
  public loginForm = this.formBuilder.group({
    token: ['', [Validators.required]]
  });

  @ViewChild('loginFormElement') loginFormElement?: ElementRef;
  @ViewChild('loginView') loginView?: ElementRef;
  @ViewChild('loginBtn') loginBtn?: ElementRef;
  @ViewChild('loginBtnSpinner') loginBtnSpinner?: ElementRef;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    const loginBtnElement = this.loginBtn?.nativeElement;
    const loginBtnSpinnerElement = this.loginBtnSpinner?.nativeElement;

    if (this.loginForm.invalid) {
      this.shakeForm();
      return;
    }

    loginBtnElement.disabled = true;
    loginBtnSpinnerElement.classList.remove('hidden');

    localStorage.setItem('token', this.loginForm.controls.token.value);

    try {
      await this.authService.validateToken().toPromise();
    } catch {
      loginBtnElement.disabled = false;
      loginBtnSpinnerElement.classList.add('hidden');
      this.loginForm.controls.token.setErrors({ invalidToken: true });
      return;
    }

    loginBtnElement.disabled = false;
    loginBtnSpinnerElement.classList.add('hidden');

    await this.navigateNext();
  }

  async navigateNext(): Promise<void> {
    this.loginView?.nativeElement.classList.add('slide-out-blurred-top');

    setTimeout(async () => await this.router.navigate(['dashboard'], {
      state: { validUrl: true }
    }), 500);

  }

  shakeForm(): void {
    this.loginFormElement?.nativeElement.classList.add('shake-horizontal');

    setTimeout(() => {
      this.loginFormElement?.nativeElement.classList.remove('shake-horizontal');
    }, 800);
  }
}
