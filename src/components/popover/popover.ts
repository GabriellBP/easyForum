import { Component } from '@angular/core';
import {ModalController, NavParams} from "ionic-angular";
import {PostFormPage} from "../../pages/discussion/post-form/post-form";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  private discussionId;
  private discussionSubject;
  private postParent;

  constructor(private navParams: NavParams,
              public modalCtrl: ModalController,) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.discussionId = this.navParams.data.discussionId;
      this.discussionSubject = this.navParams.data.discussionSubject;
      this.postParent = this.navParams.data.postParent;
    }
  }

  newAnswer() {
    const modal = this.modalCtrl.create(PostFormPage, {
      'discussionId': this.discussionId,
      'discussionSubject': this.discussionSubject,
      'postParent': this.postParent,
    });
    modal.present();
  }

}
