import { Component, input } from '@angular/core';
import { CollectionItem } from '../../models/collection-item';

@Component({
  selector: 'app-collection-item-card',
  imports: [],
  templateUrl: './collection-item-card.html',
})
export class CollectionItemCard {
  item = input<CollectionItem>(new CollectionItem());
  // Input obligatoire :  item = input.required<CollectionItem>();
}
