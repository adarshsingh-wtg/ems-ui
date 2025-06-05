import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <nav class="navbar navbar-light bg-light mb-3">
        <div class="d-flex align-items-center gap-3">
          <span class="navbar-brand mb-0 h1">BootcampUI</span>
          <a routerLink="/employees" routerLinkActive="active-tab" class="btn nav-tab">Employees</a>
          <a routerLink="/departments" routerLinkActive="active-tab" class="btn nav-tab">Departments</a>
        </div>
      </nav>
      <router-outlet></router-outlet>
  `,
  styles: [
    `
      .nav-tab {
        color: #0d6efd;
        background-color: transparent;
        border: none;
      }
      .active-tab {
        background-color: #0d6efd;
        color: white !important;
      }
    `	
  ]
})
export class AppComponent {
  title = 'ems-ui';
}
