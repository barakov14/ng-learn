import { httpUrlInterceptor } from './lib/data-access/interceptors/http-url.interceptor';
import { LoginRequest } from './lib/data-access/models/auth';
import { Pageble } from './lib/data-access/models/pageble.interface';
import { Profile } from './lib/data-access/models/profile';
import { AuthService } from './lib/data-access/services/auth.service';
import { AvatarCircleComponent } from './lib/ui/avatar-circle/avatar-circle.component';
import { InfiniteScrollTriggerComponent } from './lib/ui/infinite-scroll-trigger/infinite-scroll-trigger.component';
import { LoaderComponent } from './lib/ui/loader/loader.component';
import { SiderbarComponent } from './lib/ui/siderbar/siderbar.component';
import { TtAddressInputComponent } from './lib/ui/tt-address-input/tt-address-input.component';
import { TtInputTagComponent } from './lib/ui/tt-input-tag/tt-input-tag.component';
import { TtInputComponent } from './lib/ui/tt-input/tt-input.component';
import { DateSeparatorPipe } from './lib/utils/pipes/date-separator.pipe';
import { ImageUrlPipe } from './lib/utils/pipes/image-url.pipe';
import { SvgIconPipe } from './lib/utils/pipes/svg-icon.pipe';
import { TimeAgoPipe } from './lib/utils/pipes/time-ago.pipe';

export type { Profile, Pageble };

export {
  httpUrlInterceptor,
  DateSeparatorPipe,
  ImageUrlPipe,
  SvgIconPipe,
  TimeAgoPipe,
  AvatarCircleComponent,
  LoaderComponent,
  SiderbarComponent,
  AuthService,
  InfiniteScrollTriggerComponent,
  TtInputComponent,
  TtInputTagComponent,
  TtAddressInputComponent,
};

export type { LoginRequest };
