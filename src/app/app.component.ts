import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  /**
   * Current authenticated user
   */
  user: User;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe((data: User) => {
      this.user = data;
    });
  }
}
