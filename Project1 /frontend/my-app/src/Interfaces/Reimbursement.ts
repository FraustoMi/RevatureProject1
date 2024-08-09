import {User} from './User';
export interface Reimbursement {
    r_id: number;
    description: string;
    amount: number;
    stat: string;
    _user: User
  };