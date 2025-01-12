import { CommonModule, DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { BaseService } from 'src/app/services/business/base.service';
import { ProductController } from 'src/base/APIs/ProducAPI';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
        MaterialModule, MatMenuModule, MatButtonModule, CommonModule, TranslateModule
  ],
    providers: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent extends BaseService implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Status','Price',
                               'Category','StockQuantity','ImageUrl', 'Actions'];

    constructor(
      public override injector: Injector,
    ) {
      super(injector);
  
    }

    ngOnInit(): void {
      this.GetProducts();
    }

    GetProducts() {
        this.httpService.GET(ProductController.GetProducts).subscribe({
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
          this.dialog.open(AddEditProductComponent, { data: dto })
            .afterClosed()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((dto: any) => {
              if (dto) {
                this.GetProducts();
              }
            });
        }
      
        createObject() {
          this.dialog.open(AddEditProductComponent)
            .afterClosed()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((dto: any) => {
              if (dto) {
                this.GetProducts();
              }
            });
        }
      
        Delete(dto: any) {
          this.httpService.DELETE(`${ProductController.DELETEProduct}/${dto.id}`).subscribe({
            next: (res: any) => {
              this.GetProducts();
            },
            error: (error: Error) => {
            },
            complete: () => {
            }
          });
        }
      
}
