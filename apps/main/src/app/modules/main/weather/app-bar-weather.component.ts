import { Component, OnInit } from '@angular/core'
import { combineLatest } from 'rxjs'
import { WeatherIcons } from './weather-icons'
import { WeatherService } from './weather.service'

@Component({
  selector: 'pk-app-bar-weather',
  template: `
    <button mat-button class="wrapper" [matTooltip]="summary" (click)="onClick()">
      <mat-icon
        *ngIf="temperature > 25"
        class="weather-icon temp-high-warning"
        svgIcon="tempHighWarning"
      ></mat-icon>
      <mat-icon
        *ngIf="temperature < 10"
        class="weather-icon temp-low-warning"
        svgIcon="tempLowWarning"
      ></mat-icon>
      <span class="temperature">{{ temperature }}&deg;C</span>
      <mat-icon class="weather-icon" [svgIcon]="weatherIcon"></mat-icon>
    </button>
  `,
  styles: [
    `
      .wrapper {
        display: flex;
        align-items: center;
        padding: 0;
      }
      .temp-high-warning {
        color: var(--color-warn);
      }
      .temp-low-warning {
        color: var(--color-primary);
      }
      .weather-icon {
        padding: 0.5rem;
      }
    `,
  ],
})
export class AppBarWeatherComponent implements OnInit {
  public temperature: number = 0
  public weatherIcon: WeatherIcons = WeatherIcons.CLEAR_DAY
  public summary: string = ''

  constructor(private weatherService: WeatherService) {
    combineLatest([weatherService.location$, weatherService.weather$]).subscribe(
      ([location, weather]) => {
        console.log('component subscribe', location, weather)
        this.summary = `${location}: ${weather}`
      }
    )
  }

  ngOnInit(): void {
    this.temperature = 29
    this.weatherIcon = WeatherIcons.CLOUDY
  }

  public onClick(): void {
    console.log('Weather clicked / open weather widget')
  }
}
