import { Component } from '@angular/core';
import {Events, LoadingController, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PostFormPage} from "../post-form/post-form";
import {PopoverComponent} from "../../components/popover/popover";

@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage {
  private discussionId: number;
  public post: any;
  public answers: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              public http: HttpServiceProvider,
              public event: Events) {

    this.post = this.navParams.get('post');
    this.discussionId = this.navParams.get('discussionId');

    this.getAnswers();
  }

  ionViewDidLoad() {
    this.event.subscribe('postUpdate', () => {
      this.getAnswers();
    });
  }

  getAnswers() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present().then(() => {
      this.http.get('answer', this.post.id)
        .subscribe(data => {
          this.answers = data;
          loader.dismissAll();
          console.log(this.answers);
        }, error => {
          console.log('error', error);
        });
    });
  }

  presentPopover(ev, answer) {
    let popover = this.popoverCtrl.create(PopoverComponent, {
      'discussionId': this.discussionId,
      'discussionSubject': answer.username.firstname,
      'postParent': answer.id,
    });
    popover.present({
      ev: ev
    });
  }

  newPost() {
    const modal = this.modalCtrl.create(PostFormPage, {
      'discussionId': this.discussionId,
      'discussionSubject': this.post.subject,
      'postParent': this.post.id,
    });
    modal.present();
  }

  getAnswer(answer) {
    this.navCtrl.push(AnswerPage, {
      'post': answer,
      'discussionId': this.discussionId
    });
  }

}
