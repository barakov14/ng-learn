import { HttpInterceptorFn } from '@angular/common/http';

export const httpUrlInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ url: `https://icherniakov.ru/yt-course${req.url}` });
  return next(req);
};
