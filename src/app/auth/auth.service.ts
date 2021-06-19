import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { VerificationDto } from 'src/app/auth/connect/verification-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  checkForExistingUrl(): Observable<VerificationDto> {
    return this.http.get<VerificationDto>('/verification');
  }

  validateToken(): Observable<HttpResponse<Object>> {
    return this.http.get('/verification/authenticated', { observe: 'response' });
  }
}
