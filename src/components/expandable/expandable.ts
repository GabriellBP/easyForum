import {Component, Input, ViewChild, ElementRef, Renderer2, SimpleChanges} from '@angular/core';

@Component({
  selector: 'expandable',
  templateUrl: 'expandable.html'
})
export class ExpandableComponent {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  constructor(public renderer: Renderer2) {  }

  ngAfterViewInit(){
    if (this.expandHeight === 'auto')
      this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight);
    else
      this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('1:',this.expanded, ' - ',  this.expandHeight);
    if (changes.expandHeight != undefined && !changes.expandHeight.firstChange && typeof changes.expandHeight.currentValue == "number") {
      // console.log(this.expanded, ' - ',  this.expandHeight);
      this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
    }
  }

}
