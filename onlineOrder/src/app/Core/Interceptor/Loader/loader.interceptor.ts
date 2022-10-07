import {Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {LoaderService} from "../../Services/Loader/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  showLoaderCustom: any[] = [];

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loaderService = this.injector.get(LoaderService);
    loaderService.show();
    this.showLoaderCustom.push(request);
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.showLoaderCustom.pop();
          if (this.showLoaderCustom.length == 0) {
            loaderService.hide()
          }
        }
      },
      (err: any) => {
        this.showLoaderCustom.pop();
        if (this.showLoaderCustom.length == 0) {
          loaderService.hide()
        }
      }));
  }
}
