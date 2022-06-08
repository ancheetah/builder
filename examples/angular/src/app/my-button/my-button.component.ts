import { Component, Input, OnInit } from '@angular/core';
import { BuilderBlock } from '@builder.io/angular';

@Component({
  selector: 'my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent implements OnInit {

  @Input()
  name = 'default name';

  @Input()
  telNumber = '1234567890';
  
  @Input()
  email = 'default@example.com';

  ngOnInit(): void {
  }

}

BuilderBlock({
  tag: 'my-button',
  name: 'My Button',
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'telNumber',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    }
  ],
})(MyButtonComponent);
