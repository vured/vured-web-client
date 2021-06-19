import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/user/user-dto';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: UserDto;

  @Output() playLogoutTransition = new EventEmitter();

  @ViewChild('profileDropdown') profileDropdown?: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.data.user;
  }

  ngOnInit(): void {
  }

  toggleProfileDropdown(): void {
    this.profileDropdown?.nativeElement.classList.toggle('hidden');
  }

  async logout(): Promise<void> {
    this.authService.logout();
    this.playLogoutTransition.emit();

    setTimeout(async () => await this.router.navigate(['connect']), 2500);
  }
}
