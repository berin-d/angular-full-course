import { Component, output, OutputEmitterRef, model, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Models: la fonction model est un input et un output à la fois (two-way binding )

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {

  // Inputs
  search = model("Initial Search");

  // Outputs
  searchButtonClicked: OutputEmitterRef<void> = output<void>({
    alias: "submit",
  });




  searchClick() {
    this.searchButtonClicked.emit();
  }

}
