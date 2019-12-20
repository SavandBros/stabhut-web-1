import { Component, OnInit } from '@angular/core';
import { Organization } from '@app/interfaces/organization';
import { ApiService } from '@app/services/api.service';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  readonly plus: IconDefinition = faPlus;

  /**
   * All authenticated user organizations
   */
  organizations: Organization[] = [];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getOrganizations().subscribe((data: Organization[]): void => {
      this.organizations = [...data];
    });
  }
}
