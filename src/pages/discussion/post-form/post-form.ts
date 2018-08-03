import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {HttpServiceProvider} from "../../../providers/http-service/http-service";

@Component({
  selector: 'page-post-form',
  templateUrl: 'post-form.html',
})
export class PostFormPage {
  public discussionId;
  public post = {
    postParent: "",
    subject: "",
    userid: "",
    message: ""
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              private auth: AuthProvider,
              public http: HttpServiceProvider) {
    this.discussionId = this.navParams.get('discussionId');
    this.post.subject = 'Re: ' + this.navParams.get('discussionSubject');
    this.post.postParent = this.navParams.get('postParent');
    this.auth.getID().then(id => {this.post.userid = id});
  }

  register() {
    if(this.post.message.length === 0) {
      const alert = this.alertCtrl.create({
        title: 'Empty Fields!',
        subTitle: 'Complete all fields!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.http.post(`discussion/${this.discussionId}`, this.post).subscribe(() => {
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
      }, error => {
        const alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: 'Some error has occurred!',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.dismiss();
            }
          }]
        });
        alert.present();
        console.log('error', error);
      })
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
