export type TErrorSource = {
  path: string | number;
  message: string;
}[];

export type TGenericErrorReturn = {
  status: number;
  errorObj: TErrorSource;
  errorMsgs: string;
};
