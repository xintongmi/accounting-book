import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SpendingItem } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class SpendingItemService {

  private baseUrl = 'http://localhost:8080/api/spendingItems';

  constructor(private httpClient: HttpClient) { }

  getSpendingItemList(): Observable<SpendingItem[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.spendingItems)
    );
  }
}

interface GetResponse {
  _embedded : {
    spendingItems: SpendingItem[];
  }
}
