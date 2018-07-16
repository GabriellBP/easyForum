import { Component } from '@angular/core';
import {NavController} from "ionic-angular";

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import {LoginPage} from "../login/login";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private token;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(private authProvider: AuthProvider,
              public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.authProvider.getToken().then(token => {
      this.token = token;
      this.authProvider.setUserStorage(this.token).then(confirm => {
        if(!confirm) {
          this.authProvider.logout();
          this.navCtrl.setRoot(LoginPage);
        }
      });
    })
  }

}
