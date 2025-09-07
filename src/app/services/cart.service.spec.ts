import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartItem, Product } from '../models';
import { LocalStorageService } from './local-storage.service';

fdescribe('CartService', () => {
 let service: CartService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    description: 'Test Description',
    category: 'test',
    image: 'test-image.jpg',
    rating: { rate: 4.5, count: 100 }
  };

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem']);

    TestBed.configureTestingModule({
      providers: [
        CartService,
        { provide: LocalStorageService, useValue: localStorageSpy }
      ],

    });

    service = TestBed.inject(CartService);
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    // Arrange
    localStorageService.getItem.and.returnValue([]);
    localStorageService.setItem.and.returnValue(true);

    // Act
    service.addToCart(mockProduct);

    // Assert
    service.cartItems.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe(mockProduct.id);
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should increase quantity when adding existing item', fakeAsync(() => {
  const existingCartItem = { product: mockProduct, quantity: 1 };
  localStorageService.getItem.and.returnValue([existingCartItem]);
  localStorageService.setItem.and.returnValue(true);

  // Re-initialize to load mocked localStorage data
  service.loadCartFromStorage();

  // Add same product again
  service.addToCart(mockProduct);

  // Advance any async RxJS timers (if any)
  tick();

  // Subscribe and assert latest value synchronously
  let latestItems: CartItem[] = [];
  service.cartItems.subscribe(items => {
    latestItems = items;
  });

  expect(latestItems.length).toBe(1);
  expect(latestItems[0].quantity).toBe(2);
}));



  

  it('should remove item from cart', () => {
    // Arrange
    const cartItem = { product: mockProduct, quantity: 1 };
    localStorageService.getItem.and.returnValue([cartItem]);
    localStorageService.setItem.and.returnValue(true);

    // Act
    service.removeFromCart(mockProduct.id);

    // Assert
    service.cartItems.subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate total correctly', (done) => {
  const product2: Product = { ...mockProduct, id: 2, price: 19.99 };
  const cartItems = [
    { product: mockProduct, quantity: 2 }, // 59.98
    { product: product2, quantity: 1 }     // 19.99
  ];
  localStorageService.getItem.and.returnValue(cartItems);

  // Force load from localStorage
  service.loadCartFromStorage();

  service.getCartTotal$().subscribe(total => {
    try {
      expect(total).toBeCloseTo(79.97, 2);
      done();
    } catch (err) {
      if (err instanceof Error) {
        done.fail(err);
      } else if (typeof err === 'string') {
        done.fail(err);
      } else {
        done.fail('Unknown error');
      }

    }
  });
});

});
