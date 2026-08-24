import { Component, computed, inject, model, signal } from '@angular/core';
import { CollectionService } from '../../services/collection-service';
import { Collection } from '../../models/collection';
import { CollectionItem } from '../../models/collection-item';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collection-detail',
  imports: [CollectionItemCard, SearchBar],
  templateUrl: './collection-detail.html',
})
export class CollectionDetail {
  private router = inject(Router);

  private collectionService = inject(CollectionService);

  searchText = model(' ');

  selectedCollection = signal<Collection | null>(null);

  collectionItems = computed(() => {
    const allItems = this.selectedCollection()?.items ?? [];

    const search = (this.searchText() || '').toLocaleLowerCase();

    return allItems.filter((item) => (item.name || '').toLowerCase().includes(search));
  });

  constructor() {
    const allCollections = this.collectionService.getAll();
    if (allCollections.length > 0) {
      this.selectedCollection.set(allCollections[0]);
    }
  }

  addNewItem() {
    this.router.navigate(['/item']);
  }

  updateItem(id: number) {
    this.router.navigate(['/item', id]);
  }
}
