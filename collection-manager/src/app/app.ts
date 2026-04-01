import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { CollectionItemCard } from './components/collection-item-card/collection-item-card';
import { CollectionItem } from './models/collection-item';
import { SearchBar } from './components/search-bar/search-bar';
import { Collection } from './models/collection';
import { CollectionService } from './services/collection-service';

@Component({
  selector: 'app-root',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private collectionService = inject(CollectionService);

  searchText = model('');

  selectedCollection = signal<Collection | null>(null);
  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items ?? [];
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(this.searchText().toLocaleLowerCase()),
    );
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addGenericItem() {
    const collection = this.selectedCollection();
    if (collection) {
      const storedCollection = this.collectionService.addItem(collection, new CollectionItem());
      this.selectedCollection.set(storedCollection);
    }
  }

}
