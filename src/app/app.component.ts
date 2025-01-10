import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DirectionService } from './services/layout/direction.service'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Modernize Angular Admin Tempplate';

  constructor(
    public directionService: DirectionService
  ) {
  }

  ngOnInit(): void {

  }
}
