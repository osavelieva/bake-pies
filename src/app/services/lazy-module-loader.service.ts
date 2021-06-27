import { Compiler, Injectable, Injector } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LazyModuleLoaderService {
  constructor(
    private readonly compiler: Compiler,
    private readonly injector: Injector
  ) {}

  loadModule(path: () => Promise<any>): Observable<unknown> {
    return from(
      path()
        .then((module) => this.compiler.compileModuleAsync(module))
        .then((moduleFactory) => moduleFactory.create(this.injector).instance)
    );
  }
}
