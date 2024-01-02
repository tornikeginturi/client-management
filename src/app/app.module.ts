import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import {
  DropDownListModule,
  DropDownsModule,
} from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { IconsModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { NotificationModule } from '@progress/kendo-angular-notification';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { AppComponent } from './app.component';
import { AddAccountFormComponent } from './list/components/add-account-form/add-account-form.component';
import { CardComponent } from './list/components/card/card.component';
import { ClientAccountInfoComponent } from './list/components/client-account-info/client-account-info.component';
import { ListPage } from './list/pages/list/list.page';
import { Effects } from './list/store/effects';
import { reducer } from './list/store/reducer/reducer';
import { GlobalErrorHandlerService } from './list/store/services/global-error-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    ListPage,
    CardComponent,
    ClientAccountInfoComponent,
    AddAccountFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    // Kendo UI
    LayoutModule,
    GridModule,
    DropDownListModule,
    DropDownsModule,
    InputsModule,
    LabelModule,
    IconsModule,
    NotificationModule,
    ButtonsModule,
    DialogModule,

    StoreDevtoolsModule.instrument({
      maxAge: 250, // Retains last 250 states
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),

    StoreModule.forRoot({ client: reducer }),
    EffectsModule.forRoot([Effects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
