export interface EmailAccount {
  name: string;
  domain: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  middleName?: string;

  gender: Gender;
  birthDate: string; // ISO: YYYY-MM-DD

  emailAccounts: EmailAccount[];

  username: string;
  passwordHash: string;

  phone: string;
  country: string;
  city: string;
}
