import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('layoutView') layoutView?: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  playLogoutTransition(): void {
    this.layoutView?.nativeElement.classList.add('blur-out-contract-bck')
  }
}
