import { Injectable } from '@angular/core';
import { LazyLoaderService } from './lazy-loader.service';
import { Observable } from 'rxjs';
import { CreatePdfModule } from '@modules/create-pdf/create-pdf.module';

@Injectable({
  providedIn: 'root',
})
export class CreatePdfModuleLoaderService {
  constructor(private readonly lazyLoaderService: LazyLoaderService) {}

  loadModule(): Observable<CreatePdfModule> {
    const path = () => import('../modules/create-pdf/create-pdf.module');

    return this.lazyLoaderService.loadModule(
      path
    ) as Observable<CreatePdfModule>;
  }
}
