import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  connect(): void {
    if (this.connectForm.invalid) {
      this.shakeInput();
      return;
    }


    console.log(1);
  }

  shakeInput(): void {
    this.apiInput?.nativeElement.classList.add('shake-horizontal');

    setTimeout(() => {
      this.apiInput?.nativeElement.classList.remove('shake-horizontal');
    }, 800);
  }
}
