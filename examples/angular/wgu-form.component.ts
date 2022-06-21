import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupService } from '../formGroupService/formGroup.service';

@Component({
  selector: 'lib-form',
  template: `<form
    (submit)="onSubmit($event)"
    *ngIf="_sectionA && _builderState && _builderBlock"
  >
    <builder-blocks-outlet
      [blocks]="_sectionA"
      [builderState]="_builderState"
      [builderBlock]="_builderBlock"
      dataPath="component.options.sectionA"
    ></builder-blocks-outlet>
  </form>`,
})
export class WguBuilderFormComponent {
  constructor(protected formService: FormGroupService) {}

  formGroup: FormGroup;

  _builderBlock = undefined;
  @Input() set builderBlock(val: any) {
    this._builderBlock = val;
  }

  _builderState = undefined;
  @Input() set builderState(val: any) {
    this._builderState = val;
  }

  _id: string;
  @Input() set id(val: string) {
    this._id = val;
    this.formService.createFormGroup(this._id);
    this.formGroup = this.formService.getFormGroup(this._id);
    this.setSectionA();
  }

  _sectionA: any;
  sectionAPH: any[] = [];
  @Input() set sectionA(val: any) {
    this.sectionAPH = val;
    this.setSectionA();
  }

  onSubmit(e: any) {
    e.preventDefault();
  }

  setSectionA() {
    if (this.sectionAPH?.length > 0 && this._id?.length > 0 && this.formGroup) {
      this.sectionAPH.forEach((item: any) => {
        if (item?.component?.options) {
          item.component.options.parentId = this._id;

          if (item.component.options.id) {
            let tehId = item.component.options.id;

            if (!Object.keys(this.formGroup.controls).includes(tehId)) {
              this.formService.setFormControl(this._id, tehId);
            }
          }
        }
      });
      this._sectionA = this.sectionAPH;
    }
  }
}
