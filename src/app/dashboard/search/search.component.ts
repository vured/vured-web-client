import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlPattern } from 'src/app/auth/connect/connect.component';
import { PlayerService } from 'src/app/layout/player/player.service';
import { UserDto } from 'src/app/user/user-dto';
import { ActivatedRoute } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public favicon?: string;
  public icon = {
    exclamationCircle: faExclamationCircle
  };

  public searchForm = this.formBuilder.group({
    query: ['', [Validators.required]]
  }, {
    updateOn: 'submit'
  });

  private user: UserDto;

  constructor(
    private formBuilder: FormBuilder,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {
    this.user = this.route.snapshot.parent?.data.user;
  }

  ngOnInit(): void {
    this.playerService.messageEvents.subscribe(event => {
      this.searchForm.controls.query.setErrors({ custom: event });
    });
  }

  setFavicon(url: string): void {
    if(url == '' || url == null) {
      delete this.favicon;
      return;
    }

    if (RegExp(urlPattern).test(url)) {
      this.favicon = `https://www.google.com/s2/favicons?sz=32&domain_url=${ url }`;
    } else {
      this.favicon = `https://www.google.com/s2/favicons?sz=32&domain_url=https://youtube.com`;
    }
  }

  search(): void {
    if (this.searchForm.invalid) {
      console.log(this.searchForm.controls.query.errors);
      return;
    }

    let query = this.searchForm.controls.query.value;

    if (!RegExp(urlPattern).test(query)) {
      query = `ytsearch:${query}`
    }

    this.searchUrl(query);
    this.searchForm.controls.query.setValue('');
  }

  searchUrl(query: string): void {
    this.playerService.requestQueueTrack(query, this.user.discord).catch(() => {
      this.searchForm.controls.query.setErrors({ requestError: true });
    });
  }
}
