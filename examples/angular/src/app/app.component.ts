import { BuilderBlock } from '@builder.io/angular';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GetContentOptions } from '@builder.io/sdk';

@Component({
  selector: 'custom-thing',
  template: `
      <h2> Section A </h2>
      <builder-blocks-outlet [blocks]="sectionA" [builderState]="builderState" [builderBlock]="builderBlock" dataPath="component.options.sectionA"></builder-blocks-outlet>
      <h2> Section B </h2>
      <builder-blocks-outlet [blocks]="sectionB" [builderState]="builderState" [builderBlock]="builderBlock" dataPath="component.options.sectionB"></builder-blocks-outlet>
  `,
})
export class CustomThing implements OnChanges {
  @Input()
  name = '';

  @Input()
  builderBlock = null;

  @Input()
  builderState = null;
  
  @Input()
  sectionA = null;

  @Input()
  sectionB = null;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('in onChanges', changes);
  }
}

BuilderBlock({
  tag: 'custom-thing',
  name: 'Custom thing',
  canHaveChildren: true,
  inputs: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'sectionA',
      type: 'blocks',
      hideFromUI: true,
      helperText: 'This is an editable region where you can drag and drop blocks.',
      defaultValue: [
        {
          '@type': '@builder.io/sdk:Element',
          component: {
            name: 'Text',
            options: {
              text: 'Section A Editable in Builder...',
            },
          },
          responsiveStyles: {
            large: {
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              flexShrink: '0',
              boxSizing: 'border-box',
              marginTop: '20px',
              lineHeight: 'normal',
              height: 'auto',
              textAlign: 'center',
            },
          },
        },
      ],
},
{
  name: 'sectionB',
  type: 'blocks',
  hideFromUI: true,
  helperText: 'This is an editable region where you can drag and drop blocks.',
  defaultValue: [
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Text',
        options: {
          text: 'Section B Editable in Builder...',
        },
      },
      responsiveStyles: {
        large: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          flexShrink: '0',
          boxSizing: 'border-box',
          marginTop: '20px',
          lineHeight: 'normal',
          height: 'auto',
          textAlign: 'center',
        },
      },
    },
  ],
}
  ],
})(CustomThing);

// @Component({
//   selector: 'custom-thing',
//   template: 'Hello: {{name}}',
// })
// export class CustomThing {
//   @Input()
//   name = '';
// }

// BuilderBlock({
//   tag: 'custom-thing',
//   name: 'Custom thing',
//   inputs: [
//     {
//       name: 'name',
//       type: 'string',
//     },
//   ],
// })(CustomThing);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  options: any = {
    cacheSeconds: 1,
    // data: {
    //   locale: 'en-US',
    // },
  };

  data = {
    property: 'hello',
    myFunction: (text: string) => alert(text),
  };

  load(event: any) {
    console.log('load', event);
  }

  error(event: any) {
    console.log('error', event);
  }
}
