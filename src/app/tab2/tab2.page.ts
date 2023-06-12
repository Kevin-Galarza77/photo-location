import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../services/photo.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit,OnDestroy {

  constructor(public photoService: PhotoService) { }

  async ngOnInit() {
    console.log('New foto init');
  }

  ngOnDestroy(): void {
    console.log('New foto destrooy');
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
