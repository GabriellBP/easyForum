import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ForumPage } from '../pages/forum/forum';
import { DiscussionPage } from '../pages/discussion/discussion';
import { DiscussionFormPage } from "../pages/forum/discussion-form/discussion-form";
import { PostFormPage } from "../pages/discussion/post-form/post-form";
import { AnswerPage } from '../pages/answer/answer';

import { ExpandableComponent } from '../components/expandable/expandable';
import { PopoverComponent } from '../components/popover/popover';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ForumPage,
    DiscussionPage,
    DiscussionFormPage,
    PostFormPage,
    AnswerPage,
    ExpandableComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot({name: '__easyforumdb'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ForumPage,
    DiscussionPage,
    DiscussionFormPage,
    PostFormPage,
    AnswerPage,
    ExpandableComponent,
    PopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    HttpServiceProvider
  ]
})
export class AppModule {}
