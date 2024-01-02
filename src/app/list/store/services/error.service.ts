import { pick } from 'lodash';
import { HttpErrorResponse } from '../types/interfaces/httpErrorResponse.interface';

export function getHttpErrorMessage(
  httpErrorResponse: HttpErrorResponse
): string | string[] {
  if (httpErrorResponse == null) {
    return null;
  }

  let httpErrorMessage;

  if (Array.isArray(httpErrorResponse.error?.message)) {
    httpErrorMessage = httpErrorResponse.error?.message.join();
  } else if (typeof httpErrorResponse.error?.message === 'string') {
    httpErrorMessage = httpErrorResponse.error?.message;
  } else if (httpErrorResponse.statusText) {
    httpErrorMessage = httpErrorResponse?.statusText;
  } else {
    httpErrorMessage = 'Unknown error';
  }

  return httpErrorMessage;
}

export function getClientErrorMessage(clientErrorResponse: Error): string {
  if (clientErrorResponse == null) {
    return null;
  }

  return clientErrorResponse.message
    ? clientErrorResponse.message
    : 'Unknown error';
}

export function getClientErrorStack(clientErrorResponse: Error): string {
  if (clientErrorResponse == null) {
    return null;
  }

  return clientErrorResponse.stack;
}

export function getHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
  const errorResponse = pick(httpErrorResponse, [
    'error',
    'message',
    'status',
    'statusText',
    'url',
    'ok',
    'headers',
  ]);

  console.log(errorResponse);

  return errorResponse;
}
