import {Component} from '@angular/core';
import {Events, LoadingController, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PostFormPage} from "../post-form/post-form";
import {PopoverComponent} from "../../components/popover/popover";
import {AnswerPage} from "../answer/answer";

@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  private discussionId: number;
  public discussion: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              public http: HttpServiceProvider,
              public event: Events) {
    this.discussionId = this.navParams.get('discussionId');

    this.getDiscussion();
  }

  ionViewDidLoad() {
    this.event.subscribe('postUpdate', () => {
      this.getDiscussion();
    });
  }

  getDiscussion() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loader.present().then(() => {
      this.http.get('discussion', this.discussionId)
        .subscribe(data => {
          this.discussion = data;
          loader.dismissAll();
        }, error => {
          console.log('error', error);
        });
    });
  }

  presentPopover(ev, post) {
    let popover = this.popoverCtrl.create(PopoverComponent, {
      'discussionId': this.discussion.id,
      'discussionSubject': post.username.firstname,
      'postParent': post.id,
    });
    popover.present({
      ev: ev
    });
  }

  newPost() {
    const modal = this.modalCtrl.create(PostFormPage, {
      'discussionId': this.discussion.id,
      'discussionSubject': this.discussion.name,
      'postParent': this.discussion.firstpost,
    });
    modal.present();
  }

  getAnswer(post) {
    this.navCtrl.push(AnswerPage, {
      'post': post,
      'discussionId': this.discussion.id
    });
  }
}
