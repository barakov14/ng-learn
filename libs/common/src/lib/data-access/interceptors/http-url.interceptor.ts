import { HttpInterceptorFn } from '@angular/common/http';

export const httpUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('Authorization')?.includes('Token')) {
    return next(req);
  }

  req = req.clone({ url: `https://icherniakov.ru/yt-course${req.url}` });

  return next(req);
};
