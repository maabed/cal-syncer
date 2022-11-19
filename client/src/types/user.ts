export default interface IUser {
  _id: string;
  id?: string;
  name: string;
  image: string;
  email: string;
  emailVerified: boolean | null;
}
