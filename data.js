/**
 * ==============================================================================
 * 全站数据中心 (data.js)
 * 纯 JSON 结构对象，所有内容（介绍、经历、作品、联系方式）全在这里改。
 * ==============================================================================
 */
window.DATA = {
  // 1. 基础信息
  "name": "lxhcool",
  "occupation": "交互与前端探索者",
  "location": "中国 · 厦门",
  "colophon": "由 lxhcool 设计与构建",
  // 网页描述（用于微信/QQ等卡片分享与 SEO 检索）
  "description": "你点进来看，是不是也觉得那个黑色大眼球挺好玩的？",

  // 2. 自我介绍（数组每项为一段文字）
  "about": [
    "我是 lxhcool，常驻厦门的前端开发者。热衷于专研技术与细腻交互，喜欢把平时脑海里闪现的灵感，亲手打磨成干净克制、打开即用的交互小工具与新奇玩意。",
    "写代码之外，喜欢用相机定格光影、唱歌、偶尔打打游戏，或者四处淘些有趣的东西折腾鼓捣。"
  ],

  // 3. 社交与联系方式（全部以精美图标展示）
  // - github: 跳转 GitHub 主页
  // - bilibili: 跳转 B站 个人空间
  // - wechat: 鼠标 hover 自动浮动展开二维码，免去点击麻烦
  // - email: 点击一键复制邮箱，并支持唤起邮件客户端
  "socials": {
    "github": "https://github.com/lxhcool",
    "bilibili": "https://space.bilibili.com/96196381?spm_id_from=333.337.0.0",
    "email": "mumumumuhui@gmail.com",
    "wechat": {
      "id": "lxhcooool",
      "qrCode": "./assets/wx.png"
    }
  },

  // 4. 时间轴经历（按时间倒序排列）
  // - link 为选填，没有就不加
  // - link.preview 为悬停预览图路径，选填
  "timeline": [
    {
      "year": "2026",
      "text": "给平时拍下的光影造了个安静去处，就叫「照片」，把快门按下的瞬间统统洗了出来",
      "link": {
        "text": "照片",
        "url": "https://photos.lxhcoool.cn",
        "preview": "./assets/photos.png"
      }
    },
    {
      "year": "2026",
      "text": "逛遍全网没挑到称心的起始页，索性自己造了个极简好用的浏览器新标签页",
      "link": {
        "text": "Station",
        "url": "https://station.lxhcoool.cn",
        "preview": "./assets/station.png"
      }
    },
    {
      "year": "2026 初",
      "text": "AI 迎来彻底大爆发，大受震撼的同时，也陷入了深深的迷茫与思考"
    },
    {
      "year": "2023 底",
      "text": "第一次跟 AI 打交道，发现它经常胡说八道还不太行，一边用一边骂骂咧咧"
    },
    {
      "year": "2020",
      "text": "杭州的冬天确实冻手，加上想离家更近，打包行李一路南下跑来厦门，吹海风、长住至今"
    },
    {
      "year": "2018",
      "text": "在杭州一头扎进前端世界，从零开始跟 HTML/CSS 较劲，开启了敲代码的手艺人生涯"
    }
  ],

  // 5. 作品展示区 (Works)
  // - image: 图片路径（必填）
  // - title: 作品名（选填，不填则只展示图片卡片）
  // - tag: 标签（选填）
  // - url: 链接（选填，有 url 则点击跳转；没有 url 或留空则纯展示、不可点击）
  // - isPlaceholder: true 时作为开发中占位卡片展示
  "worksTitle": "作品",
  "works": [
    {
      "image": "./assets/photos.png",
      "title": "照片",
      "tag": "个人摄影集",
      "url": "https://photos.lxhcoool.cn"
    },
    {
      "image": "./assets/station.png",
      "title": "Station 浏览器起始页",
      "tag": "浏览器扩展",
      "url": "https://station.lxhcoool.cn"
    },
    {
      "isPlaceholder": true,
      "title": "更多想法孵化中…",
      "tag": "即将到来",
      "placeholderText": "下一个好玩的点子正在赶来…"
    }
  ]
};
