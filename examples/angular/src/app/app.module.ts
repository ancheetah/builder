import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BuilderModule } from '@builder.io/angular';

import { AppComponent, CustomThing } from './app.component';
import { FooComponent } from './foo.component';
import { MyButtonComponent } from './my-button/my-button.component';

@NgModule({
  declarations: [AppComponent, FooComponent, CustomThing, MyButtonComponent],
  entryComponents: [CustomThing],
  imports: [
    BrowserModule,
    BuilderModule.forRoot('ed8a0d0382464254a04cf7962cf218ca'),
    RouterModule.forRoot([
      {
        path: '**', // render FooComponent on every page
        component: FooComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
