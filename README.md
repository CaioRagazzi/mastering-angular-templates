Hello Devs,

If you are an Angular developer, I bet you have used PrimeNG. I've been using it for some time, and one thing always caught my attention: TEMPLATES!

Let's use as an example the PrimeNG Card component. The component gives you a prop header, where you can pass a string to it, but you can also customize your header the way you want using a pTemplate. It works as shown below:

```html
<p-card header="Car Header">
  <ng-template pTemplate="header">
    <img alt="Card" src="http://fake.url.png" />
  </ng-template>
</p-card>
```

That's pretty awesome, right?
And if you are curious like me I know you wanna know how this template feature works under the hood. But don't worry my friend, I did my part in the dev community and figured it out. Here's how it works and you will also be able to apply this strategy in your components.

The main idea is to be able to get the content inside the ng-template and render it in a specific place in our component, but we don't want any template, we want a specific template. In the example below we want only the template with the directive myTemple="header" to be rendered in our component:

```html
<my-component header="Car Header">
  <ng-template myTemplate="header">
    <button>Simple button</button>
  </ng-template>
</my-component>
```

First, let's create the directive myTemplate:

```javascript
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
```

As we can see it is a simple structure directive (more on structure directives here: [Angular.io](https://angular.io/guide/structural-directives#creating-a-structural-directive)) with one input to receive the type (in our case "header") and one function called getType that returns the input value (I will explain the reason for this function later in the article).

Now we need the component <my-component></my-component>

```javascript
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
```

Let's break this component down:

1. We need a property (headerTemplate) with the type TemplateRef to store the template that is being passed to the component.
2. We need a property to store all the templates which have our custom directive assigned to them. In our case is the property 'templates', that have the decorator @ContentChildren(MyTemplate) (more of @ContentChildren decorator on [Angular.io](https://angular.io/api/core/ContentChildren))
3. We need with the help of the lifecycle hook AfterContentInit (more of AfterContentInit lifecycle hook on [Angular.io](https://angular.io/api/core/AfterContentInit)) to iterate over all the templates and call the function getType to get only the template header and store it in the headerTemplate property.

Well, that's it for the .ts part of our component, basically we are searching for all ng-templates with our custom directve that were passed to MyComponents and getting only the one with the 'header' input. Now that we have the template in the headerTemplate property we need to show it in the HTML. Let's see how it is done in the code below:

```html
<div>
  <div>
    <div *ngIf="headerTemplate">
      <div>Template content</div>
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </div>
  </div>
  <div>--------------------------</div>
  <div>
    <div>Footer without template</div>
  </div>
</div>
```

Yes, simple as that. Using Angular structural directive ngTemplateOutlet (more on ngTemplateOutlet on [Angular.io](https://angular.io/api/common/NgTemplateOutlet)) in a ng-container we pass our headerTemplate in the input '\*ngTemplateOutlet="headerTemplate"'.

Using this strategy we can create highly customizable and flexible components, and yet we create a robust component allowing only to render the templates that were passed using the custom directive.

What do you guys think about this design?
What would you change to make it better?

If you want to check the code for this example here's a GiHub repository: [GitHub](https://github.com/CaioRagazzi/mastering-angular-templates)

Thanks a lot for reading this post everyone and as always I wish some happy code for you!

See you!
