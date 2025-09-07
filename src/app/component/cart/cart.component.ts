import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from 'src/app/models';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Observable<CartItem[]>;
  cartItemCount: Observable<number>;
  cartTotal: Observable<number>;
  private destroy = new Subject<void>();

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.cartItems;
    this.cartItemCount = this.cartService.cartItemCount;
    this.cartTotal = this.cartService.cartTotal;
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  increaseQuantity(productId: number): void {
    const currentQuantity = this.cartService.getProductQuantityInCart(productId);
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: number): void {
    const currentQuantity = this.cartService.getProductQuantityInCart(productId);
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    }
  }

  onQuantityChange(productId: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const quantity = parseInt(target.value, 10);

    if (quantity && quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      // Reset to current quantity if invalid input
      target.value = this.cartService.getProductQuantityInCart(productId).toString();
    }
  }

  removeItem(productId: number): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      this.cartService.clearCart();
    }
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI0MCIgeT0iNDAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2E0YWYiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  }

  trackByCartItem(index: number, item: CartItem): number {
    return item.product.id;
  }
}
