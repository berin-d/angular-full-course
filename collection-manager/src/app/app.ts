import { ChangeDetectionStrategy, Component, computed, effect, model, signal } from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from "./components/search-bar/search-bar";
import { Collection } from './models/collection';


@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {


  searchText = model("");

  greenSlime: CollectionItem;
  pinkSlime: CollectionItem;
  blueSlime: CollectionItem;

  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items ?? [];
    return allItems.filter(item => item.name.toLowerCase().includes(this.searchText().toLocaleLowerCase()));
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



    const defaultCollection = new Collection();
    defaultCollection.title = "My Slime Collection";
    defaultCollection.items.push(this.greenSlime, this.pinkSlime, this.blueSlime);

    this.selectedCollection.set(defaultCollection);


  }

}
