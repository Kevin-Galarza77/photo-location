import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit,OnDestroy {

  loading:any;

  images: String[] = [];
  locations: any[] = [];
  data: any[] = [];

  constructor(public photoService: PhotoService,private loadingController:LoadingController) { }

  async ngOnInit() {
    console.log('listado init');
    this.loading = await this.loadingController.create();
    this.loading.present();
    
    this.photoService.getAllsLocations().subscribe({
      next: async result => {
        this.locations = result;
        await this.getAllsImmages();
        this.joinInformation();
      },
      error: e => console.log(e)
    });

  }

  ngOnDestroy(): void {
    console.log('listado destrooy');
  }

  async getAllsImmages() {
    await this.photoService.getAllImages().then(
      result => this.images = result
    ).catch(e => console.log(e));
  }

  async joinInformation() {
    this.data = this.locations.map((location: any) => {
      const locationSearch = this.images.find(image => image.includes(location.id));
      return { url: locationSearch, ...location }
    });
    await this.loading.dismiss();
  }

}
