import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoReactValidator } from '../../utils/no-react.validator';

@Component({
  selector: 'tt-experimental-tdf',
  imports: [FormsModule, NoReactValidator],
  templateUrl: './experimental-tdf.component.html',
  styleUrl: './experimental-tdf.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentalTdfComponent {
  tvForm = {
    tvType: '',
    tvModel: '',
    contactReason: '',
    contactDate: '',
    warrantyPeriod: '',
    address: {
      city: '',
      street: '',
      building: '',
      apartment: '',
    },
    others: [],
  };

  onSubmit(event: SubmitEvent) {
    // @ts-ignore
    console.log(window.ng.getDirectives(event.target));
  }
}
