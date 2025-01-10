import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Languages } from 'src/base/data/Languages';
import { LocalStorageEnum } from 'src/base/enums/LocalStorageEnum';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  _dir = new BehaviorSubject<any>('ltr');
  dir$ = this._dir.asObservable();
  dir: string = '';
  lang: string = '';
  Languages = Languages;
  langs: string[] = [];

  constructor(
    private translationService: TranslateService,
  ) {
  }

  InitlanguageAndDirection() {
    this.dir = "ltr";
    this.lang = "en";
    localStorage.setItem(LocalStorageEnum.languageDirection, this.lang);
    localStorage.setItem(LocalStorageEnum.displayDirection, this.dir);
    this._dir.next(this.dir);
    this.CheckDirection(this.dir);
    this.langs = this.Languages.map(a => a.lang);
    this.translationService.addLangs(this.langs);
    this.translationService.setDefaultLang(this.lang);
    console.log(this.translationService.currentLang);
    this.translationService.currentLang = this.lang;
    this.translationService.use(this.lang).subscribe();
  }

  CheckLanguage(): void {
    this.lang = localStorage.getItem(LocalStorageEnum.languageDirection);
    this.dir = localStorage.getItem(LocalStorageEnum.displayDirection);
    if (!this.lang || !this.dir) {
      this.InitlanguageAndDirection();
    }
    else {
      this._dir.next(this.dir);
      this.CheckDirection(this.dir);
    }
    this.translationService.use(this.lang);
  }

  RetrieveDir(): string {
    if (!this.dir)
      this.CheckLanguage();
    this._dir.next(this.dir);
    return this.dir;
  }

  ChooseLang(lang: string, direction: string): void {
    console.log(lang);
    console.log(direction);
    this.dir = direction;
    this._dir.next(this.dir);
    console.log(this._dir);
    localStorage.setItem(LocalStorageEnum.languageDirection, lang);
    localStorage.setItem(LocalStorageEnum.displayDirection, direction);
    this.translationService.use(lang);
    this.CheckDirection(this.dir);
  }

  CheckDirection(dir: string) {
    console.log(dir);
    switch (dir) {
      case 'rtl':
        document.body.dir = 'rtl';
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-ar');
        break;
      case 'ltr':
        document.body.dir = 'ltr';
        document.body.classList.add('lang-ar');
        document.body.classList.remove('lang-en');
        break;
      default:
        break;
    }
  }

  getCountryImage(): string {
    var img = this.Languages.filter(x => x.dir === this.dir).map(x => x.imageUrl)[0];
    return img;
  }
}

