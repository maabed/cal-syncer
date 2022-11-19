export interface IReqresMeeting {
  id: number;
  title: string;
  status: string;
  start: string;
}
export interface IMeetingApiResponse {
  meetings: IReqresMeeting[];
  totalCount: number;
  count: number;
}
export interface IReqresUser {
  id: number;
  email: string;
  name: string;
  image: string;
}
export interface IUserApiResponse {
  users: IReqresUser[];
  totalCount: number;
  count: number;
}
