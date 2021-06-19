import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.shakeForm();
      return;
    }

    localStorage.setItem('token', this.loginForm.controls.token.value);

    try {
      await this.authService.validateToken().toPromise();
    } catch {
      this.loginForm.controls.token.setErrors({ invalidToken: true });
      return;
    }
  }

  shakeForm(): void {
    this.loginFormElement?.nativeElement.classList.add('shake-horizontal');

    setTimeout(() => {
      this.loginFormElement?.nativeElement.classList.remove('shake-horizontal');
    }, 800);
  }
}
