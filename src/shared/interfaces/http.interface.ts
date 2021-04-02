/**
 * HTTP interface.
 * @file HTTP 响应接口模型
 * @module interface/http
 */

// 响应状态
import { HttpStatus } from '@nestjs/common';

export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

export type TMessage = string;
export type TExceptionOption =
  | TMessage
  | {
      message: TMessage;
      error?: any;
    };

// 翻页数据
export interface IHttpResultPaginate<T> {
  data: T;
  params: any;
  pagination: {
    total: number;
    current_page: number;
    total_page: number;
    per_page: number;
  };
}

// HTTP 状态返回
export interface IHttpResponseBase {
  code: HttpStatus;
  status: string;
  message: TMessage;
}

// HTTP error
export type THttpErrorResponse = IHttpResponseBase & {
  stack?: string;
};

// HTTP success 返回
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  result: T | IHttpResultPaginate<T>;
};

// HTTP Response
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;
