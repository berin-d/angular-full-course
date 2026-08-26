import { Component, effect, inject, input, OnDestroy, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CollectionItem, Rarities } from '../../models/collection-item';
import { CollectionService } from '../../services/collection-service';
import { Collection } from '../../models/collection';
import { Subscription } from 'rxjs';
import { CollectionItemCard } from '../../components/collection-item-card/collection-item-card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collection-item-detail',
  imports:  [
    ReactiveFormsModule,
    CollectionItemCard,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './collection-item-detail.html',
})
export class CollectionItemDetail implements OnDestroy {
  private fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private collectionService = inject(CollectionService);

  itemId = input<number | null, string>(null, {
    alias: 'id',
    transform: (value) => (value ? parseInt(value) : null),
  });

  selectedCollection!: Collection;
  collectionItem = signal<CollectionItem>(new CollectionItem());

  valueChangeSubscription: Subscription | null = null;

  // Reactif forms
  readonly rarities = Object.values(Rarities);

  itemFormGroup = this.fb.group({
    id: [-1],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required]],
    rarity: [Rarities.Common, [Validators.required]],
    image: ['Image URL', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    effect(() => {
      let itemToDisplay = new CollectionItem();
      this.selectedCollection = this.collectionService.getAll()[0];
      console.log('selectedCollection', this.selectedCollection);
      if (this.itemId() !== null) {
        const itemFound = this.selectedCollection.items.find((item) => item.id === this.itemId());
        if (itemFound) {
          itemToDisplay = itemFound;
        } else {
          this.router.navigate(['not-found']);
        }
      }
      this.itemFormGroup.patchValue(itemToDisplay);
    });
    this.valueChangeSubscription = this.itemFormGroup.valueChanges.subscribe(() => {
      this.collectionItem.set(Object.assign(new CollectionItem(), this.itemFormGroup.value));
    });
  }

  submit(event: Event) {
    event.preventDefault();
    this.collectionService.addItem(this.selectedCollection, this.collectionItem());
  }

  delete() {
    if (this.itemId() !== null) {
      this.collectionService.deleteItem(this.selectedCollection.id, this.itemId() as number);
      setTimeout(() => this.cancel(), 100);
    }
  }

  save() {
    if (this.itemId() !== null) {
      this.collectionService.updateItem(this.selectedCollection, this.collectionItem());
      setTimeout(() => this.cancel(), 100);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.itemFormGroup.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  onFileChanged(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file); // convertir en base64
      reader.onload = () => {
        this.itemFormGroup.patchValue({
          image: reader.result as string,
        });
      };
    }
  }

  ngOnDestroy() {
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }
}
