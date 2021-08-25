import { Component, OnDestroy } from '@angular/core'
import { ShortcutCategory } from '@pk-start/common'
import { Subscription } from 'rxjs'
import { NotificationService } from '../../shared/services/notification.service'
import { ShortcutsService } from './shortcuts.service'

@Component({
  selector: 'pk-shortcuts',
  template: `
    <pk-shortcuts-menu
      (clickMenu)="onClickMenu($event)"
      (enterMenu)="onEnterMenu($event)"
      (mouseLeave)="onMouseLeave()"
    ></pk-shortcuts-menu>
    <div *ngIf="showShortcuts" class="shortcuts-backdrop" (click)="onClickBackdrop()"></div>
    <div class="shortcuts" *ngIf="showShortcuts && (shortcuts | async)">
      <pk-shortcut
        *ngFor="let sc of (shortcuts | async)![selectedCategory]"
        [shortcut]="sc"
        (clicked)="onClickBackdrop()"
      ></pk-shortcut>
    </div>
  `,
  styles: [
    // language=scss
    `
      .shortcuts-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        background-color: var(--color-bg-opaque);
        backdrop-filter: blur(2px);
        z-index: 1;
      }

      .shortcuts {
        position: absolute;
        z-index: 2;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        top: calc(100vh / 2 - 300px);
        left: calc(100vw / 2 - 200px);
        max-width: 400px;
        max-height: 600px;
        overflow-y: auto;

        @media (min-width: 800px) {
          top: calc(100vh / 2 - 190px);
          left: calc(100vw / 2 - 385px);
          max-width: 770px;
          max-height: 380px;
        }
      }
    `,
  ],
})
export class ShortcutsComponent implements OnDestroy {
  public showShortcuts = false
  public mouseHover = false
  public selectedCategory: ShortcutCategory = ShortcutCategory.TOP
  public shortcuts = this.shortcutsService.shortcuts$

  private subscription = new Subscription()

  constructor(
    private shortcutsService: ShortcutsService,
    private notificationService: NotificationService
  ) {
    this.subscription.add(
      this.shortcutsService.shortcuts$.subscribe(shortcuts => {
        console.log('shortcuts', shortcuts)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public onClickMenu(category: ShortcutCategory): void {
    this.selectedCategory = category
    this.showShortcuts = true
  }

  public onEnterMenu(category: ShortcutCategory): void {
    this.selectedCategory = category
    this.onMouseEnter()
  }

  public onClickBackdrop(): void {
    this.showShortcuts = false
  }

  public onMouseEnter(): void {
    this.mouseHover = true
    setTimeout(() => {
      if (this.mouseHover) {
        this.showShortcuts = true
      }
    }, 500)
  }

  public onMouseLeave(): void {
    this.mouseHover = false
  }
}
