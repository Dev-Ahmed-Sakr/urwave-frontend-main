import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Languages } from 'src/base/data/Languages';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  model: 'create' | 'update' = 'create';
  matPaginator: any = MatPaginator;
  ngUnsubscribe = new Subject<void>();
  _name = new BehaviorSubject<string>('');
  name$ = this._name.asObservable();
  public datepipe: DatePipe;
  public authService: AuthService;
  public httpService: HttpService;
  public router: Router;
  public activatedRoute: ActivatedRoute;
  public _ref: ChangeDetectorRef;
  public translationService: TranslationService;
  public translateService: TranslateService;
  //public spinnerService: SpinnerService;
  public fb: FormBuilder;
  //public swalService: SwalService;
  //public PermissionsService: PermissionsService;
  public dialog: MatDialog;

  Languages = Languages;
  //MatPaginatorSize: any = MatPaginatorSize;

  constructor(public injector: Injector) {
    this.datepipe = this.injector.get(DatePipe);
    this.authService = this.injector.get(AuthService);
    this.httpService = this.injector.get(HttpService);
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this._ref = this.injector.get(ChangeDetectorRef);
    this.translationService = this.injector.get(TranslationService);
    this.translateService = this.injector.get(TranslateService);
    //this.spinnerService = this.injector.get(SpinnerService);
    this.fb = this.injector.get(FormBuilder);
    //this.swalService = this.injector.get(SwalService);
    //this.PermissionsService = this.injector.get(PermissionsService);
    this.dialog = this.injector.get(MatDialog);

  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  GetTranslatedName(ArabicName: string, EnglishName: string): BehaviorSubject<string> {
    switch (this.translationService._dir.value) {
      case 'rtl':
        this._name.next(ArabicName);
        break;
      case 'ltr':
        this._name.next(EnglishName);
        break;
      default:
        break;
    }
    return this._name;
  }

  // AddRoles(permission: string | string[]) {
  //   this.PermissionsService.AddPermissions(permission);
  // }
}