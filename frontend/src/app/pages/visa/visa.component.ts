import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { WebApplicationService } from 'src/app/services/web-application.service';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent {
  
  visaForm!: FormGroup;

  allVisaData = {
    visa: [],
    visaType: [],
    visaDocument: []
  };

  visaList: any[] = [];

  visaData: any = null;
  visaTypes: any[] = [];
  visaDocument: any = null;
  documentList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private visaService: WebApplicationService
  ) { }

  ngOnInit(): void {
    this.visaForm = this.fb.group({
      country: ['']
    });

    this.visaService.visaFetch().subscribe({
      next: (res: any) => {
        if (res?.data?.visa) {
          this.allVisaData = res.data;
          this.visaList = res.data.visa;

          this.visaForm.get('country')?.valueChanges.subscribe((country: any) => {
            if (typeof country === 'string' && country.trim()) {
              this.filterVisaData(country);
            } else {
              this.resetVisaData();
            }
          });
        }
      },
      error: (err) => console.error('API error:', err)
    });
  }

  filterVisaData(country: string): void {
    const { visa, visaType, visaDocument } = this.allVisaData;

    this.visaData = visa.find((v: any) => v.country === country) || null;
    this.visaTypes = visaType.filter((v: any) => v.country === country) || [];
    this.visaDocument = visaDocument.find((v: any) => v.country === country) || null;

    this.documentList = [];
    if (this.visaDocument) {
      this.documentList = Object.keys(this.visaDocument)
        .filter(key => key.startsWith('doc_') && this.visaDocument[key])
        .map(key => this.visaDocument[key]);
    }
  }

  resetVisaData(): void {
    this.visaData = null;
    this.visaTypes = [];
    this.visaDocument = null;
    this.documentList = [];
  }

  // typeahead search function
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1 ? []
          : this.visaList
              .map(v => v.country)
              .filter(v => v.toLowerCase().includes(term.toLowerCase()))
              .slice(0, 10)
      )
    );

  // display formatters
  formatter = (result: any) => result;

}
