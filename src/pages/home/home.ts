import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import {ForumPage} from "../forum/forum";
import {AuthProvider} from "../../providers/auth/auth";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public courses: any;
  public items: Array<{expanded: boolean, icon: string, height: number}> = [];
  public itemExpandHeight: number = 45;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public http: HttpServiceProvider,
              public authProvider: AuthProvider) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.authProvider.getID().then(idUser => {
      this.http.get('courses', idUser)
        .subscribe(data => {
          this.courses = data;
          let qtdItems = this.courses.length;
          for(let i = 0; i < qtdItems; i++) {
            let length = this.itemExpandHeight * this.courses[i].forum.length;
            this.items.push({'expanded': false, 'icon': 'arrow-dropdown', 'height': length});
          }
          loader.dismissAll();
        }, error => {
          console.log('error', error);
        });
    }).catch(error => {
      console.log('erro', error);
    });
  }

  expandItem(item) {
    this.items.map((listItem) => {

      if(item == listItem){
        listItem.expanded = !listItem.expanded;
        listItem.expanded ? listItem.icon = 'arrow-dropup' : listItem.icon = 'arrow-dropdown';
      } else {
        listItem.expanded = false;
        listItem.icon = 'arrow-dropdown';
      }

      return listItem;

    });
  }

  goToForum(forumId, courseId) {
    this.navCtrl.push(ForumPage,
      {
        'forumId': forumId,
        'courseId': courseId
      });
  }

}
