export type Patient = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: Date;
  short_description?: string;
  created_at: Date;
};
