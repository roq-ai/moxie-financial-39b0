interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Admin'],
  customerRoles: [],
  tenantRoles: ['Visitor Guest', 'Registered User', 'Admin'],
  tenantName: 'Organization',
  applicationName: 'Moxie Financial ',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
