import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyComponent } from './my-component/my-component.component';
import { MyTemplateDirective } from './my-template-directive/my-template-directive';

@NgModule({
  declarations: [AppComponent, MyComponent, MyTemplateDirective],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
