import { Component } from '@angular/core';
import {AlertController, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';

import { DiscussionPage } from '../discussion/discussion';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {DiscussionFormPage} from "./discussion-form/discussion-form";

@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {
  public forum: any;
  private courseId: number;
  private forumId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public http: HttpServiceProvider) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    this.forumId = this.navParams.get('forumId');
    this.courseId = this.navParams.get('courseId');

    this.http.get('forum', this.forumId)
      .subscribe(data => {
        this.forum = data;
        loader.dismissAll();
        if(this.forum.discussions.length === 0) {
          const alert = this.alertCtrl.create({
            title: 'Discussion!',
            subTitle: 'No discussions to show!',
            buttons: [{
              text: 'OK'
              // handler: () => {
              //   this.navCtrl.pop();
              // }
            }]
          });
          alert.present();
        }
      }, error => {
        console.log('error', error);
      });
  }

  goToDiscussion(discussionId) {
    this.navCtrl.push(DiscussionPage,
      {
        'discussionId': discussionId,
      });
  }

  newDiscussion() {
    const modal = this.modalCtrl.create(DiscussionFormPage, {
      'courseId': this.courseId,
      'forumId': this.forumId,

    });
    modal.present();
  }
}
