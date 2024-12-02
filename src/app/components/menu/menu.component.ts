import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; // Alterna entre abierto y cerrado
  }
}