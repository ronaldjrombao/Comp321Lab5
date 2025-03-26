import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WebSocketService } from './web-socket.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  priority: string;
  approvedBy: string;
}

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page-component.component.html',
  styleUrl: './home-page-component.component.css',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CurrencyPipe,
    MatTableModule,
    DatePipe,
    CommonModule
  ],
})
export class HomePageComponentComponent implements OnInit {
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private subscription: Subscription | undefined;
  private ordersSubscription: Subscription | undefined;

  displayedColumns: string[] = [
    'orderId',
    'customerName',
    'orderDate',
    'totalAmount',
    'priority',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  selectedOrder: Order | null = null;

  constructor(private readonly wsService: WebSocketService) {}

  ngOnInit(): void {
    this.subscription = this.wsService.getMessages().subscribe((msg) => {
      console.log(msg);
      this.ordersSubject.next([...this.ordersSubject.value, msg]);
    });

    this.ordersSubscription = this.ordersSubject.subscribe((orders) => {
      this.dataSource.data = orders;
    });
  }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onSelectOrder(order: Order): void {
    this.selectedOrder = order;
  }
}
