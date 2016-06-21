// @flow
module.exports = {

  RESULT: {
    '1': '勝ち',
    '2': '負け',
    '3': 'KO勝ち',
    '4': 'KO負け',
    '5': '回線落ち'
  },

  RESULT_STR: {
    WIN:          1,
    LOSE:         2,
    KO_WIN:       3,
    KO_LOSE:      4,
    DISCONNECTED: 5
  },

  RULE: {
    '1': 'エリア',
    '2': 'ヤグラ',
    '3': 'ホコ'
  },

  RULE_COLOR: {
    '1': '#FF6E00',
    '2': '#00B7A4',
    '3': '#CA00DF'
  },

  STAGE: {
   '1':  'アロワナモール',
   '2':  'Bバスパーク',
   '3':  'シオノメ油田',
   '4':  'デカライン高架下',
   '5':  'ハコフグ倉庫',
   '6':  'ホッケふ頭',
   '7':  'モズク農園',
   '8':  'ネギトロ炭鉱',
   '9':  'タチウオパーキング',
   '10': 'モンガラキャンプ場',
   '11': 'ヒラメが丘団地',
   '12': 'マサバ海峡大橋',
   '13': 'キンメダイ美術館',
   '14': 'マヒマヒリゾート＆スパ',
   '15': 'ショッツル鉱山',
   '16': 'アンチョビットゲームズ'
  },

  RATE_TABLE: {
    'S+': 1000,
    'S':   900,
    'A+':  800,
    'A':   700,
    'A-':  600,
    'B+':  500,
    'B':   400,
    'B-':  300,
    'C+':  200,
    'C':   100,
    'C-':    0
  },

  MAX_RATE_STR:  'S+',
  MIN_RATE_STR:  'C-',
  MIN_RATE_INPUT: 0,
  MAX_RATE_INPUT: 99,

  GRAPH_SIZE_TO_SCREEN: {
    W: 0.95,
    H: 0.6
  },

  RATE_SCALE_GAP: 20,
  KD_SCALE_GAP:   1,

  LABEL_UNIT_PC:     5,
  LABEL_UNIT_MOBILE: 10,

  RECORD_LIMIT: 200,

  TWITTER_URL: 'http://twitter.com/share?text='

};
