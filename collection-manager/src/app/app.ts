import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";


@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {

  count = 0;
  searchText = "";

  greenSlime: CollectionItem;
  pinkSlime: CollectionItem;
  blueSlime: CollectionItem;

  itemList: CollectionItem[] = [];

  // Signals
  selectedItemIndex = signal(0);

  selectedItem = computed(() => { return this.itemList[this.selectedItemIndex()]; });

  logEffect = effect(() => {
    console.log(`Selected item index: ${this.selectedItemIndex()}`);
    console.log(this.selectedItem())
  });

  constructor() {
    // 1st item
    this.pinkSlime = new CollectionItem();
    this.pinkSlime.name = "Pink Slime";
    this.pinkSlime.description = "A pink slime";
    this.pinkSlime.rarity = "Rare";
    this.pinkSlime.image = "img/pngegg-pink.png";
    this.pinkSlime.price = 149;

    // 2nd item
    this.blueSlime = new CollectionItem();
    this.blueSlime.name = "Blue Slime";
    this.blueSlime.description = "A blue slime";
    this.blueSlime.rarity = "Common";
    this.blueSlime.image = "img/pngegg-blue.png";
    this.blueSlime.price = 49;

    // 3rd item
    this.greenSlime = new CollectionItem();

    this.itemList = [
      this.pinkSlime,
      this.blueSlime,
      this.greenSlime
    ]
  }


  incrementCount() {
    this.count++;
  }


  incrementIndex() {
    const currentValue = this.selectedItemIndex();
    this.selectedItemIndex.set((currentValue + 1) % this.itemList.length);
  }
}
