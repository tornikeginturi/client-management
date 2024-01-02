import { HttpHeaders } from '@angular/common/http';

export interface HttpErrorResponse {
  error: any;
  status?: number;
  statusText?: string;
  url?: string;
  headers: HttpHeaders;
  ok: boolean;
  message: string;
}
