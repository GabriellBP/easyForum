import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DiscussionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  public discussion: any;
  public description: string;
  public answers: Array<{'author': string, 'answer': string, 'answers': Array<{'author': string, 'answer': string}>}> = [];
  // public showButtonAnswers: Boolean[] = [];
  // public buttonAnswers: {'text': string, 'icon': string}[] = [];
  // public showAnswers: Boolean[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.discussion = this.navParams.get('discussion');
    this.description = this.navParams.get('description');

    //--------------------------------------------------------
    this.answers.push({
      "author": "Gabriel",
      "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
      "Pellentesque commodo massa sit amet odio posuere, eu ornare turpis facilisis. In ut ornare odio. Nullam nec placerat nulla, pharetra vestibulum elit. Proin nisl arcu, egestas in enim et, ultricies lobortis eros. Vestibulum lacinia urna at augue elementum condimentum. " +
      "Praesent magna nisl, luctus nec nibh eget, euismod consequat ligula. Mauris imperdiet mollis lectus, eget ullamcorper dolor elementum eget. ",
      "answers": [
        {
        "author": "Jorge",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        },
        {
          "author": "Karol",
          "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque commodo massa sit amet odio posuere, eu ornare turpis facilisis. In ut ornare odio. Nullam nec placerat nulla, pharetra vestibulum elit. Proin nisl arcu, egestas in enim et, ultricies lobortis eros. Vestibulum lacinia urna at augue elementum condimentum. " +
          "Praesent magna nisl, luctus nec nibh eget, euismod consequat ligula. Mauris imperdiet mollis lectus, eget ullamcorper dolor elementum eget. "
        }]
    });
    this.answers.push({
      "author": "Gabriel",
      "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
      "Pellentesque commodo massa sit amet odio posuere, eu ornare turpis facilisis. In ut ornare odio. Nullam nec placerat nulla, pharetra vestibulum elit. Proin nisl arcu, egestas in enim et, ultricies lobortis eros. Vestibulum lacinia urna at augue elementum condimentum. " +
      "Praesent magna nisl, luctus nec nibh eget, euismod consequat ligula. Mauris imperdiet mollis lectus, eget ullamcorper dolor elementum eget. ",
      "answers": [
        {
          "author": "Karol",
          "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
          "Pellentesque commodo massa sit amet odio posuere, eu ornare turpis facilisis. In ut ornare odio. Nullam nec placerat nulla, pharetra vestibulum elit. Proin nisl arcu, egestas in enim et, ultricies lobortis eros. Vestibulum lacinia urna at augue elementum condimentum. " +
          "Praesent magna nisl, luctus nec nibh eget, euismod consequat ligula. Mauris imperdiet mollis lectus, eget ullamcorper dolor elementum eget. "
        }]
    });
    this.answers.push({
      "author": "Marvel",
      "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
      "Pellentesque commodo massa sit amet odio posuere, eu ornare turpis facilisis. In ut ornare odio. Nullam nec placerat nulla, pharetra vestibulum elit. Proin nisl arcu, egestas in enim et, ultricies lobortis eros. Vestibulum lacinia urna at augue elementum condimentum. " +
      "Praesent magna nisl, luctus nec nibh eget, euismod consequat ligula. Mauris imperdiet mollis lectus, eget ullamcorper dolor elementum eget. ",
      "answers": [
        {
        "author": "Jorge",
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
        }]
    });
    //--------------------------------------------------------
    // for(let i in this.answers) {
    //   this.showButtonAnswers.push(false);
    //   this.buttonAnswers.push({'text': 'Show Answers', 'icon': 'arrow-dropdown'});
    //   this.showAnswers.push(false);
    //   if (this.answers[i].answers.length > 1)
    //     this.showButtonAnswers[i] = true;
    // }
  }

  // show(idx) {
  //   this.showAnswers[idx] = !this.showAnswers[idx];
  //   if(!this.showAnswers[idx]) {
  //     this.buttonAnswers[idx] = {'text': 'Show Answers', 'icon': 'arrow-dropdown'};
  //   } else {
  //     this.buttonAnswers[idx] = {'text': 'Hide Answers', 'icon': 'arrow-dropup'};
  //   }
  // }

}
