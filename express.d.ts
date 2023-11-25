declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}

interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
}
