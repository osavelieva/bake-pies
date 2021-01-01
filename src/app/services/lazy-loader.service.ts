import { Compiler, Injectable, Injector, Type } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LazyLoaderService {
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
