import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

@Injectable({
  providedIn: 'root',
})
export class AppNotificationService {
  constructor(private notificationService: NotificationService) {}

  notify(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      content: message,
      cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'top' },
      type: { style: type, icon: true },
    });
  }
}
