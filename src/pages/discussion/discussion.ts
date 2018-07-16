import { Component } from '@angular/core';
import {LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PostFormPage} from "./post-form/post-form";

@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  public discussion: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public http: HttpServiceProvider) {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present();
    let discussionId = this.navParams.get('discussionId');

    this.http.get('discussion', discussionId)
      .subscribe(data => {
        this.discussion = data;
        loader.dismissAll();
      }, error => {
        console.log('error', error);
      });
  }

  newAnswer() {
    const modal = this.modalCtrl.create(PostFormPage, {
      'discussionId': this.discussion.id,
      'discussionSubject': this.discussion.name,
      'discussionFirstPost': this.discussion.firstpost,
    });
    modal.present();
  }
}
