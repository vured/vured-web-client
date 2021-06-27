import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

export const urlPattern = 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)';

@Component({
  selector: 'app-auth-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  public connectForm = this.formBuilder.group({
    api: [localStorage.getItem('api'), [
      Validators.required,
      Validators.pattern(urlPattern)
    ]]
  }, {
    updateOn: 'change'
  });

  @ViewChild('apiInput') apiInput?: ElementRef;
  @ViewChild('connectView') connectView?: ElementRef;
  @ViewChild('connectBtn') connectBtn?: ElementRef;
  @ViewChild('connectBtnSpinner') connectBtnSpinner?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async connect(): Promise<void> {
    const connectBtnElement = this.connectBtn?.nativeElement;
    const connectBtnSpinnerElement = this.connectBtnSpinner?.nativeElement;

    if (this.connectForm.invalid) {
      this.shakeInput();
      return;
    }

    connectBtnElement.disabled = true;
    connectBtnSpinnerElement.classList.remove('hidden');

    localStorage.setItem('api', this.connectForm.controls.api.value);

    try {
      await this.authService.checkForExistingUrl().toPromise();
    } catch {
      connectBtnElement.disabled = false;
      connectBtnSpinnerElement.classList.add('hidden');

      localStorage.removeItem('api');
      this.connectForm.controls.api.setErrors({ notExist: true });
      return;
    }

    connectBtnElement.disabled = false;
    connectBtnSpinnerElement.classList.add('hidden');

    await this.navigateNext();
  }

  async navigateNext(): Promise<void> {
    this.connectView?.nativeElement.classList.add('slide-out-top');

    setTimeout(async () => await this.router.navigate(['login'], {
      state: { validUrl: true }
    }), 500);

  }

  shakeInput(): void {
    this.apiInput?.nativeElement.classList.add('shake-horizontal');

    setTimeout(() => {
      this.apiInput?.nativeElement.classList.remove('shake-horizontal');
    }, 800);
  }
}
