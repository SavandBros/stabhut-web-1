import { Component, OnInit } from '@angular/core';
import { Organization } from '@app/interfaces/organization';
import { OrganizationService } from '@app/pages/organization/organization.service';
import { ApiService } from '@app/services/api.service';
import { Router, Event, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {

  /**
   * Last loaded organization
   */
  organization: Organization;

  constructor(private api: ApiService,
              private organizationService: OrganizationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadOrganization();
    this.router.events.subscribe((event: Event): void => {
      if (event instanceof NavigationStart) {
        this.loadOrganization();
      }
    });
  }

  loadOrganization(): void {
    const organizationId = Number(location.pathname.split('/organization/')[1].split('/')[0]);
    if (organizationId && (!this.organization || this.organization && this.organization.id !== organizationId)) {
      this.api.getOrganization(organizationId).subscribe((data: Organization): void => {
        this.organization = data;
        OrganizationService.currentOrganization = this.organization;
        this.organizationService.initialise();
      });
    }
  }
}
