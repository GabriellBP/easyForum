import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { DiscussionPage } from '../discussion/discussion';

@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {
  public forum: any;
  public discussions: string[];
  public items: Array<{expanded: boolean, icon: string}> = [];
  // public itemExpandHeight: string = 'auto';
  public itemExpandHeight: number = 100;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient) {
    this.forum = this.navParams.get('forum');
    this.discussions = this.forum.discussions;

    let qtdItems;
    qtdItems = this.discussions.length;

    for(let i = 0; i < qtdItems; i++) {
      this.items.push({'expanded': false, 'icon': 'arrow-dropdown'});
    }

    if(this.forum.description.length > 150) {
      this.itemExpandHeight = 200;
    }
  }

  expandItem(item) {
    this.items.map((listItem) => {

      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
        listItem.expanded ? listItem.icon = 'arrow-dropup' : listItem.icon = 'arrow-dropdown';
      } else {
        listItem.expanded = false;
        listItem.icon = 'arrow-dropdown';
      }

      return listItem;

    });
  }

  goToDiscussion(discussion) {
    this.navCtrl.push(DiscussionPage,
      {
        'discussion': discussion,
        'description': this.forum.description
      });
  }

}
