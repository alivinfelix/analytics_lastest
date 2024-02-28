export const FACTORY_ADDRESS = '0x5e39b05985021bc0fc11ca0f5e4952f7d596eeb9'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time'
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://raw.githubusercontent.com/MNZChain/DEX-Assets/main/tokenlist.json'
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  '0x18e054defba8d3a1479516206385046025e2840a',
  '0x4ddd9fe8c624192ce7c6e70d9d0b033ba37e047d',
  '0x44216d4d611116812c7d06f93f28e7e8b112aabf',
  '0xfc7ee5a822f81206d66889f23a0c6270343b6dca',
  '0x8476ffdec27a16f02e88063b6fdb4da9f111e1a3',
  '0xbdc2d10b28fc07afe2f8ce92e8f8d666eeee9cd6',
  '0x1852b91c4a2d817e8a479e91c1c2607e46fee414',
  '0x97196f8a0f69d8d4df1585a345aca96c2533c049',
  '0x058251a3177e5b0ed06191c89e5b8b0d9d50efa9',
  '0x01da4fe47ed23bcc8bc22144a48234a4231b9983',
  '0x87d02fd219e97f078ea4750049f1501a843a7f36',
  '0x52100355e00b3e924295a2ebdf8a065530c2b3a7',
  '0x58aac8e84a9b080c4dd1b1f8eecc20bbad0279ed',
  '0xe30e2f0afd56dacf8b8d4afbc594f63ee21b9441',
  '0xf7256527f97b4159e9ad1d108927633af6105560'
]

// pair blacklist
export const PAIR_BLACKLIST = [
  '0xc5271d40dd6d2c6ee66351e14408839e6963a63d',
  '0x0870ab0879e6a0274ea27a4546d90700ddf00009',
  '0x1618273c4dd265b1b54e06f9f8bf1b8067859aea',
  '0x17618a47f11273af226edc53a569871ce754a3ea',
  '0x1c594cca067368e4db53717b06dfd72c8c69aad3',
  '0xcb6fa44a2ed54df2a37b2fada59b2b15f7008d30',
  '0x60e22e2d59e225f237c77c08b38682729f96a803',
  '0x69787145e7f037faba2082bfb6e6eec8b48814ef',
  '0x6cfd2808cd5c5af232bfcbb61127e9c6c0c2c3e0',
  '0xe2744631480a0150b2600bf51d584c875d3fe5b4'
]

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = ['0xd46ba6d942050d489dbd938a2c909a5d5039a161']

// fee swap
export const FEE_SWAP = 0.000
