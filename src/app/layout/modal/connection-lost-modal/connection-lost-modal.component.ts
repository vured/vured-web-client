import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-lost-modal',
  templateUrl: './connection-lost-modal.component.html',
  styleUrls: ['./connection-lost-modal.component.scss']
})
export class ConnectionLostModalComponent implements OnInit {

  @Output() playLogoutTransition = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async disconnect(): Promise<void> {
    this.authService.logout();
    await this.router.navigate(['connect'])
  }
}
