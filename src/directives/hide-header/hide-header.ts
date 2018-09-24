import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input("header") header: HTMLElement;
  headerNavHeight;
  headerToolHeight;
  scrollContent;

  constructor(public element: ElementRef, public renderer: Renderer2) { }

  ngAfterViewInit(){
    // this.headerHeight = this.header.clientHeight;
    this.headerNavHeight = this.header.children[0].clientHeight;
    this.headerToolHeight = this.header.children[1].clientHeight;
    this.renderer.setStyle(this.header, 'webkitTransition', 'top 700ms');
    this.renderer.setStyle(this.header, 'transition', 'top 200ms linear');
    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];
    this.renderer.setStyle(this.scrollContent, 'webkitTransition', 'margin-top 700ms');
    this.renderer.setStyle(this.scrollContent, 'transition', 'margin-top 200ms linear');
  }

  onContentScroll(event){
    this.headerToolHeight = this.header.children[1].clientHeight;
    if(event.scrollTop > 56){
      this.renderer.setStyle(this.header, "top", "-" + this.headerNavHeight + "px");
      this.renderer.setStyle(this.scrollContent, "margin-top", "0px")
    } else {
      this.renderer.setStyle(this.header, "top", "0px");
      this.renderer.setStyle(this.scrollContent, "margin-top", this.headerNavHeight + this.headerToolHeight + "px");
    }
  }

}
