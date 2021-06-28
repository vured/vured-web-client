import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { urlPattern } from 'src/app/auth/connect/connect.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-direct-connect',
  template: ``
})
export class DirectConnectComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const url = this.route.snapshot.paramMap.get('url');
    const api = `https://${url}`;

    if (!RegExp(urlPattern).test(api)) {
      await this.router.navigate(['connect']);
      return;
    }

    localStorage.removeItem('token');
    localStorage.setItem('api', api);

    try {
      await this.authService.checkForExistingUrl().toPromise();
    } catch {
      await this.router.navigate(['connect']);
      return;
    }

    await this.router.navigate(['login'], {
      state: { validUrl: true }
    });
  }
}
