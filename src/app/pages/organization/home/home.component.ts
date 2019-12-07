import { Component, OnInit } from '@angular/core';
import { Organization } from '@app/interfaces/organization';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  /**
   * All authenticated user organizations
   */
  organizations: Organization[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.api.getOrganizations().subscribe((data: Organization[]): void => {
      this.organizations = data;
    });
  }
}
