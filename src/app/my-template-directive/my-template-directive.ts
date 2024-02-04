import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myTemplate]',
  host: {},
})
export class MyTemplateDirective {
  @Input() type: string | undefined;

  @Input('myTemplate') name: string | undefined;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name!;
  }
}
