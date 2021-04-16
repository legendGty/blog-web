import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../services/interceptor.service';


const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
];

export default httpInterceptorProviders;
