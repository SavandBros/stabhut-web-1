import { OnInit } from '@angular/core';
import { CardLabel } from '@app/interfaces/card-label';
import { Label } from '@app/interfaces/label';
import { Organization } from '@app/interfaces/organization';
import { Project } from '@app/interfaces/project';
import { User } from '@app/interfaces/user';
import { OrganizationService } from '@app/pages/organization/organization.service';

export class OrganizationBase implements OnInit {

  organization: Organization;
  projects: Project[];
  labels: Label[];
  users: User[];

  isDataInitialised: boolean;

  ngOnInit(): void {
    OrganizationService.organization.subscribe((data: Organization): void => {
      this.organization = data;
      this.checkInitiation();
    });
    OrganizationService.projects.subscribe((data: Project[]): void => {
      this.projects = data;
      this.checkInitiation();
    });
    OrganizationService.labels.subscribe((data: Label[]): void => {
      this.labels = data;
      this.checkInitiation();
    });
    OrganizationService.users.subscribe((data: User[]): void => {
      this.users = data;
      this.checkInitiation();
    });
  }

  /**
   * Check if all data is initiated
   */
  checkInitiation(): void {
    if (this.organization && this.projects && this.labels && this.users) {
      this.isDataInitialised = true;
      this.onInitiation();
    }
  }

  /**
   * Called on all data initiation
   */
  onInitiation(): void {
  }

  /**
   * @returns Local project data
   * @param id Project ID
   */
  getProject(id: number): Project {
    if (this.projects) {
      return this.projects.find(item => item.id === id);
    }
  }

  /**
   * @returns Local label data
   * @param id Label ID
   */
  getLabel(id: number): Label {
    if (this.labels) {
      return this.labels.find(item => item.id === id);
    }
  }

  /**
   * @returns Local user data
   * @param id User ID
   */
  getUser(id: number): User {
    if (this.users) {
      return this.users.find(item => item.id === id);
    }
  }

  // Extra

  /**
   * Get the contrasting color for any hex color
   *
   * @param hexColor Hex color value
   * @return The contrasting color (black or white)
   */
  getContrast(hexColor: string): string {
    /**
     * If a leading # is provided, remove it
     */
    if (hexColor.slice(0, 1) === '#') {
      hexColor = hexColor.slice(1);
    }
    /**
     * If a three-character hex code, make six-character
     */
    if (hexColor.length === 3) {
      hexColor = hexColor.split('').map((hex: string): string => hex + hex).join('');
    }
    /**
     * Convert to RGB value
     */
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    /**
     * Get YIQ ratio
     */
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    /**
     * Check contrast
     */
    return (yiq >= 128) ? 'black' : 'white';
  }

  getLabelStyle(cardLabel: CardLabel): { backgroundColor: string; color: string } {
    return {
      color: this.getContrast(this.getLabel(cardLabel.label).color),
      backgroundColor: this.getLabel(cardLabel.label).color,
    };
  }
}
