import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../models/organization';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * All authenticated user organizations
   */
  organizations: Organization[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    // Load organizations
    this.api.getOrganizations().subscribe(data => {
      this.organizations = data;
    });
  }
}
