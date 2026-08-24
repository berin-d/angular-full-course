import { Injectable } from '@angular/core';
import { Collection } from '../models/collection';
import { CollectionItem, Rarities } from '../models/collection-item';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private collection: Collection[] = [];
  private currentId = 1;
  private currentItemIndex: { [key: number]: number } = {};

  constructor() {
    this.generateDummyData();
  }

  generateDummyData() {
    const pinkSlime = new CollectionItem();
    pinkSlime.id = 1;
    pinkSlime.name = 'Pink Slime';
    pinkSlime.description = 'A pink slime';
    pinkSlime.rarity = Rarities.Uncommon;
    pinkSlime.image = 'img/pngegg-pink.png';
    pinkSlime.price = 149;

    // 2nd item
    const blueSlime = new CollectionItem();
    blueSlime.id = 2;
    blueSlime.name = 'Blue Slime';
    blueSlime.description = 'A blue slime';
    blueSlime.rarity = Rarities.Common;
    blueSlime.image = 'img/pngegg-blue.png';
    blueSlime.price = 49;

    // 3rd item
    const greenSlime = new CollectionItem();
    greenSlime.id = 3;
    greenSlime.name = 'Green Slime';
    greenSlime.description = 'A green slime';
    greenSlime.rarity = Rarities.Rare;
    greenSlime.image = 'img/pngegg-green.png';
    greenSlime.price = 199;

    const defaultCollection = new Collection();
    defaultCollection.title = 'My Slime Collection';

    const storedCollection = this.add(defaultCollection);
    this.addItem(storedCollection, pinkSlime);
    this.addItem(storedCollection, blueSlime);
    this.addItem(storedCollection, greenSlime);
  }

  getAll(): Collection[] {
    return this.collection.map((collection) => collection.copy());
  }

  add(collection: Omit<Collection, 'id' | 'items'>): Collection {
    const storedCopy = collection.copy();
    storedCopy.id = this.currentId;
    this.collection.push(storedCopy);

    this.currentItemIndex[storedCopy.id] = 1;
    this.currentId++;

    return storedCopy.copy();
  }

  get(collectionId: number): Collection | null {
    const storedCopy = this.collection.find((c) => c.id === collectionId);
    return storedCopy ? storedCopy.copy() : null;
  }

  update(collection: Omit<Collection, 'items'>): Collection | null {
    const storedCopy = this.collection.find((c) => c.id === collection.id);

    if (!storedCopy) return null;

    Object.assign(storedCopy, collection);
    return storedCopy.copy();
  }

  delete(collectionId: number): void {
    this.collection = this.collection.filter((c) => c.id !== collectionId);
  }

  addItem(collection: Collection, item: CollectionItem): Collection | null {
    const storedCollection = this.collection.find((c) => c.id === collection.id);

    if (!storedCollection) return null;

    const storedItem = item.copy();
    storedItem.id = this.currentItemIndex[storedCollection.id];
    this.currentItemIndex[storedCollection.id]++;

    storedCollection.items.push(storedItem);
    return storedCollection.copy();
  }

  updateItem(collection: Collection, item: CollectionItem) {
    const storedCollection = this.collection.find((c) => c.id === collection.id);

    if (!storedCollection) return null;

    const storediItemIndex = storedCollection.items.findIndex((i) => i.id === item.id);

    if (storediItemIndex === -1) return null;

    storedCollection.items[storediItemIndex] = item.copy();
    return storedCollection.copy();
  }

  deleteItem(collectionId: number, itemId: number) {
    const storedCollection = this.collection.find((c) => c.id === collectionId);

    if (!storedCollection) return null;

    storedCollection.items = storedCollection.items.filter((item) => item.id !== itemId);

    return storedCollection.copy();
  }
}
