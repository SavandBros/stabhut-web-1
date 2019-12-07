import { Component, OnInit } from '@angular/core';
import { User } from '@app/interfaces/user';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  /**
   * Current authenticated user
   */
  user: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.user.subscribe((data: User): void => {
      this.user = data;
    });
  }
}
