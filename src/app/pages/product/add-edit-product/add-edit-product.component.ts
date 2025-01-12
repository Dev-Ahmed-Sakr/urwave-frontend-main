import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { BaseService } from 'src/app/services/business/base.service';
import { CategoryController } from 'src/base/APIs/CategoryAPI';
import { ProductController } from 'src/base/APIs/ProducAPI';
import { ProductStatus } from 'src/base/enums/ProductStatus';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  providers: [DatePipe],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent extends BaseService implements OnInit {
  categories: any[] = [];
  statuses: { name: string; value: number }[] = [];
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public defaults: any,
    private dialogRef: MatDialogRef<AddEditProductComponent>,
    public override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.initForm();
    this.GetCategories();
    this.GetStatuses();
    if (this.defaults) {
      this.model = 'update';
      this.isUpdateMode();
      this.setFormData();
    } else {
      this.model = 'create';
      this.isCreateMode();
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: new FormControl('0'),
      name: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('Active'),
      price: new FormControl(''),
      categoryId: new FormControl(''),
      imageUrl: new FormControl(''),
      stockQuantity: new FormControl(''),

    });
  }

  GetCategories() {
    this.httpService.GET(CategoryController.GetCategories).subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = res;
      },
      error: (error: Error) => {},
      complete: () => {},
    });
  }
  isCreateMode() {
    return this.model === 'create';
  }

  isUpdateMode() {
    return this.model === 'update';
  }

  setFormData() {
    this.form.patchValue({
      id: this.defaults.id,
      name: this.defaults.name,
      description: this.defaults.description,
      status: this.defaults.status,
    });
  }

  Submit() {
    if (this.model === 'create') {
      console.log(this.form?.value);
      this.Create(this.form?.value);
    }
    if (this.model === 'update') {
      console.log(this.form?.value);
      this.Update(this.form?.value);
    }
  }

  Create(form: any) {
    this.httpService.POST(ProductController.CreateProduct, form).subscribe({
      next: (res: any) => {
        this.dialogRef.close(true);
      },
      error: (error: Error) => {},
      complete: () => {},
    });
  }

  Update(form: any) {
    this.httpService
      .PUT(`${ProductController.DELETEProduct}/${this.defaults.id}`, form)
      .subscribe({
        next: (res: any) => {
          this.dialogRef.close(true);
        },
        error: (error: Error) => {},
        complete: () => {},
      });
  }
GetStatuses() {
  // Convert enum to array for dropdown
  this.statuses = Object.entries(ProductStatus)
  .filter(([key, value]) => typeof value === 'number') // Exclude string keys
  .map(([key, value]) => ({ name: key, value: value as number }));
}
}