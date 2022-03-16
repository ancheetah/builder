import { BuilderBlock } from '@builder.io/angular';
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  public page: any;
  constructor(private httpClient: HttpClient) {};

  data = {
    property: 'hello',
    fn: (text: string) => alert(text),
  };

  ngOnInit() {
    console.log('in ngOnInit');
    // fetch from HTML API
    const res = this.httpClient
      // .get('https://cdn.builder.io/api/v1/html/page?apiKey=c8c2ea5f476a464ab3f9f1f3f9c83a2a&url=/en/html-api-test-component')
      .get('https://cdn.builder.io/api/v1/html/page?apiKey=ed8a0d0382464254a04cf7962cf218ca&url=/about')
      .pipe(map<any, any>((response: any) => {
        console.log("response = ", response);
        this.page = response.data.html
      }))
      .subscribe(d => {
        console.log("d = ", d)
        // this.page = d.data.html
      });
      
      console.log("res = ", res)
  }

  load(event: any) {
    console.log('load', event);
  }

  error(event: any) {
    console.log('error', event);
  }
}
