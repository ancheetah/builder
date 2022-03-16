import { BuilderBlock } from '@builder.io/angular';
import { Component, Input } from '@angular/core';
import { GetContentOptions } from '@builder.io/sdk';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'custom-thing',
  template: 'Hello: {{name}}',
})
export class CustomThing {
  @Input()
  name = '';
}

BuilderBlock({
  tag: 'custom-thing',
  name: 'Custom thing',
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
  ],
})(CustomThing);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  options: any = {
    cacheSeconds: 1,
    data: {
      'locale': 'en-US',
    }
  };

  constructor(httpClient: HttpClient) {};

  data = {
    property: 'hello',
    fn: (text: string) => alert(text),
  };

  ngOnInit() {

    // fetch from HTML API
    this.httpClient
      .get('https://cdn.builder.io/api/v1/html/page?apiKey=c8c2ea5f476a464ab3f9f1f3f9c83a2a&url=/en/html-api-test-component')
      .pipe(map<any, any>((response: any) => response));
    
    this.page = response.data.html

    // in a test builder space, create a page and use the Custom Thing component
    // if Custom Thing renders then this is on them
  }

  load(event: any) {
    console.log('load', event);
  }

  error(event: any) {
    console.log('error', event);
  }
}
