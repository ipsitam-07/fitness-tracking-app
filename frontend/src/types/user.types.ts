export interface User {
  id: string;
  name: string;
  email: string;
  age?: number | null;
  height?: number | null;
  weight?: number | null;
  gender?: Gender | null;
}

export type Gender = 'male' | 'female' | 'other';
