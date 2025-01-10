import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { BaseService } from 'src/app/services/business/base.service';
import { CategoryController } from 'src/base/APIs/CategoryAPI';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MaterialModule, MatMenuModule, MatButtonModule, CommonModule, TranslateModule
  ],
  providers: [DatePipe],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent extends BaseService implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['Name', 'Parent', 'Status', 'Actions'];


  constructor(
    public override injector: Injector,
  ) {
    super(injector);

  }

  ngOnInit(): void {
    this.GetCategories();
  }

  GetCategories() {
    this.httpService.GET(CategoryController.GetCategories).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res;
      },
      error: (error: Error) => {
      },
      complete: () => {
      }
    });
  }

  Update(dto: any) {
    this.dialog.open(AddEditCategoryComponent, { data: dto })
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((dto: any) => {
        if (dto) {
          this.GetCategories();
        }
      });
  }

  createObject() {
    this.dialog.open(AddEditCategoryComponent)
      .afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((dto: any) => {
        if (dto) {
          this.GetCategories();
        }
      });
  }

  Delete(dto: any) {
    this.httpService.DELETE(`${CategoryController.DELETECategory}/${dto.id}`).subscribe({
      next: (res: any) => {
        this.GetCategories();
      },
      error: (error: Error) => {
      },
      complete: () => {
      }
    });
  }


}
