import { Component, computed, inject, model, signal } from '@angular/core';
import { CollectionService } from '../../services/collection-service';
import { Collection } from '../../models/collection';
import { CollectionItem } from '../../models/collection-item';
import { CollectionItemCard } from "../../components/collection-item-card/collection-item-card";
import { SearchBar } from "../../components/search-bar/search-bar";

@Component({
  selector: 'app-collection-detail',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './collection-detail.html',
  styleUrl: './collection-detail.css',
})
export class CollectionDetail {
  
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
