import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/interceptors/loader.service';

@Component({
  selector: 'app-slow-loader',
  templateUrl: './slow-loader.component.html',
  styleUrls: ['./slow-loader.component.scss']
})
export class SlowLoaderComponent {
  constructor(public loader: LoaderService){}
} 
 