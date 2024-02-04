import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { MyTemplateDirective } from '../my-template-directive/my-template-directive';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss',
})
export class MyComponent implements AfterContentInit {
  headerTemplate: TemplateRef<any> | undefined;

  @ContentChildren(MyTemplateDirective) templates:
    | QueryList<MyTemplateDirective>
    | undefined;

  ngAfterContentInit() {
    (this.templates as QueryList<MyTemplateDirective>).forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        default:
          break;
      }
    });
  }
}
