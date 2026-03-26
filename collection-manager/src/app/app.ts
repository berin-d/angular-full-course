import { Component, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";


@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
})
export class App {

  count = 0;
  searchText = "";

  coin: CollectionItem;

  constructor() {
    this.coin = new CollectionItem();
    this.coin.name = "Pink Slime";
    this.coin.description = "A pink slime";
    this.coin.rarity = "Rare";
    this.coin.image = "img/pngegg-pink.png";
    this.coin.price = 149;
  }


  incrementCount() {
    this.count++;
  }
}
