import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndexDto } from 'src/app/auth/connect/index-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  async checkForExistingUrl(): Promise<boolean> {
    try {
      await this.http.get<IndexDto>('').toPromise();
      return true;
    } catch (e) {
      return false;
    }
  }
}
