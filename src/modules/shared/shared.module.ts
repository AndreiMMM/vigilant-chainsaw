import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone-formatter.pipe';

@NgModule({
  declarations: [PhonePipe],
  imports: [CommonModule],
  exports: [CommonModule, PhonePipe],
})
export class SharedModule {}
