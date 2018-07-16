import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private credential: Object = {
    username: 'jorge',
    password: 'aA123456789*'
  };

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,
              public loadingCtrl: LoadingController,
              public storage: Storage) { }

  ionViewWillEnter() {
    this.authProvider.userIsLogged().then(logged => {
      if(logged) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  login() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.authProvider.login(this.credential).then(data => {
      loader.dismissAll();
      if(data) {
        // setTimeout(() => {this.navCtrl.setRoot(TabsPage);}, 2000);
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

}
