import 'dotenv/config';

// Single place that reads process.env, so the rest of the code never touches it directly.
export const env = {
  port: Number(process.env.PORT || 3000),
  appToken: process.env.APP_TOKEN || '',
  dashscope: {
    apiKey: process.env.DASHSCOPE_API_KEY || '',
    baseUrl: process.env.DASHSCOPE_BASE_URL || 'https://dashscope-intl.aliyuncs.com',
    // One Wan model per input mode.
    models: {
      text: process.env.WAN_T2V_MODEL || 'wan2.7-t2v',
      frames: process.env.WAN_I2V_MODEL || 'wan2.7-i2v',
      reference: process.env.WAN_R2V_MODEL || 'wan2.7-r2v',
    },
  },
  hf: {
    token: process.env.HF_TOKEN || '',
    spaceId: process.env.HF_SPACE_ID || 'multimodalart/wan2-1-fast',
    apiName: process.env.HF_API_NAME || '',
  },
  ark: {
    apiKey: process.env.ARK_API_KEY || '',
    baseUrl: process.env.ARK_BASE_URL || 'https://ark.ap-southeast.bytepluses.com/api/v3',
    modelId: process.env.SEEDANCE_MODEL_ID || 'dreamina-seedance-2-5-260628',
  },
};
