import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';
import { UiBasicRoutingModule } from './ui-basic-routing.module';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule,
    UiBasicRoutingModule, SharedModule,
    
    ReactiveFormsModule]
  
})
export  class UiBasicModule {
  constructor() {
    
  }
}
