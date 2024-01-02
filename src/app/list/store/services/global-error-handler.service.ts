import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '../types/interfaces/httpErrorResponse.interface';
import { getClientErrorMessage, getHttpErrorMessage } from './error.service';
import { AppNotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private notificationService: AppNotificationService) {}

  handleError(error: Error | HttpErrorResponse): void {
    let errorMessage;

    if (error instanceof Error) {
      errorMessage = getClientErrorMessage(error);
    } else {
      errorMessage = getHttpErrorMessage(error);
    }

    this.notificationService.notify(errorMessage as any, 'error');
  }
}
