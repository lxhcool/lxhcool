/**
 * lxhcool 个人主页核心交互 (js/main.js)
 * 读取根目录 data.js 中的 window.DATA 配置
 */

(function () {
  function getData() {
    return window.DATA || window.SITE_CONFIG || {};
  }

  // 1. 动态渲染内容
  function renderContent() {
    const data = getData();
    if (!data.name) return;

    // 名字与头衔
    const nameEl = document.getElementById("profile-name");
    if (nameEl) nameEl.textContent = data.name;

    const occEl = document.getElementById("profile-occupation");
    if (occEl) occEl.textContent = data.occupation;

    // 动态同步网页描述（如果有改动）
    if (data.description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", data.description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", data.description);
    }

    // 自我介绍段落
    const aboutEl = document.getElementById("about-paragraphs");
    if (aboutEl && Array.isArray(data.about)) {
      aboutEl.innerHTML = data.about.map((p) => `<p>${p}</p>`).join("");
    }

    // 社交与联系链接（以精致矢量图标展示）
    const SOCIAL_ICONS = {
      github: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
      bilibili: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3l-2.5 3"/><path d="M7 3l2.5 3"/><rect x="3" y="6" width="18" height="14" rx="4"/><line x1="8.5" y1="12" x2="8.5" y2="13"/><line x1="15.5" y1="12" x2="15.5" y2="13"/></svg>`,
      wechat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>`,
      email: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
    };

    const socialsNav = document.getElementById("about-socials");
    if (socialsNav && data.socials) {
      const s = data.socials;
      let html = "";

      // 1. GitHub
      if (s.github) {
        html += `<a href="${s.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="GitHub (@lxhcool)">${SOCIAL_ICONS.github}</a>`;
      }

      // 2. Bilibili
      if (s.bilibili) {
        html += `<a href="${s.bilibili}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="哔哩哔哩 (Bilibili)">${SOCIAL_ICONS.bilibili}</a>`;
      }

      // 3. 微信（官方经典双气泡图标，Hover 浮出二维码，免点击）
      const wx = s.wechat || data.wechat || {};
      const wxId = wx.id || "lxhcool_wx";
      const qrCode = wx.qrCode || "./assets/wechat-qr.svg";
      if (wx) {
        html += `
          <div class="wechat-hover-wrap">
            <button type="button" class="social-icon-btn" aria-label="微信" title="微信 (鼠标移入查看二维码)">
              ${SOCIAL_ICONS.wechat}
            </button>
            <div class="wechat-popover" role="tooltip">
              <img src="${qrCode}" class="wechat-popover-img" alt="微信二维码" />
              <div class="wechat-popover-footer">
                <span class="wechat-popover-id">微信号：<span class="wechat-code">${wxId}</span></span>
                <button type="button" class="wechat-copy-btn" data-action="copy-wechat" data-wx-id="${wxId}" title="复制微信号" aria-label="复制微信号">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      // 4. 邮箱 (直接跳转发送邮件)
      if (s.email) {
        html += `<a href="mailto:${s.email}" class="social-icon-btn" title="发送邮件 (${s.email})">${SOCIAL_ICONS.email}</a>`;
      }

      socialsNav.innerHTML = html;
    }

    // 时间轴经历 (线在最左边，时间在文案上面)
    const timelineSection = document.getElementById("timeline-section");
    const timelineEl = document.getElementById("timeline-list");
    if (Array.isArray(data.timeline) && data.timeline.length > 0) {
      if (timelineSection) timelineSection.style.display = "";
      if (timelineEl) {
        timelineEl.innerHTML = data.timeline
          .map((item) => {
            const linkHtml = item.link
              ? ` <a ${item.link.preview ? `data-preview="${item.link.preview}"` : ""} href="${item.link.url}" target="_blank" rel="noopener noreferrer">${item.link.text}</a>`
              : "";

            return `
              <li>
                <span class="timeline-dot" aria-hidden="true"></span>
                <div class="timeline-time">${item.year}</div>
                <p class="timeline-content">${item.text}${linkHtml}</p>
              </li>
            `;
          })
          .join("");
      }
    } else if (timelineSection) {
      timelineSection.style.display = "none";
    }

    // 作品标题
    const worksTitleEl = document.getElementById("works-title");
    if (worksTitleEl) {
      worksTitleEl.textContent = data.worksTitle || "作品";
    }

    // 作品网格渲染 (支持：有跳转 / 无跳转 / 仅放单图 / 开发中占位卡片)
    const studioGrid = document.getElementById("studio-grid");
    const worksList = data.works || [];
    if (studioGrid && Array.isArray(worksList)) {
      studioGrid.innerHTML = worksList
        .map((item) => {
          if (item.isPlaceholder) {
            return `
              <div class="studio-card is-placeholder">
                <div class="studio-preview studio-placeholder-preview" aria-hidden="true">
                  <div class="placeholder-inner">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="placeholder-icon" aria-hidden="true">
                      <!-- 灵动闪烁的主星（四角星光，象征灵感闪现） -->
                      <path d="M16 3c0 6-4.5 10.5-10.5 13 6 2.5 10.5 7 10.5 13 0-6 4.5-10.5 10.5-13-6-2.5-10.5-7-10.5-13z" fill="currentColor" fill-opacity="0.12" />
                      <!-- 右上角跳动的小光斑 -->
                      <circle cx="26" cy="6" r="1.5" fill="currentColor" />
                      <!-- 左下角伴生微星 -->
                      <path d="M7 23c0 2-1.5 3.5-3.5 4 2 .5 3.5 2 3.5 4 0-2 1.5-3.5 3.5-4-2-.5-3.5-2-3.5-4z" fill="currentColor" />
                    </svg>
                    <span class="placeholder-tip">${item.placeholderText || "更多作品孵化中…"}</span>
                  </div>
                </div>
                <div class="studio-card-header">
                  <span class="studio-card-title">${item.title || "更多想法孵化中…"}</span>
                  ${item.tag ? `<span class="studio-card-meta">${item.tag}</span>` : ""}
                </div>
              </div>
            `;
          }

          const imgSrc = item.image || item.poster || "";
          const hasTitle = Boolean(item.title && item.title.trim());
          const hasUrl = Boolean(item.url && item.url.trim());

          const headerHtml = hasTitle
            ? `<div class="studio-card-header">
                 <span class="studio-card-title">${item.title}</span>
                 ${item.tag ? `<span class="studio-card-meta">${item.tag}</span>` : ""}
               </div>`
            : "";

          const previewHtml = `
            <span class="studio-preview" aria-hidden="true">
              <img class="studio-poster" src="${imgSrc}" loading="lazy" decoding="async" alt="${item.title || "作品"}" />
            </span>
            ${headerHtml}
          `;

          if (hasUrl) {
            return `
              <a class="studio-card is-clickable" href="${item.url}" target="_blank" rel="noopener noreferrer">
                ${previewHtml}
              </a>
            `;
          } else {
            return `
              <div class="studio-card is-static">
                ${previewHtml}
              </div>
            `;
          }
        })
        .join("");
    }

    // 页脚
    const colophonEl = document.getElementById("footer-colophon");
    if (colophonEl) {
      colophonEl.textContent = data.colophon || "由 lxhcool 设计与构建";
    }

    const locEl = document.getElementById("footer-location");
    if (locEl) {
      locEl.textContent = data.location || "中国 · 厦门";
    }

    // 微信弹窗
    const qrImg = document.getElementById("modal-qr-img");
    if (qrImg && data.wechat) qrImg.src = data.wechat.qrCode;

    const wxIdEl = document.getElementById("modal-wx-id");
    if (wxIdEl && data.wechat) wxIdEl.textContent = `微信号：${data.wechat.id}`;
  }

  // 2. 悬停时间轴链接浮现预览图
  function initHoverPreviews() {
    const preview = document.querySelector(".project-preview");
    if (!preview) return;

    const triggers = document.querySelectorAll("[data-preview]");
    const canHover = window.matchMedia("(any-hover: hover)").matches;
    let hovered = null;

    function position(trigger) {
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(300, window.innerWidth - 32);
      const height = (width * 2) / 3;
      const gap = 16;
      const edge = 16;

      let left = rect.right + gap;
      let top = rect.top + rect.height / 2 - height / 2;

      if (left + width > window.innerWidth - edge) {
        left = rect.left - width - gap;
        if (left < edge) {
          left = Math.max(edge, Math.min(rect.left, window.innerWidth - width - edge));
          top = rect.bottom + gap;
        }
      }

      top = Math.max(edge, Math.min(top, window.innerHeight - height - edge));
      preview.style.left = `${left}px`;
      preview.style.top = `${top}px`;
    }

    triggers.forEach((trigger) => {
      trigger.addEventListener("pointerenter", (e) => {
        if (!canHover || e.pointerType === "touch") return;
        hovered = trigger;
        const src = trigger.dataset.preview;
        if (!src) return;

        preview.innerHTML = `<img src="${src}" alt="" />`;
        position(trigger);
        preview.classList.add("is-visible");
      });

      trigger.addEventListener("pointerleave", () => {
        hovered = null;
        preview.classList.remove("is-visible");
      });
    });

    window.addEventListener("scroll", () => {
      if (hovered) preview.classList.remove("is-visible");
    });
  }

  // 3. Grok Bot 灵动弹簧大眼萌黑球（复刻 Grok 角色弹簧动力学与视差眨眼，零图片依赖）
  function init3DAvatar() {
    const wrap = document.querySelector(".avatar-blob-wrap");
    const avatar = document.getElementById("grok-avatar");
    const body = document.getElementById("grok-body");
    const face = document.getElementById("grok-face");
    const eyeL = document.getElementById("grok-eye-l");
    const eyeR = document.getElementById("grok-eye-r");
    if (!wrap || !avatar || !face || !eyeL || !eyeR) return;

    // 弹簧物理模拟器 (Damped Spring Physics)
    function createSpring(val = 0, stiffness = 160, damping = 14) {
      return { val, target: val, vel: 0, stiffness, damping };
    }

    function updateSpring(s, dt) {
      const force = -s.stiffness * (s.val - s.target) - s.damping * s.vel;
      s.vel += force * dt;
      s.val += s.vel * dt;
    }

    // 核心姿态状态 (身体与面部视差分离)
    const turnX = createSpring(0, 140, 13); // 左右转动
    const turnY = createSpring(0, 140, 13); // 上下俯仰
    const squash = createSpring(1, 180, 12); // 果冻弹性压缩
    const blink = createSpring(1, 320, 24);  // 眨眼深度
    const roll = createSpring(0, 120, 14);   // 侧倾

    let targetGazeX = 0;
    let targetGazeY = 0;

    // 全局指针跟踪（计算相对于黑球中心的位置）
    function handlePointer(clientX, clientY) {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const spanX = Math.max(window.innerWidth * 0.45, 240);
      const spanY = Math.max(window.innerHeight * 0.45, 240);
      const dx = (clientX - cx) / spanX;
      const dy = (clientY - cy) / spanY;

      targetGazeX = Math.max(-1, Math.min(1, dx));
      targetGazeY = Math.max(-1, Math.min(1, dy));
      turnX.target = targetGazeX;
      turnY.target = targetGazeY;
      roll.target = targetGazeX * 0.12; // 转头时自然微侧倾
    }

    window.addEventListener("pointermove", (e) => {
      handlePointer(e.clientX, e.clientY);
    });

    document.addEventListener("pointerleave", () => {
      targetGazeX = 0;
      targetGazeY = 0;
      turnX.target = 0;
      turnY.target = 0;
      roll.target = 0;
    });

    // 精选灵感配色谱（经典原黑、电光克莱因蓝、牛油果抹茶、日落焦糖、赛博数码紫、极简赤红）
    const PALETTE = [
      { name: "经典沉思", body: null, eye: null },
      { name: "克莱因蓝", body: "#002fa7", eye: "#ffffff" },
      { name: "森林抹茶", body: "#2d5a3f", eye: "#f4fbf6" },
      { name: "落日焦糖", body: "#d95328", eye: "#fff5eb" },
      { name: "赛博电紫", body: "#7c3aed", eye: "#faf5ff" },
      { name: "赤子之心", body: "#e11d48", eye: "#fff1f2" }
    ];
    let colorIdx = 0;

    // 点击交互：萌感果冻 Q 弹 + 快速眨眼 + 变色切肤
    wrap.addEventListener("click", () => {
      squash.val = 0.78; // 瞬间果冻受压弹起
      blink.val = 0.05;  // 俏皮闭眼
      turnY.target = 0.45;
      roll.target = (Math.random() - 0.5) * 0.4; // 摇晃一下

      colorIdx = (colorIdx + 1) % PALETTE.length;
      const theme = PALETTE[colorIdx];

      if (theme.body) {
        avatar.style.setProperty("--grok-body-color", theme.body);
        avatar.style.setProperty("--grok-eye-color", theme.eye);
      } else {
        avatar.style.removeProperty("--grok-body-color");
        avatar.style.removeProperty("--grok-eye-color");
      }

      showToast(`切换心情：${theme.name}`);

      setTimeout(() => {
        turnY.target = 0;
        roll.target = 0;
      }, 180);
    });

    // 自然随机眨眼调度
    let nextBlinkTime = performance.now() + 2500;
    function checkBlink(now) {
      if (now >= nextBlinkTime) {
        blink.target = 0.05; // 闭眼
        setTimeout(() => {
          blink.target = 1;  // 睁开
        }, 85);
        nextBlinkTime = now + 2400 + Math.random() * 4500;
      }
    }

    // 动画主循环
    let lastTime = performance.now();
    function animate(now) {
      requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      checkBlink(now);

      updateSpring(turnX, dt);
      updateSpring(turnY, dt);
      updateSpring(squash, dt);
      updateSpring(blink, dt);
      updateSpring(roll, dt);

      // 1. 身体 (Blob) 3D 偏转与弹性形变
      const bodyX = turnX.val * 8;
      const bodyY = turnY.val * 6;
      const deg = roll.val * 14;
      const sY = squash.val;
      const sX = 1 / Math.sqrt(sY || 1); // 保持体积守恒的果冻挤压
      body.setAttribute("transform", `translate(${bodyX}, ${bodyY}) rotate(${deg}, 114, 114) scale(${sX}, ${sY})`);

      // 2. 球面视差面部位置 (从球心 114, 114 出发，向左、右、上、下大幅度真实转动)
      // 最大左右可转动 52px，无论鼠标在最左还是最右，眼睛都完整且自然移至球面对应边缘
      const faceShiftX = 114 + turnX.val * 52;
      const faceShiftY = 114 + turnY.val * 42;
      face.setAttribute("transform", `translate(${faceShiftX}, ${faceShiftY}) rotate(${deg * 0.7})`);

      // 3. 眼睛开合与整体缩放（保持双眼比例恒定匀称，不出现一只过大一只过小）
      const b = Math.max(0.06, blink.val);
      eyeL.setAttribute("transform", `scale(1, ${b})`);
      eyeR.setAttribute("transform", `scale(1, ${b})`);
    }

    animate(performance.now());
  }

  // 4. 底部实时时钟（包含年月日 时分秒）
  function initLocalTime() {
    const timeEl = document.querySelector("[data-local-time]");
    if (!timeEl) return;

    function update() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const date = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      // 完整格式：YYYY年MM月DD日 HH:mm:ss
      timeEl.textContent = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds}`;
    }

    update();
    setInterval(update, 1000);
  }

  // 5. 复制与中文 Toast 提示
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
  }

  function copyText(text, label) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast(`已复制${label}：${text}`));
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        showToast(`已复制${label}：${text}`);
      } catch (e) {
        showToast(text);
      }
      document.body.removeChild(ta);
    }
  }

  // 6. 微信弹窗与深浅色模式切换
  function initModalAndTheme() {
    const modal = document.getElementById("wechat-modal");

    document.addEventListener("click", (e) => {
      const actionEl = e.target.closest("[data-action]");
      if (!actionEl) return;

      const action = actionEl.dataset.action;
      if (action === "open-wechat") {
        modal?.classList.add("is-open");
      } else if (action === "copy-wechat") {
        const d = getData();
        const id = actionEl.dataset.wxId || d.socials?.wechat?.id || d.wechat?.id || "lxhcooool";
        copyText(id, "微信号");
        if (typeof actionEl.blur === "function") actionEl.blur();
      } else if (action === "copy-email") {
        const d = getData();
        const email = actionEl.dataset.email || d.socials?.email || "mumumumuhui@gmail.com";
        copyText(email, "邮箱");
      }
    });

    document.getElementById("close-modal")?.addEventListener("click", () => {
      modal?.classList.remove("is-open");
    });

    modal?.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("is-open");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("is-open")) {
        modal.classList.remove("is-open");
      }
    });

    // 深浅色模式切换（SVG 图标）
    const THEME_ICONS = {
      sun: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
      moon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
    };

    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("lxhcool-theme") || "light";

    function updateThemeUI(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      if (themeBtn) {
        themeBtn.innerHTML = theme === "dark" ? THEME_ICONS.sun : THEME_ICONS.moon;
        themeBtn.setAttribute("title", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
        themeBtn.setAttribute("aria-label", theme === "dark" ? "切换到浅色模式" : "切换到深色模式");
      }
    }

    updateThemeUI(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        updateThemeUI(next);
        localStorage.setItem("lxhcool-theme", next);
      });
    }
  }

  // 7. 回到顶部按钮逻辑（滚动超过 260px 时淡入展示）
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;

    function checkScroll() {
      if (window.scrollY > 240) {
        btn.classList.add("is-visible");
      } else {
        btn.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  function start() {
    renderContent();
    initHoverPreviews();
    init3DAvatar();
    initLocalTime();
    initModalAndTheme();
    initBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
