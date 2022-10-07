import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./Auth/auth.interceptor";
import {LoaderInterceptor} from "./Loader/loader.interceptor";

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},

];
