import { Component } from '@angular/core';
import {AlertController, Events, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HttpServiceProvider} from "../../providers/http-service/http-service";


@Component({
  selector: 'page-discussion-form',
  templateUrl: 'discussion-form.html',
})
export class DiscussionFormPage {
  public forumId;
  public discussion = {
    course: "",
    title: "",
    userid: "",
    message: ""
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private auth: AuthProvider,
              public http: HttpServiceProvider,
              public event: Events) {
    this.discussion.course = this.navParams.get('courseId');
    this.forumId = this.navParams.get('forumId');
    this.auth.getID().then(id => {this.discussion.userid = id});
  }

  register() {
    if(this.discussion.title.length === 0 || this.discussion.message.length === 0) {
      const alert = this.alertCtrl.create({
        title: 'Empty Fields!',
        subTitle: 'Complete all fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.http.post(`forum/${this.forumId}`, this.discussion).subscribe(() => {
        const alert = this.alertCtrl.create({
          title: 'Successful!',
          subTitle: 'Successfully inserted discussion!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.dismiss();
            }
          }]
        });
        alert.present();
        this.event.publish('discussionUpdate');
      }, error => {
        console.log('error', error);
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
