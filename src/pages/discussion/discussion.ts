import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {
  AlertController,
  Events,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  PopoverController,
} from 'ionic-angular';
import {HttpServiceProvider} from "../../providers/http-service/http-service";
import {PostFormPage} from "../post-form/post-form";
// import {PopoverComponent} from "../../components/popover/popover";

@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html',
})
export class DiscussionPage {
  @ViewChild('head') header: any;
  @ViewChild('firstCard') firstCard: any;
  private headerNavHeight: number;
  private headerToolHeight: number;
  public item = {expanded: true, icon: 'md-arrow-dropup', text: 'Minimize', height: 'auto'};
  // public item: {expanded: boolean, icon: string, text: string, height: any};
  private discussionId: number;
  public discussionName: string;
  public mainPost: any;
  public discussion: any;
  private readonly isAnswer: boolean;

  public loader = this.loadingCtrl.create({
    content: "Please wait...",
  });
  public alertError = this.alertCtrl.create({
    title: 'Error!',
    subTitle: 'Something is wrong! Try again later.',
    buttons: ['OK']
  });


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public http: HttpServiceProvider,
              public event: Events,
              public renderer: Renderer2,
              public element: ElementRef) {
    this.discussionId = this.navParams.get('discussionId');
    this.mainPost = this.navParams.get('post');
    if (this.mainPost == undefined) {
      this.getDiscussion();
      this.isAnswer = false;
    } else {
      this.getAnswers();
      this.isAnswer = true;
      this.discussionName = this.mainPost.subject;
    }
    // this.item = {expanded: true, icon: 'md-arrow-dropup', text: 'Maximize', height: 'auto'};

    // const cardPosts = this.element.nativeElement.getElementsByClassName("card-posts");
    // const styles = getComputedStyle(this.element.nativeElement);
    // const styles = getComputedStyle(this.element.nativeElement);
    // console.log(this.element.nativeElement);
    // console.log(cardPosts);
    // console.log(styles);
  }

  ionViewDidLoad () {
    this.event.subscribe('postUpdate', () => {
      if (this.isAnswer)
        this.getAnswers();
      else
        this.getDiscussion();
    });
    //ngAfterViewInit

    // console.log(this.firstCard);
    // console.log(this.firstCard.nativeElement);
    // console.log(this.firstCard.nativeElement.clientHeight);
    // setTimeout(() => console.log(this.firstCard.nativeElement.clientHeight), 1500);
    // setTimeout(() => this.item.height = this.firstCard.nativeElement.clientHeight, 1500);
    // console.log(this.header.nativeElement.children);
    // console.log(this.header.nativeElement.children[1].children);
    // console.log(this.header.nativeElement.children[1].children[1].children);
    // console.log(this.header.nativeElement.children[1].children[1].children[0].clientHeight);
    // console.log(this.header.nativeElement.children[1].children[1].children[1].children[0].clientHeight);
    // console.log(this.header.nativeElement.children[1].children[1].children[1].children[1].clientHeight);
    // console.log(this.header.nativeElement.children[1].children[0].clientHeight);
    // console.log(this.header.nativeElement.children[1].children[1].clientHeight);
    // console.log(this.header.nativeElement.children[0].clientHeight);
    // console.log(this.header.nativeElement.children[1].clientHeight);
  }

  getDiscussion() {
    let discussion: any;
    this.loader.present().then(() => {
      this.http.get('discussion', this.discussionId)
        .subscribe(data => {
          discussion = data;
          this.discussion = {'posts': discussion.posts};
          this.mainPost =  discussion.firstpost;
          this.discussionName = discussion.name;
          this.loader.dismissAll();
        }, error => {
          this.loader.dismissAll();
          this.alertError.present();
          console.log('error', error);
        });
    });
  }

  getAnswers() {
    this.loader.present().then(() => {
      this.http.get('answer', this.mainPost.id)
        .subscribe(data => {
          this.discussion = {'posts': data};
          this.loader.dismissAll();
        }, error => {
          this.loader.dismissAll();
          this.alertError.present();
          console.log('error', error);
        });
    });
  }

  // presentPopover(ev, post) {
  //   let popover = this.popoverCtrl.create(PopoverComponent, {
  //     'discussionId': this.discussion.id,
  //     'discussionSubject': post.username.firstname,
  //     'postParent': post.id,
  //   });
  //   popover.present({
  //     ev: ev
  //   });
  // }

  expandFirstPost(header) {
    const scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    if (this.headerToolHeight == undefined || this.headerToolHeight == undefined) {
      this.headerNavHeight = this.header.nativeElement.children[0].clientHeight;
      this.headerToolHeight = this.header.nativeElement.children[1].clientHeight - this.firstCard.nativeElement.clientHeight;
    }
    // console.log(this.headerNavHeight);
    // console.log(this.headerToolHeight);
    // const headerNavHeight = 84;
    // const headerNavHeight = this.header.nativeElement.children[0].clientHeight;
    // const headerToolHeight = 99;
    // const headerToolHeight = this.header.nativeElement.children[1].clientHeight;
    // console.log("Aqui:", this.header.nativeElement.children[0].clientHeight);
    // console.log("Aqui2", this.header.nativeElement.children[1].clientHeight);
    // console.log("Aqui3", this.header.nativeElement.children[1].children[1].children);
    // console.log("Aqui4", this.firstCard.nativeElement.clientHeight);
    if (typeof this.item.height === 'string')
      this.item.height = this.firstCard.nativeElement.clientHeight;
    // console.log(this.item);
    // setTimeout(() => this.item.expanded = !this.item.expanded, 50);
    this.item.expanded = !this.item.expanded;
    if (this.item.expanded) {
      this.item.icon = 'md-arrow-dropup';
      this.item.text = 'Minimize';
    } else {
      this.item.icon = 'md-arrow-dropdown';
      this.item.text = 'Maximize';
    }
    this.renderer.setStyle(header, "top", "0px");
    this.renderer.setStyle(scrollContent, "margin-top", this.headerNavHeight + this.headerToolHeight + "px");
    this.headerNavHeight = this.header.nativeElement.children[0].clientHeight;
    this.headerToolHeight = this.header.nativeElement.children[1].clientHeight;
  }

  newPost(postParent) {
    const modal = this.modalCtrl.create(PostFormPage, {
      'discussionId': this.discussionId,
      'discussionSubject': this.discussion.name,
      'postParent': postParent
    });
    modal.present();
  }

  getAnswer(post) {
    this.navCtrl.push(DiscussionPage, {
      'post': post,
      'discussionId': this.discussionId
    });
  }

  back() {
    this.navCtrl.pop();
  }
}
