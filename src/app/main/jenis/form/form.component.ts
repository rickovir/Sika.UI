import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { JenisFormData } from '../jenis.model';
import { JenisService } from '../jenis.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {
  @Input() formType:string;
  @Input() formData:JenisFormData;
  @Output() onFormSubmited = new EventEmitter<JenisFormData>();

  constructor(private jenisService:JenisService) {
  }

  ngOnInit(): void {
    
  }

  submitForm()
  {
    this.onFormSubmited.emit(this.formData);
  }

}
