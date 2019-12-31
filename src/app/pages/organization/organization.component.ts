import { Component, OnInit } from '@angular/core';
import { Organization } from '@app/interfaces/organization';
import { OrganizationService } from '@app/pages/organization/organization.service';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {

  constructor(private api: ApiService,
              private organizationService: OrganizationService) {
  }

  ngOnInit(): void {
    this.api.getOrganization(
      Number(location.pathname.split('/organization/')[1].split('/')[0]),
    ).subscribe((data: Organization): void => {
      OrganizationService.currentOrganization = data;
      this.organizationService.initialise();
    });
  }
}
