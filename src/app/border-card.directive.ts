import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appPkmnBorderCard]" // [] to target attribute - use prefixe for name (camel case / not Ng)
})
export class BorderCardDirective {
  private initialColot: string = "#f5f5f5";
  private defaultColor: string = "#009688";
  public newColor: string = "red";
  private defaultHeight: number = 180;

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColot);
    this.setHeight(this.defaultHeight);
  }

  @Input("appPkmnBorderCard") borderColor: string; // alias
  // @Input() appPkmnBorderCard: string; // without alias

  private setBorder(color: string) {
    const border = "solid 4px " + color;
    this.el.nativeElement.style.border = border;
  }

  /* @HostListener: Decorator that declares a DOM event to listen for,
  and provides a handler method to run when that event occurs. */
  @HostListener("mouseenter") onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.setBorder(this.initialColot);
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + "px";
  }
}
