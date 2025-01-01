import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProfileCardComponent} from './shared/common-ui/profile-card/profile-card.component';
import {ProfileService} from './features/profile/services/profile.service';
import {Profile} from './shared/models/profile.interface';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
