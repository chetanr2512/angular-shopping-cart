import { Component, OnInit } from '@angular/core';
import { combineLatest, debounceTime, distinctUntilChanged, Observable, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  products: Observable<Product[]>;
  filteredProducts: Observable<Product[]>;
  loading: Observable<boolean>;
  error: Observable<string | null>;

  searchTerm = '';
  isAdding: number | null = null;
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService){
    this.products = this.productService.products;
     this.loading = this.productService.loading;
    this.error = this.productService.error;
    
    this.filteredProducts = combineLatest([
      this.products,
      this.searchSubject.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      switchMap(([products, searchTerm]) => {
        if (!searchTerm.trim()) {
          return [products];
        }
        return this.productService.searchProducts(searchTerm);
      })
    );


  }

  ngOnInit(): void {
       this.productService.getProducts().pipe(
        takeUntil(this.destroy$)
    ).subscribe();
  }  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



   onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
  }

  addToCart(product: Product): void {
    if (this.isAdding) return;

    this.isAdding = product.id;

    // Add to cart with visual feedback
    // this.cartService.addToCart(product);

    // Simulate loading state
    setTimeout(() => {
      this.isAdding = null;
    }, 500);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2E0YWYiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}
