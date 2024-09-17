import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from './currencies.model'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'http://127.0.0.1:8000/api/courses-sub-system/courses/app-currency';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.baseUrl);
  }

  addCurrency(Currency: Currency, headers?: HttpHeaders): Observable<Currency> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    return this.http.post<Currency>(this.baseUrl, Currency, { headers });
  }
  
  updateCurrency(Currency: Currency, headers?: HttpHeaders): Observable<Currency> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${Currency.id}`;
    return this.http.put<Currency>(url, Currency, { headers });
  }


  deleteCurrency(id: number, headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }

  deleteMultipleCurrencys(ids: number[], headers?: HttpHeaders): Observable<void> {
    if (!headers) {
        headers = new HttpHeaders(); // Default to an empty headers object if none is provided
    }
    const url = `${this.baseUrl}/delete`;
    return this.http.post<void>(url, { ids }, { headers });
  }

  getCurrencyById(id: number): Observable<Currency> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Currency>(url);
  }
}
