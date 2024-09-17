// connectivity.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private onlineStatusSubject = new BehaviorSubject<boolean>(this.getInitialStatus());
  public onlineStatus$ = this.onlineStatusSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.updateOnlineStatus.bind(this));
      window.addEventListener('offline', this.updateOnlineStatus.bind(this));
    }
  }

  private getInitialStatus(): boolean {
    return typeof navigator !== 'undefined' && navigator.onLine;
  }

  private updateOnlineStatus() {
    this.onlineStatusSubject.next(navigator.onLine);
  }
}
