import { Component, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard],
  templateUrl: './app.html',
})
export class App {
  coin: CollectionItem;

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = "Pink Slime";
    this.coin.description = "A pink slime";
    this.coin.rarity = "Rare";
    this.coin.image = "img/pngegg-pink.png";
    this.coin.price = 149;
  }
}
