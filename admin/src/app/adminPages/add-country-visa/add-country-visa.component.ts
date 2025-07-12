import { Component, TemplateRef, ViewChild } from '@angular/core';
import { AddNewCountryModalComponent } from './add-new-country-modal/add-new-country-modal.component';
import { VisaService } from 'src/app/services/visa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCountryVisaModalComponent } from './add-country-visa-modal/add-country-visa-modal.component';
import { forkJoin } from 'rxjs';
import { AddVisaDocumentsComponent } from './add-visa-documents/add-visa-documents.component';

@Component({
  selector: 'app-add-country-visa',
  templateUrl: './add-country-visa.component.html',
  styleUrls: ['./add-country-visa.component.scss']
})
export class AddCountryVisaComponent {

  selectedCountryIdForDelete!: number;
  selectedVisaIdForDelete!: number;
  selectedVisaIdVisaDocument!: number;
  @ViewChild('confirmDelete', { static: true }) confirmDeleteModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteVisa', { static: true }) confirmDeleteVisaModal!: TemplateRef<any>;
  @ViewChild('confirmDeleteVisaDocument1', { static: true }) confirmDeleteVisaDocumentModal!: TemplateRef<any>;

  groupedData: any[] = [];
  visaDocumentsGrouped: any = {}; // country-wise visa documents


  constructor(
    private visaService: VisaService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    forkJoin({
      countries: this.visaService.visaFetch(),
      visas: this.visaService.visatypeFetch(),
      visaDocs: this.visaService.visaDocumentFetch()
    }).subscribe(({ countries, visas, visaDocs }) => {
      const countryList = countries.data || [];
      const visaList = visas.data || [];
      const visaDocList = visaDocs.data || [];

      this.groupedData = countryList.map((country: any) => ({
        ...country,
        visas: visaList.filter((visa: any) => visa.country === country.country)
      }));

      // Group documents by country
      this.visaDocumentsGrouped = {};
      visaDocList.forEach((doc: any) => {
        if (!this.visaDocumentsGrouped[doc.country]) {
          this.visaDocumentsGrouped[doc.country] = [];
        }
        this.visaDocumentsGrouped[doc.country].push(doc);
      });
    });
  }


  openAddCountryModal() {
    const modalRef = this.modalService.open(AddNewCountryModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.isEditMode = false;

    modalRef.closed.subscribe(() => {
      this.loadAllData();
    });
  }

  openEditCountryModal(countryId: number) {
    const modalRef = this.modalService.open(AddNewCountryModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.isEditMode = true;
    modalRef.componentInstance.countryId = countryId;

    modalRef.closed.subscribe(() => {
      this.loadAllData();
    });
  }

  deleteCountry(id: number) {
    this.selectedCountryIdForDelete = id;
    this.modalService.open(this.confirmDeleteModal, { centered: true });
  }

  confirmDeleteCountry(modalRef: any) {
    this.visaService.visaDelete(this.selectedCountryIdForDelete).subscribe(() => {
      this.loadAllData();
      modalRef.close();
    }, () => {
      modalRef.close();
    });
  }


  // Visa related methods
  openAddVisaModal(countryName: string) {
    const modalRef = this.modalService.open(AddCountryVisaModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.isEditMode = false;
    modalRef.componentInstance.country = countryName;

    modalRef.closed.subscribe(() => {
      this.loadAllData();
    });
  }

  openEditVisaModal(visaId: number) {
    const modalRef = this.modalService.open(AddCountryVisaModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.isEditMode = true;
    modalRef.componentInstance.visaId = visaId;

    modalRef.closed.subscribe(() => {
      this.loadAllData();
    });
  }

  deleteVisa(id: number) {
    this.selectedVisaIdForDelete = id;
    this.modalService.open(this.confirmDeleteVisaModal, { centered: true }); // ✅ Correct modal
  }

  confirmDeleteVisaMod(modalRef: any) {
    this.visaService.visatypeDelete(this.selectedVisaIdForDelete).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadAllData();
        } else {
          console.error('Backend Error:', res.message);
        }
        modalRef.close();
      },
      error: (err) => {
        console.error('API Error:', err);
        modalRef.close();
      }
    });
  }


  // Visa Documents related methods
  openVisaDocumentsModal(countryName: string) {
    const modalRef = this.modalService.open(AddVisaDocumentsComponent, { centered: true, size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.country = countryName;

    modalRef.closed.subscribe(() => {
      this.loadAllData(); // Reload after modal closes
    });
  }

  editVisaDocument(docId: number) {
    const modalRef = this.modalService.open(AddVisaDocumentsComponent, { size: 'xl', centered: true });
    modalRef.componentInstance.country = ''; // not needed
    modalRef.componentInstance.editId = docId;

    modalRef.closed.subscribe(() => {
      this.loadAllData();
    });
  }

  deleteVisaDocument(id: number) {
    this.selectedVisaIdVisaDocument = id;
    this.modalService.open(this.confirmDeleteVisaDocumentModal, { centered: true }); // ✅ Correct modal
  }

  confirmDeleteVisaDocument(modalRef: any) {
    console.log("Attempting to delete visa ID:", this.selectedVisaIdVisaDocument);
    this.visaService.visaDocumentDelete(this.selectedVisaIdVisaDocument).subscribe({
      next: (res) => {
        if (res.success) {
          this.loadAllData();
        } else {
          console.error('Backend Error:', res.message);
        }
        modalRef.close();
      },
      error: (err) => {
        console.error('API Error:', err);
        modalRef.close();
      }
    });
  }


}
