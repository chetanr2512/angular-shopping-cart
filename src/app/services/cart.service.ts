import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem, Product } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private  cartStorageKey = 'shopping_cart';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  public cartItems = this.cartItemsSubject.asObservable();
  public cartItemCount = this.cartItems.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );
  public cartTotal = this.cartItems.pipe(
    map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
  );
  cartItems$: any;

  constructor(private localStorageService: LocalStorageService) {
    this.loadCartFromStorage();
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

   loadCartFromStorage(): void {
    try {
      const savedCart = this.localStorageService.getItem<CartItem[]>(this.cartStorageKey);
      if (savedCart && Array.isArray(savedCart)) {
        this.cartItemsSubject.next(savedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      this.cartItemsSubject.next([]);
    }
  }

  private updateCart(items: CartItem[]): void {
     this.cartItemsSubject.next(items);
    this.saveCartToStorage(items);
  }
  

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.getCartItems();
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = quantity;
      this.updateCart(currentItems);
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      this.localStorageService.setItem(this.cartStorageKey, items);
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }

  addToCart(product: Product): void {
  const currentItems = this.getCartItems();
  const existingIndex = currentItems.findIndex(item => item.product.id === product.id);

  let updatedItems: CartItem[];

  if (existingIndex !== -1) {
    updatedItems = currentItems.map((item, index) =>
      index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    updatedItems = [...currentItems, { product, quantity: 1 }];
  }

  this.updateCart(updatedItems);
}


   removeFromCart(productId: number): void {
    const currentItems = this.getCartItems();
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.updateCart(updatedItems);
  }




  clearCart(): void {
    this.updateCart([]);
  }


  getCartItemCount$(): Observable<number> {
    return this.cartItemCount;
  }

  
  getCartTotal$(): Observable<number> {
    return this.cartTotal;
  }

  
  isProductInCart(productId: number): boolean {
    const currentItems = this.getCartItems();
    return currentItems.some(item => item.product.id === productId);
  }

  
  getProductQuantityInCart(productId: number): number {
    const currentItems = this.getCartItems();
    const item = currentItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }



 
  

}
