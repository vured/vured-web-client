import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Modal } from 'src/app/layout/modal/modal';

@Component({
  selector: 'app-connection-lost-modal',
  templateUrl: './connection-lost-modal.component.html',
  styleUrls: ['./connection-lost-modal.component.scss']
})
export class ConnectionLostModalComponent extends Modal implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
  }

  async disconnect(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['connect']);
  }

  onInjectData(input: any): void {
  }
}
