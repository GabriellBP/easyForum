import { Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items: any = [];
  itemExpandHeight: number = 100;

  constructor(public navCtrl: NavController) {

    this.items = [
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'},
      {expanded: false, icon: 'arrow-dropdown'}
    ];

  }

  expandItem(item){
    this.items.map((listItem) => {

      if(item == listItem){
        listItem.expanded = !listItem.expanded;
        listItem.expanded ? listItem.icon = 'arrow-dropup' : listItem.icon = 'arrow-dropdown';
      } else {
        listItem.expanded = false;
        listItem.icon = 'arrow-dropdown';
      }

      return listItem;

    });

  }
}
