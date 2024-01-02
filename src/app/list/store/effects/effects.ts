import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  concatMap,
  filter,
  forkJoin,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ApiActions, ListPageActions } from '../actions';
import { ClientService } from '../services';
import { AppNotificationService } from '../services/notification.service';

@Injectable()
export class Effects {
  filterChanged$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ListPageActions.filterChanged),
        tap(({ payload }) => {
          this.router.navigate(['/list'], {
            queryParams: {
              ...payload,
            },
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  add$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ListPageActions.addNewClientClicked),
        tap(({ payload }) => {
          console.log(payload);
          this.router.navigate(['/list'], {
            queryParams: {
              id: payload,
            },
          });
        })
      );
    },
    { dispatch: false }
  );
  selectedClientChanged$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ListPageActions.selectedClientChanged),
        tap(({ payload }) => {
          console.log(payload);
          this.router.navigate(['/list'], {
            queryParams: {
              id: payload,
            },
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  changeSelectedIdAfterAddNewClient$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ApiActions.saveSuccess),
        tap(({ data }) => {
          this.router.navigate(['/list'], {
            queryParams: {
              id: data.id,
            },
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  closeDrawerClicked$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ListPageActions.closeDrawerClicked),
        tap(({}) => {
          this.router.navigate(['/list'], {
            queryParams: {
              id: null,
            },
            queryParamsHandling: 'merge',
          });
        })
      );
    },
    { dispatch: false }
  );

  clientSelected$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.clientSelected),
      filter(({ payload }) => payload.id !== 0),
      concatMap(({ payload }) => {
        return this.service.findOne(payload).pipe(
          switchMap((clients) => {
            // Assuming you can extract the ID from the first API call result
            // Make the second API call using the extracted ID
            return this.service.accounts(payload.id).pipe(
              map((accounts) => {
                // Assuming you want to return both responses
                return ApiActions.findOneSuccess({
                  accounts: accounts,
                  data: clients,
                });
              }),
              catchError((findOneError) => {
                return throwError(findOneError);
              })
            );
          }),
          catchError((accountFindError) => {
            return throwError(accountFindError);
          })
        );
      })
    );
  });

  updateClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.formSubmitted),
      filter(({ payload }) => {
        return !!payload.id;
      }),

      concatMap(({ payload }) => {
        console.log(payload);
        return this.service.update(payload).pipe(
          map((clients) => {
            return ApiActions.saveSuccess({ data: clients });
          }),
          tap(() => {
            this.appNotificationService.notify(
              'Client updated successfully',
              'success'
            );
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });

  addClient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.formSubmitted),
      filter(({ payload }) => {
        return !payload.id;
      }),

      concatMap(({ payload }) => {
        console.log(payload);
        return this.service.add(payload).pipe(
          map((clients) => {
            return ApiActions.saveSuccess({ data: clients });
          }),
          tap(() => {
            this.appNotificationService.notify(
              'Client added successfully',
              'success'
            );
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });

  loadInitialData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.initialDataLoaded),

      concatMap(() => {
        return forkJoin([
          this.service.genders(),
          this.service.accountTypes(),
          this.service.accountStatuses(),
          this.service.currencies(),
          this.service.cities(),
          this.service.countries(),
        ]).pipe(
          map(
            ([
              genders,
              accountTypes,
              accountStatuses,
              currencies,
              cities,
              countries,
            ]) => {
              return ApiActions.initialDataLoadedSuccess({
                genders: genders,
                accountTypes: accountTypes,
                accountStatuses: accountStatuses,
                currencies: currencies,
                cities: cities,
                countries: countries,
              });
            }
          ),

          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });

  requestClientsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.requestClientsData),
      concatMap(({ payload }) => {
        return this.service.find(payload).pipe(
          map((clients) => {
            return ApiActions.findSuccess({
              data: clients.data,
              total: clients.total,
            });
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });
  removeClientClicked$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.removeClientClicked),
      concatMap(({ payload }) => {
        return this.service.remove(payload).pipe(
          map(() => {
            return ApiActions.removeSuccess({ id: payload });
          }),
          tap(() => {
            this.appNotificationService.notify(
              'Client removed successfully',
              'success'
            );
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });

  addAccountClick$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.addAccountClicked),
      concatMap(({ payload }) => {
        return this.service.addAccount(payload).pipe(
          map((account) => {
            return ApiActions.addAccountSuccess({ account });
          }),
          tap(() => {
            this.appNotificationService.notify(
              'Account added successfully',
              'success'
            );
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });

  closeAccountClick$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListPageActions.closeAccountClicked),
      concatMap(({ payload }) => {
        return this.service.closeAccount(payload).pipe(
          map((account) => {
            return ApiActions.closeAccountSuccess({ account });
          }),
          tap(() => {
            this.appNotificationService.notify(
              'Account updated successfully',
              'success'
            );
          }),
          catchError((httpErrorResponse) => {
            return throwError(httpErrorResponse);
          })
        );
      })
    );
  });
  constructor(
    private service: ClientService,
    private router: Router,
    private actions$: Actions,
    private store: Store,
    private appNotificationService: AppNotificationService
  ) {}
}
