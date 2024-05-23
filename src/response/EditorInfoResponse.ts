type Params = {
  acl: string;
  policy: string;
  'x-amz-algorithm': string;
  'x-amz-credential': string;
  'x-amz-date': string;
  'x-amz-signature': string;
};

type UploadConfig = {
  uploadURL: string;
  keyStart: string;
  params: Params;
};

export default UploadConfig
