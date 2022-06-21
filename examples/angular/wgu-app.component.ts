import { AfterContentInit, Component, DoCheck, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from '@builder.io/angular';
import { DataService, FormGroupService } from 'wgu-builder-components-lib';
import { AnalyticsService } from './services/analytics/analytics.service';
import { RestService } from './services/API_services/rest-service';
import { registerComponents } from './utilities/registerComponents/registerComponents';
import { submitInquiryForm } from './submitInquiryForm';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit, DoCheck {
  constructor(
    public formService: FormGroupService,
    private analytics: AnalyticsService,
    public builder: BuilderService,
    private restService: RestService,
    private _router: Router,
    private dataService: DataService,
    private window: Window,
    private ngZone: NgZone
  ) {
    registerComponents();
    window.addEventListener('submitInquiryForm', () => {
      submitInquiryForm(this.formService, this.restService);
   });
    window.addEventListener('startSpinner', () => {
      this.dataService.setData('showSpinner', true);
   });
    window.addEventListener('stopSpinner', () => {
      this.dataService.setData('showSpinner', false);
   });
 }
  f = false;
  activeHeader = 'header-section';
  activeFooter = 'footer-section';
  title = 'marketing-inquiry-form-ui';
  options: any = {
    cacheSeconds: 1,
    data: {
      locale: 'en-US',
   },
    query: {
      data: {
        // @ts-ignore
        environment: window.__env ?? 'development',
     },
   },
 };
  context = {
    formService: this.formService,
 };
  data = {
    property: 'default',
    fn: (text: string) => {
      alert(text);
   },
    postStepDataFn: (formGroup: string, nextPage: string) => {
      let dataToPost: { [k: string]: any } = { initial: true };
      const tehForm = this.formService.getFormGroup(formGroup);
      if (tehForm.status === 'VALID') {
        this.dataService.setData('showSpinner', true);
        const theData = tehForm.value;
        Object.keys(theData).forEach((item: string) => {
          let val = theData[item];
          switch (item) {
            case 'firstName': {
             dataToPost.firstName = val;
              break;
           }
            case 'lastName': {
             dataToPost.lastName = val;
              break;
           }
            case 'emailAddress': {
             dataToPost.email = val;
              break;
           }
            case 'programOfInterest': {
             dataToPost.programCode = JSON.parse(val).value;
              break;
           }
         }
       });
        this.restService
          .sendStepData(dataToPost)
         .then((val: any) => {
            this.dataService.setData('showSpinner', false);
            if (val.constructor.name === 'Error') {
              console.warn(
                'an error has occurred.\n---Please Try again or call 866.225.5948 for assistance.---\n',
                val
              );
              alert(
                'an error has occurred.\n---Please Try again or call 866.225.5948 for assistance.---\n'
              );
           } else {
              this.ngZone.run(() => {
                this._router.navigateByUrl(nextPage);
             });
           }
         })
         .catch((err: any) => {
            this.dataService.setData('showSpinner', false);
            console.warn(
              'an error has occurred.\n---Please Try again or call 866.225.5948 for assistance.---\n',
              err
            );
            alert(
              'an error has occurred.\n---Please Try again or call 866.225.5948 for assistance.---\n'
            );
         });
     }
   },
    navigate: (nextPage: string) => {
      this.ngZone.run(() => {
        this._router.navigateByUrl(nextPage);
     });
   },
    getValueFromForm: (
      formId: string,
      formControlId: string,
      prefix: string,
      suffix: string
    ) => {
      let formValue = this.formService.getFormControl(
        formId,
        formControlId
      )?.value;
      let displayValue = '';
      try {
       displayValue = JSON.parse(formValue).label;
     } catch {
       displayValue = formValue;
     }
      if (displayValue == undefined) {
       displayValue = formValue;
     }
      return prefix + displayValue + suffix;
   },
 };
  init = false;
  ngAfterContentInit() {
    this.init = true;
 }
  contentHeight = 0;
  ngDoCheck(): void {
    let baseHeight = 0;
    Array.from(
      document
        .getElementsByClassName('content-section')[0]
       .getElementsByClassName('builder-block')
   ).forEach((item) => {
      if (item.clientHeight > baseHeight) {
       baseHeight = item.clientHeight;
     }
   });
    if (this.contentHeight != baseHeight) {
      this.contentHeight = baseHeight;
   }
 }
}