import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { NotificationsComponent } from './app-bar/notifications.component'
import { MainComponent } from './main.component'
import { AppBarComponent } from './app-bar/app-bar.component'
import { NoteCardComponent } from './notes/note-card.component'
import { NoteDialogComponent } from './notes/note-dialog.component'
import { NotesComponent } from './notes/notes.component'
import { ShortcutComponent } from './shortcuts/shortcut.component'
import { ShortcutsMenuComponent } from './shortcuts/shortcuts-menu.component'
import { ShortcutsComponent } from './shortcuts/shortcuts.component'
import { AppBarWeatherComponent } from './weather/app-bar-weather.component'
import { CurrentWeatherComponent } from './weather/current-weather.component'
import { DailyWeatherComponent } from './weather/daily-weather.component'
import { HourlyWeatherComponent } from './weather/hourly-weather.component'
import { WeatherComponent } from './weather/weather.component'

@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [
    MainComponent,
    AppBarComponent,
    AppBarWeatherComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    DailyWeatherComponent,
    HourlyWeatherComponent,
    NotesComponent,
    NoteCardComponent,
    NoteDialogComponent,
    NotificationsComponent,
    ShortcutsComponent,
    ShortcutsMenuComponent,
    ShortcutComponent,
  ],
  providers: [],
})
export class MainModule {}
