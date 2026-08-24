import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionItemDetail } from './collection-item-detail';

describe('CollectionItemDetail', () => {
  let component: CollectionItemDetail;
  let fixture: ComponentFixture<CollectionItemDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionItemDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionItemDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should render form', async () => {
    const fixture = TestBed.createComponent(CollectionItemDetail);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

});
