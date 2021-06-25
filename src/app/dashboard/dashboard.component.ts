import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/user/user-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: UserDto

  constructor(
    private route: ActivatedRoute
  ) {
    this.user = this.route.parent?.snapshot.data.user;
  }

  ngOnInit(): void {
  }

}
