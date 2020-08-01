import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UserApp-SPA';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // set item to persist username on page refresh
    // username is lost if refreshed
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = token;
    }
  }
}
