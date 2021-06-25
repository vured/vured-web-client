import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlPattern } from 'src/app/auth/connect/connect.component';
import { PlayerService } from 'src/app/layout/player/player.service';
import { UserDto } from 'src/app/user/user-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public favicon?: string;
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
  }

  setFavicon(url: string): void {
    if (RegExp(urlPattern).test(url)) {
      this.favicon = `https://www.google.com/s2/favicons?sz=32&domain_url=${ url }`;
    } else {
      delete this.favicon;
    }
  }

  search(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const query = this.searchForm.controls.query.value;

    if (RegExp(urlPattern).test(query)) {
      this.searchUrl(query);
    } else {
      this.searchYouTube(query);
    }

    this.searchForm.controls.query.setValue('');
  }

  searchUrl(query: string): void {
    this.playerService.requestQueueTrack(query, this.user.discord);
  }

  searchYouTube(query: string): void {
    console.log({ youtube: query });
  }
}
