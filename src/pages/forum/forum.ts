import { Component } from '@angular/core';
import {AlertController, Events, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';

import { DiscussionPage } from '../discussion/discussion';
import {DiscussionFormPage} from "../discussion-form/discussion-form";
import {HttpServiceProvider} from "../../providers/http-service/http-service";

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
              public http: HttpServiceProvider,
              public event: Events) {
    this.forumId = this.navParams.get('forumId');
    this.courseId = this.navParams.get('courseId');

    this.getForum();
  }

  ionViewDidLoad() {
    this.event.subscribe('discussionUpdate', () => {
      this.getForum();
    });
  }

  getForum() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    const alertError = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Something is wrong! Try again later.',
      buttons: ['OK']
    });
    loader.present().then(() => {
      this.http.get('forum', this.forumId)
        .subscribe(data => {
          this.forum = data;
          this.forum.intro = this.forum.intro.replace('<p>', '');
          this.forum.intro = this.forum.intro.replace('</p>', '');
          // mystring = mystring.split('/r').join('/')
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
          loader.dismissAll();
          alertError.present();
          console.log('error', error);
        });
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
