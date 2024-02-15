import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);

  /* FORMA 1: obtener valor usando señales computadas */
  public currentUser = computed(() => this.authService.currentUser());

  /* FORMA 2: obtener valor usando getter */
  // get currentUser() {
  //   return this.authService.currentUser();
  // }
}
