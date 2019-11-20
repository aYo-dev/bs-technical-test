export interface Qualification {
  id: string;
  type: string;
  uniqueId: string | null;
  expiry: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  qualifications: Qualification[];
}