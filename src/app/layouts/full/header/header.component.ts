import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { Languages } from 'src/base/data/Languages';
import { DirectionService } from '../../../services/layout/direction.service';
import { AuthService } from 'src/app/services/business/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  Languages = Languages;
  acceptedLangauge: any = null;
  dir: string = '';

  constructor(
    private directionService: DirectionService,
    private authService: AuthService
  ) {
    this.directionService.CheckLanguage();
    this.acceptedLangauge = this.Languages.find(x => x.dir == this.directionService.dir);
    this.CheckLanguage();
    this.ChangeDirection();
  }


  setLanguage(lang: any) {
    this.acceptedLangauge = lang;
    console.log(lang);
    this.directionService.ChooseLang(lang.lang, lang.dir);
  }

  ChangeDirection() {
    this.directionService.dir$.subscribe(lang => {
      this.dir = lang;
      this.CheckDirections();
    });
  }

  CheckLanguage() {
    this.dir = this.directionService.RetrieveDir();
    this.CheckDirections();
  }

  CheckDirections() {
    this.directionService.CheckDirection(this.dir);
  }

  logout() {
    this.authService.Logout();
  }
}
