import { Injectable } from '@angular/core';
import { LazyModuleLoaderService } from './lazy-module-loader.service';
import { Observable } from 'rxjs';
import { CreatePdfModule } from '@create-pdf';

@Injectable({
  providedIn: 'root',
})
export class CreatePdfModuleLoaderService {
  constructor(
    private readonly lazyModuleLoaderService: LazyModuleLoaderService
  ) {}

  loadModule(): Observable<CreatePdfModule> {
    // TODO fix path
    const path = () => import('../modules/create-pdf/create-pdf.module');

    return this.lazyModuleLoaderService.loadModule(
      path
    ) as Observable<CreatePdfModule>;
  }
}
