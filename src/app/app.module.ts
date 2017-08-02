import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AddContactPage} from "../pages/add-contact/add-contact";
import { Geolocation } from '@ionic-native/geolocation';
import {NativeGeocoder} from "@ionic-native/native-geocoder";
import {SQLite} from "@ionic-native/sqlite";
import { RestapiService } from '../providers/restapi-service/restapi-service';
import {Http, HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AddContactPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AddContactPage
  ],
  providers: [
    // Http,
    Geolocation,
    NativeGeocoder,
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestapiService
  ]
})
export class AppModule {}
