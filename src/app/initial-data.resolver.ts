/* eslint-disable ngrx/avoid-dispatching-multiple-actions-sequentially */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { ListPageActions } from './list/store/actions';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver {
  /**
   * Constructor
   */
  constructor(private store: Store) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Use this resolver to resolve initial mock-api for the application
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(ListPageActions.initialDataLoaded());
  }
}
