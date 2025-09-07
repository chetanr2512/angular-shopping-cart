import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
cartItemCount: Observable<number>;
  isMobileMenuOpen = false;

  constructor(private cartService: CartService) {
    this.cartItemCount = this.cartService.getCartItemCount$();
  }

  ngOnInit(): void {
    // Component initialization if needed
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
