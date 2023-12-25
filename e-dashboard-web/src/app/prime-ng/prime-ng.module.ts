import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule,
    CardModule,
    AvatarModule,
  ],
  exports: [
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule,
    CardModule,
    AvatarModule,
  ]
})
export class PrimeNgModule { }
