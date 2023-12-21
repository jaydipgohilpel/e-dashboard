import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule
  ],
  exports: [
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TagModule,
    ConfirmDialogModule
  ]
})
export class PrimeNgModule { }
