import { Component, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('collection-manager');
}
