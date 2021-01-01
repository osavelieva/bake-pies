import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';

@NgModule({
  imports: [CommonModule],
})
export class CreatePdfModule {
  createDocument(): Observable<TCreatedPdf> {
    return of(({} as unknown) as TCreatedPdf);
  }
}
