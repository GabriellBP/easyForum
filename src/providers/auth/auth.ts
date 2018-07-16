import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import { HttpServiceProvider } from '../http-service/http-service';
import {UserModel} from "../../models/user/user";

@Injectable()
export class AuthProvider {

  constructor(public http: HttpServiceProvider,
              private storage: Storage,
              public alertCtrl: AlertController) { }

  login(credentials) {
    let urlData: string = `login/token.php?username=${credentials.username}&password=${credentials.password}&service=moodle_easyForum_app`;

    return new Promise(resolve => {
      this.http.getMoodle(urlData).subscribe(data => {
        let obj: any = data;
        if(obj.error) {
          let msg = obj.error;
          const alert = this.alertCtrl.create({
            title: msg,
            buttons: ['OK']
          });
          alert.present();
          resolve(false);
        } else if(obj.token) {
          let token = obj.token;
          this.storage.set('token', token);
          resolve(token);
        }
      }, error => {
        const alert = this.alertCtrl.create({
          title: 'Erro no servidor, tente mais tarde!',
          buttons: ['OK']
        });
        alert.present();
        resolve(false);
      });
    });
  }

  userIsLogged() {
    return this.storage.get('token').then(token => {
      return !!token;
    });
  }

  setUserStorage(token) {
    let urlData: string = `webservice/rest/server.php?wstoken=${token}&wsfunction=core_webservice_get_site_info&moodlewsrestformat=json`;

    return new Promise (resolve => {
      this.http.getMoodle(urlData).subscribe(data => {
        let obj: any = data;
        let user: UserModel = {
          'id': obj.userid,
          'firstname': obj.firstname,
          'lastname': obj.lastname,
          'fullname': obj.fullname,
          'lang': obj.lang,
          'userpictureurl': obj.userpictureurl
        };

        this.storage.set('user', user);

        return true;
      }, error => {
        return false
      })
    });
  }

  getID() {
    return this.storage.get('user').then(user => {
      if(user) {
        return user.id;
      } else {
        return false;
      }
    });
  }

  getToken() {
    return this.storage.get('token').then(token => {
      if(token) {
        return token;
      } else {
        return false;
      }
    });
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('user');
  }

}
