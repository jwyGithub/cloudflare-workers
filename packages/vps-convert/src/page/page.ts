import { DEFAULT_CONFIG } from '../config';
import backendConfig from './backendConfig';
import remoteConfig from './remoteConfig';
import shortUrlConfig from './shortUrlConfig';
import targetConfig from './targetConfig';

function getRemoteConfig(envConfig = ''): { label: string; value: string }[] {
    const envConfigArr = envConfig.split('\n').filter(Boolean);
    return envConfigArr.reduce<{ label: string; value: string }[]>((acc, cur) => {
        acc.unshift({
            label: cur,
            value: cur
        });
        return acc;
    }, remoteConfig);
}

function getBackendOptions(origin: string): { label: string; value: string }[] {
    return [{ label: origin, value: origin }, ...backendConfig];
}

function getShortUrlOptions(shortServer: string): { label: string; value: string }[] {
    const shortServerArr = shortServer.split('\n').filter(Boolean);
    return shortServerArr.reduce<{ label: string; value: string }[]>((acc, cur) => {
        acc.push({ label: cur, value: cur });
        return acc;
    }, shortUrlConfig);
}

export function showPage(request: Request, env: Env): Response {
    const remoteConfig = getRemoteConfig(env.REMOTE_CONFIG || DEFAULT_CONFIG.REMOTE_CONFIG);
    const shortUrlOptions = getShortUrlOptions(env.SHORT_SERVER || DEFAULT_CONFIG.SHORT_SERVER);
    const backendOptions = getBackendOptions(new URL(request.url).origin);
    const html = `
        <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>订阅转换</title>
                <style>
                    :root {
                        --primary: #1677ff;
                        --error: #ff4d4f;
                        --text: #000000d9;
                        --text-secondary: #00000073;
                        --border: #d9d9d9;
                        --component-bg: #ffffff;
                    }

                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                        margin: 0;
                        padding: 24px;
                        background: #f5f5f5;
                    }

                    .container {
                        max-width: 80%;
                        margin: 0 auto;
                        background: var(--component-bg);
                        padding: 24px;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    }

                    .form-item {
                        margin-bottom: 24px;
                        display: flex;
                        align-items: flex-start;
                    }

                    .form-label {
                        width: 100px;
                        flex-shrink: 0;
                        text-align: right;
                        padding: 5px 12px 0 0;
                        color: var(--text);
                        font-size: 14px;
                        line-height: 1.5715;
                    }

                    .form-content {
                        flex: 1;
                        min-width: 0;
                    }

                    .form-input {
                        width: 100%;
                        padding: 4px 11px;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        transition: all 0.3s;
                        min-height: 32px;
                        box-sizing: border-box;
                    }

                    textarea.form-input {
                        min-height: 100px;
                        resize: vertical;
                    }

                    .form-input:hover {
                        border-color: var(--primary);
                    }

                    .form-input:focus {
                        border-color: var(--primary);
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
                    }

                    .btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 15px;
                        font-size: 14px;
                        border-radius: 6px;
                        border: 1px solid var(--border);
                        background: var(--component-bg);
                        color: var(--text);
                        cursor: pointer;
                        transition: all 0.3s;
                        height: 32px;
                        white-space: nowrap;
                        width: 100%;
                        position: relative;
                    }

                    .btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .btn .text {
                        flex: 1;
                        text-align: center;
                    }

                    .btn .icon {
                        margin-left: 4px;
                        color: var(--text-secondary);
                    }

                    .btn .icon svg {
                        width: 14px;
                        height: 14px;
                        transition: transform 0.3s;
                    }

                    .btn .icon svg path {
                        fill: currentColor;
                    }

                    .btn.expanded .icon {
                        color: var(--primary);
                    }

                    .btn.expanded .icon svg {
                        transform: rotate(180deg);
                    }

                    .btn:hover .icon {
                        color: var(--primary);
                    }

                    .collapse-content {
                        display: none;
                        opacity: 0;
                        transition: opacity 0.3s;
                    }

                    .collapse-content.show {
                        display: block;
                        opacity: 1;
                    }

                    .options-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 12px;
                        padding: 16px;
                        background: #fafafa;
                        border-radius: 6px;
                    }

                    .checkbox-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        font-size: 14px;
                        color: var(--text);
                        cursor: pointer;
                    }

                    .checkbox-item:has(input:checked) {
                        color: var(--primary);
                    }

                    .checkbox-item input[type='checkbox'] {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        cursor: pointer;
                        accent-color: var(--primary);
                    }

                    .checkbox-item:hover {
                        color: var(--primary);
                    }

                    .btn {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        padding: 4px 15px;
                        font-size: 14px;
                        border-radius: 6px;
                        border: 1px solid var(--border);
                        background: var(--component-bg);
                        color: var(--text);
                        cursor: pointer;
                        transition: all 0.3s;
                        height: 32px;
                        white-space: nowrap;
                    }

                    .btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .select-wrapper {
                        position: relative;
                        width: 100%;
                    }

                    .select-input {
                        height: 20px;
                        padding: 4px 11px;
                        background: #fff;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        user-select: none;
                    }

                    .select-input:hover {
                        border-color: var(--primary);
                    }

                    .select-value {
                        color: var(--text);
                        font-size: 14px;
                    }

                    .select-arrow {
                        width: 14px;
                        height: 14px;
                        transition: transform 0.3s;
                        color: var(--text-secondary);
                    }

                    .select-wrapper.open .select-arrow {
                        transform: rotate(180deg);
                        color: var(--primary);
                    }

                    .select-options {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        margin-top: 4px;
                        background: white;
                        border-radius: 6px;
                        box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08);
                        max-height: 256px;
                        overflow-y: auto;
                        z-index: 1000;
                        display: none;
                        padding: 4px 0;
                    }

                    .select-wrapper.open .select-options {
                        display: block;
                    }

                    .select-option {
                        padding: 8px 12px;
                        cursor: pointer;
                        font-size: 14px;
                        color: var(--text);
                        transition: all 0.2s;
                        display: flex;
                        align-items: center;
                    }

                    .select-option:hover {
                        background: #f5f5f5;
                        color: var(--primary);
                    }

                    .select-option.selected {
                        color: var(--primary);
                        font-weight: 500;
                        background: #e6f4ff;
                    }

                    .select-option.selected:hover {
                        background: #bae0ff;
                    }

                    .input-group {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }

                    .input-group .form-input {
                        flex: 1;
                        background-color: #fafafa;
                        color: var(--text-secondary);
                        cursor: not-allowed;
                    }

                    .input-group .form-input:disabled {
                        border-color: var(--border);
                        -webkit-text-fill-color: var(--text-secondary);
                        opacity: 1;
                    }

                    .input-group .form-input:disabled:hover {
                        border-color: var(--border);
                    }

                    .copy-btn {
                        display: inline-flex;
                        align-items: center;
                        gap: 4px;
                        padding: 4px 15px;
                        height: 32px;
                        background: white;
                        border: 1px solid var(--border);
                        border-radius: 6px;
                        color: var(--text);
                        font-size: 14px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }

                    .copy-btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .copy-btn svg {
                        width: 14px;
                        height: 14px;
                    }

                    .button-group {
                        display: flex;
                        gap: 12px;
                        justify-content: center;
                        max-width: 400px;
                        margin: 0 auto;
                    }

                    .submit-btn {
                        min-width: 120px;
                        height: 32px;
                        padding: 4px 15px;
                        border-radius: 6px;
                        font-size: 14px;
                        cursor: pointer;
                        border: 1px solid var(--border);
                        background: white;
                        color: var(--text);
                        transition: all 0.3s;
                        flex: 0 1 auto;
                    }

                    .submit-btn:hover {
                        color: var(--primary);
                        border-color: var(--primary);
                    }

                    .submit-btn.primary {
                        background: var(--primary);
                        color: white;
                        border-color: var(--primary);
                    }

                    .submit-btn.primary:hover {
                        opacity: 0.8;
                        color: white;
                    }

                    .submit-btn:disabled {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                        cursor: not-allowed;
                    }

                    .submit-btn.primary:disabled {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                    }

                    .submit-btn:disabled:hover {
                        background: #f5f5f5;
                        border-color: var(--border);
                        color: rgba(0, 0, 0, 0.25);
                    }
                </style>
            </head>
            <body>
                <div class="container">

                    <header>
                        <h2 style="text-align: center;">订阅转换</h2>
                    </header>
                
                    <form id="convertForm">
                        <div class="form-item">
                            <label class="form-label">订阅链接:</label>
                            <div class="form-content">
                                <textarea class="form-input" name="url" placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"></textarea>
                            </div>
                        </div>
                        <!-- 生成类型 -->
                        <div class="form-item form-target"> </div>
                        <!-- 远程配置 -->
                        <div class="form-item form-config"> </div>
                        <!-- 后端地址 -->
                        <div class="form-item form-backend"> </div>

                        <div class="form-item">
                            <label class="form-label">高级功能:</label>
                            <div class="form-content">
                                <button type="button" class="btn" onclick="toggleCollapse(this)">
                                    <span class="text">点击显示/隐藏</span>
                                    <span class="icon">
                                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                                            />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div class="collapse-content">
                            <div class="form-item form-short-url"> </div>
                            <div class="form-item">
                                <label class="form-label">高级选项:</label>
                                <div class="form-content">
                                    <div class="options-grid">
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="emoji" checked />
                                            <span>Emoji</span>
                                        </label>
                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="new_name" checked />
                                            <span>Clash New Field</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="udp" />
                                            <span>启用 UDP</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="sort"  />
                                            <span>排序节点</span>
                                        </label>

                                        <label class="checkbox-item">
                                            <input type="checkbox" name="options" value="tfo" />
                                            <span>启用TFO</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-item form-subscribe">
                            <label class="form-label">定制订阅:</label>
                            <div class="form-content">
                                <div class="input-group">
                                    <input type="text" 
                                           class="form-input" 
                                           value="" 
                                           disabled>
                                    <button type="button" class="copy-btn" onclick="copyToClipboard('form-subscribe')">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                        </svg>
                                        复制
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-item form-short-url">
                            <label class="form-label">订阅短链:</label>
                            <div class="form-content">
                                <div class="input-group">
                                    <input type="text" 
                                           class="form-input" 
                                           disabled>
                                    <button type="button" class="copy-btn" onclick="copyToClipboard('form-short-url')">
                                        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                            <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                                        </svg>
                                        复制
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="form-item">
                            <label class="form-label"></label>
                            <div class="form-content">
                                <div class="button-group">
                                    <button type="button" class="submit-btn primary" id="generateBtn" disabled>生成订阅链接</button>
                                    <button type="button" class="submit-btn" id="shortUrlBtn" disabled>生成短链接</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <script>
                    function createSelect(label, key, options, rootNode) {
                        const defaultLabel = options[0]?.label || '';
                        const defaultValue = options[0]?.value || '';
                        rootNode.innerHTML = \`
                            <label class="form-label" data-key="\${key}">\${label}:</label>
                            <div class="form-content">
                                <div class="select-wrapper">
                                    <div class="select-input" onclick="toggleSelect(this)">
                                        <span class="select-value" data-value="\${defaultValue}">\${defaultLabel}</span>
                                        <span class="select-arrow">
                                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="select-options">
                                        \${options.map(option => \`<div class="select-option" data-value="\${option.value}" onclick="selectOption(this, '\${option.label}', '\${option.value}')">\${option.label}</div>\`).join('')}
                                    </div>
                                </div>
                            </div>
                        \`;
                    }

                    createSelect('生成类型', 'target', ${JSON.stringify(targetConfig)}, document.querySelector('.form-target'));
                    createSelect('远程配置', 'config', ${JSON.stringify(remoteConfig)}, document.querySelector('.form-config'));
                    createSelect('后端地址', 'backend', ${JSON.stringify(backendOptions)}, document.querySelector('.form-backend'));
                    createSelect('短链服务', 'short_url', ${JSON.stringify(shortUrlOptions)}, document.querySelector('.form-short-url'));

                    function toggleCollapse(btn) {
                        const content = btn.closest('.form-item').nextElementSibling;
                        btn.classList.toggle('expanded');
                        content.classList.toggle('show');
                    }

                    function toggleSelect(input) {
                        const wrapper = input.closest('.select-wrapper');
                        wrapper.classList.toggle('open');

                        // 关闭其他打开的下拉框
                        document.querySelectorAll('.select-wrapper.open').forEach(el => {
                            if (el !== wrapper) {
                                el.classList.remove('open');
                            }
                        });
                    }

                    function selectOption(option, label, value) {
                        const options = option.closest('.select-wrapper').querySelectorAll('.select-option');
                        const wrapper = option.closest('.select-wrapper');
                        const valueSpan = wrapper.querySelector('.select-value');

                        valueSpan.setAttribute('data-value', value);
                        valueSpan.textContent = label;

                        // 更新选中状态的样式
                        options.forEach(opt => opt.classList.remove('selected'));
                        option.classList.add('selected');
                        
                        // 关闭下拉框
                        wrapper.classList.remove('open');

                        // 如果是短链服务的选择，检查短链按钮状态
                        if (wrapper.closest('.form-short-url')) {
                            checkShortUrlButtonState();
                        }
                    }

                    // 点击外部关闭下拉框
                    document.addEventListener('click', e => {
                        if (!e.target.closest('.select-wrapper')) {
                            document.querySelectorAll('.select-wrapper').forEach(wrapper => {
                                wrapper.classList.remove('open');
                            });
                        }
                    });

                    function copyToClipboard(form) {
                        const input = document.querySelector(\`.\${form} .form-input\`);
                        input.select();
                        input.setSelectionRange(0, 99999);
                        navigator.clipboard.writeText(input.value);

                        const btn = document.querySelector(\`.\${form} .copy-btn\`);
                        btn.textContent = '已复制';
                        setTimeout(() => {
                            btn.textContent = '复制';
                        }, 1000);
                    }

                    // 监听订阅链接输入框的变化
                    document.querySelector('textarea[name="url"]').addEventListener('input', function(e) {
                        const generateBtn = document.getElementById('generateBtn');
                        const hasValue = !!e.target.value.trim();
                        generateBtn.disabled = !hasValue;
                        
                        // 检查短链按钮状态
                        checkShortUrlButtonState();
                    });

                    // 检查短链按钮是否可用
                    function checkShortUrlButtonState() {
                        const shortUrlBtn = document.getElementById('shortUrlBtn');
                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        const shortUrlSelect = document.querySelector('.form-short-url .select-value');
                        
                        // 只有当订阅链接已生成且选择了短链服务时才可点击
                        const hasSubscribeUrl = !!subscribeInput.value.trim();
                        const hasShortUrlService = shortUrlSelect && shortUrlSelect.getAttribute('data-value') !== 'none';
                        
                        shortUrlBtn.disabled = !hasSubscribeUrl || !hasShortUrlService;
                    }

                    // 生成订阅链接
                    function generateSubscribe() {
                        // 获取表单元素
                        const form = document.getElementById('convertForm');
                        const formData = new FormData(form);
                        
                        // 获取基本表单数据
                        const data = {
                            url: formData.get('url'),
                            target: document.querySelector('.form-target .select-value').getAttribute('data-value'),
                            config: document.querySelector('.form-config .select-value').getAttribute('data-value'),
                            backend: document.querySelector('.form-backend .select-value').getAttribute('data-value'),
                        };

                        // 获取高级选项的复选框值
                        const options = [];
                        document.querySelectorAll('input[name="options"]').forEach(checkbox => {
                            options.push({
                                key: checkbox.value,
                                value: checkbox.checked
                            });
                        });
                        data.options = options;

                        // 获取短链服务
                        const shortUrlValue = document.querySelector('.form-short-url .select-value').getAttribute('data-value');
                        if (shortUrlValue && shortUrlValue !== '不使用') {
                            data.shortUrl = shortUrlValue;
                        }

                        const url = new URL(data.backend + '/sub');
                        url.searchParams.set('target', data.target);
                        url.searchParams.set('url', data.url);
                        url.searchParams.set('insert', 'false');
                        url.searchParams.set('config', data.config);
                        url.searchParams.set('list', false);
                        url.searchParams.set('scv', false);
                        url.searchParams.set('fdn', false);

                        data.options.forEach(option => {
                            url.searchParams.set(option.key, option.value);
                        });
                        
                        const subUrl = url.toString();

                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        subscribeInput.value = subUrl;

                        // 生成订阅链接后检查短链按钮状态
                        checkShortUrlButtonState();
                    }

                    // 修改按钮添加点击事件
                    document.getElementById('generateBtn').onclick = generateSubscribe;

                    async function generateShortUrl() {
                        // 获取生成的订阅链接
                        const subscribeInput = document.querySelector('.form-subscribe .form-input');
                        const longUrl = subscribeInput.value;

                        // 获取选中的短链服务
                        const shortUrlService = document.querySelector('.form-short-url .select-value').getAttribute('data-value');

                        // 构建请求数据
                        const requestData = {
                            serve: shortUrlService,
                            long_url: longUrl
                        };

                        // 发送请求
                        const response = await fetch(\`\${shortUrlService}/api/add\`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                        })

                        if (response.ok) {
                            const data = await response.json();
                            const shortUrlInput = document.querySelector('.form-short-url .form-input');
                            shortUrlInput.value = data.data.short_url;
                        } else {
                            alert('生成短链接失败');
                        }
                    }

                    // 添加按钮点击事件
                    document.getElementById('shortUrlBtn').onclick = generateShortUrl;

                    // 监听短链服务选择变化
                    document.querySelector('.form-short-url').addEventListener('click', function(e) {
                        if (e.target.closest('.select-option')) {
                            // 当选择变化时检查短链按钮状态
                            setTimeout(checkShortUrlButtonState, 0);
                        }
                    });
                </script>
            </body>
        </html>
    `;

    return new Response(html, {
        headers: new Headers({
            'Content-Type': 'text/html; charset=UTF-8'
        })
    });
}
