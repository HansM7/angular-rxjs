import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'https://rickandmortyapi.com/api/character/?page=1';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
