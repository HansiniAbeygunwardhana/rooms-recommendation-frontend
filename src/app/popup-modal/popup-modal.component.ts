import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.css']
})
export class PopupModalComponent {

  @Input() showModal : boolean = false;
  

  closeModal() {
    this.showModal = false;
  }

}
