type User = {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export default User;
