import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-auth-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  public connectForm = this.formBuilder.group({
    api: ['', [
      Validators.required,
      Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)')
    ]]
  }, {
    updateOn: 'change'
  });

  @ViewChild('apiInput') apiInput?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  async connect(): Promise<void> {
    if (this.connectForm.invalid) {
      this.shakeInput();
      return
    }

    localStorage.setItem('api', this.connectForm.controls.api.value);

    const isExist = await this.authService.checkForExistingUrl();

    if (!isExist) {
      this.connectForm.controls.api.setErrors({ notExist: true });
      return
    }

    console.log('success');
  }

  shakeInput(): void {
    this.apiInput?.nativeElement.classList.add('shake-horizontal');

    setTimeout(() => {
      this.apiInput?.nativeElement.classList.remove('shake-horizontal');
    }, 800);
  }
}
