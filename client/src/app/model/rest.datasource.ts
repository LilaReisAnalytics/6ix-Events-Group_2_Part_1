import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event.model';
import { Order } from './order.model';
import { Cart } from './cart.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource
{
  user: User;
  baseUrl: string;
  authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };
  constructor(private http: HttpClient, private jwtService: JwtHelperService)
  {
    
    this.user = new User(); //verify
   this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`
    //this.baseUrl = `https://comp229-f2020-week10.herokuapp.com/api/`;
  }

  getEvents(): Observable<Event[]>
  {
    return this.http.get<Event[]>(this.baseUrl + 'event-list');
  }
  saveOrder(order: Order): Observable<Order>
  {
    console.log(JSON.stringify(order));
    return this.http.post<Order>(this.baseUrl + 'orders/add', order);
  }
  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  addEvent(event: Event): Observable<Event>
  {
    this.loadToken();
    return this.http.post<Event>(this.baseUrl + 'event-list/add', event, this.httpOptions);
  }

  updateEvent(event: Event): Observable<Event>
  {
    this.loadToken();
    return this.http.post<Event>(`${this.baseUrl}event-list/edit/${event._id}`, event, this.httpOptions);
  }

  deleteEvent(id: number): Observable<Event>
  {
    this.loadToken();

    console.log(id);

    return this.http.get<Event>(`${this.baseUrl}event-list/delete/${id}`, this.httpOptions);
  }

  getOrders(): Observable<Order[]>
  {
    this.loadToken();
    return this.http.get<Order[]>(this.baseUrl + 'orders');
  }

  deleteOrder(id: number): Observable<Order>
  {
    this.loadToken();
    return this.http.get<Order>(`${this.baseUrl}orders/delete/${id}`, this.httpOptions);
  }

  updateOrder(order: Order): Observable<Order>
  {
    this.loadToken();
    return this.http.post<Order>(`${this.baseUrl}orders/edit/${order._id}`, order, this.httpOptions);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}



