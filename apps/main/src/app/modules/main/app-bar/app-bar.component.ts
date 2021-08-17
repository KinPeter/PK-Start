import { Component, Renderer2 } from '@angular/core'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'pk-app-bar',
  template: `
    <mat-toolbar>
      <a mat-icon-button matTooltip="P-kin.com" href="https://www.p-kin.com" target="_blank">
        <mat-icon svgIcon="pLogoColor"></mat-icon>
      </a>
      <span class="spacer"></span>
      <button *ngFor="let icon of weatherIcons" mat-icon-button [matTooltip]="icon">
        <mat-icon [svgIcon]="icon"></mat-icon>
      </button>
      <button mat-icon-button matTooltip="Korean">
        <mat-icon svgIcon="hangul"></mat-icon>
      </button>
      <button mat-icon-button matTooltip="Birthdays">
        <mat-icon>today</mat-icon>
      </button>
      <button mat-icon-button matTooltip="More..." [matMenuTriggerFor]="menu">
        <mat-icon>more_horiz</mat-icon>
      </button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="switchTheme()">
          <mat-icon>{{ isLightTheme ? 'dark_mode' : 'light_mode' }}</mat-icon>
          <span>{{ isLightTheme ? 'Dark theme' : 'Light theme' }}</span>
        </button>
        <button mat-menu-item>
          <mat-icon>cloud_download</mat-icon>
          <span>Data backup</span>
        </button>
        <button mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>logout</mat-icon>
          <span>Log out</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [
    //language=scss
    `
      mat-toolbar {
        border-bottom: 1px solid var(--color-primary);
      }
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class AppBarComponent {
  public isLightTheme = false

  public weatherIcons = [
    'clearDay',
    'clearNight',
    'cloudy',
    'fog',
    'hail',
    'tempHighWarning',
    'tempLowWarning',
    'partlyCloudyDay',
    'partlyCloudyNight',
    'precip',
    'rain',
    'sleet',
    'snow',
    'thunderstorm',
    'wind',
  ]

  constructor(private authService: AuthService, private renderer: Renderer2) {}

  public switchTheme(): void {
    this.isLightTheme = !this.isLightTheme
    if (this.isLightTheme) {
      this.renderer.addClass(document.body, 'pk-light-theme')
    } else {
      this.renderer.removeClass(document.body, 'pk-light-theme')
    }
  }

  public logout(): void {
    this.authService.logout()
    location.reload()
  }
}
