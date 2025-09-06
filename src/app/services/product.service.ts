import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { Product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private http: HttpClient) { }


  private apiUrl = "https://fakestoreapi.com/products";

    private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public products = this.productsSubject.asObservable();
  public loading = this.loadingSubject.asObservable();
  public error = this.errorSubject.asObservable();

 getProducts(): Observable<Product[]>{
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

  return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => {
        this.productsSubject.next(products);
        this.loadingSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        console.warn('API failed, using fallback data:', error.message);
        this.loadingSubject.next(false);
        this.errorSubject.next('Using offline data due to network issues');
          return of([]); 
      })
    );;
 }



   
  searchProducts(query: string): Observable<Product[]> {
    return this.products.pipe(
      map(products => {
        if (!query.trim()) {
          return products;
        }

        const searchTerm = query.toLowerCase().trim();
        return products.filter(product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
      })
    );
  }

  
}
