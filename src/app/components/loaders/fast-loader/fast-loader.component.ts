import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/interceptors/loader.service';

@Component({
  selector: 'app-fast-loader',
  templateUrl: './fast-loader.component.html',
  styleUrls: ['./fast-loader.component.scss']
})
export class FastLoaderComponent {
  constructor(public loader: LoaderService){}
}
