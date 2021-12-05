import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { HkapiService } from '../../service/hkapi.service';
import { StorageService } from 'src/app/service/storage.service';
import { OcxService } from 'src/app/service/ocx.service';

@NgModule({
    declarations: [IndexComponent],
    imports: [
      CommonModule,
      IndexRoutingModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers:[HkapiService,StorageService,OcxService]
  })
  export class IndexModule { }