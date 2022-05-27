import { UserDetail } from 'model/user/user';

export interface ListParams {
  size: number;
  page?: string | number;
  role?: 'user' | 'admin' | null;
  order?: 'asc' | 'desc';
  keyword?: string;
}

export interface DataResponse<T> {
  result?: T[];
  total?: number;
  totalPages?: number;
  currentPage?: number;
  user?: UserDetail;
  tokens?: accesstoken;
  deviceId?: string;
}

export interface ListResponse<T> {
  data: DataResponse<T>;
  message: string;
  status: number;
}

export interface Jwt {
  expires: string;
  token: string;
}

export interface accesstoken {
  access?: Jwt;
  refresh?: Jwt;
}
