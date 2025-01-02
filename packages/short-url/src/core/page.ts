export function handlePageRequest(): Response {
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>短链接管理</title>
    <style>
        :root {
            /* 亮色主题变量 */
            --primary: #1677ff;
            --success: #52c41a;
            --error: #ff4d4f;
            --bg: #f5f5f5;
            --component-bg: #ffffff;
            --border: #d9d9d9;
            --text: rgba(0, 0, 0, 0.88);
            --text-secondary: rgba(0, 0, 0, 0.45);
            --hover-bg: rgba(0, 0, 0, 0.04);
            --shadow: rgba(0, 0, 0, 0.08);
        }

        /* 暗色主题变量 */
        [data-theme='dark'] {
            --primary: #1668dc;
            --success: #49aa19;
            --error: #dc4446;
            --bg: #141414;
            --component-bg: #1f1f1f;
            --border: #424242;
            --text: rgba(255, 255, 255, 0.85);
            --text-secondary: rgba(255, 255, 255, 0.45);
            --hover-bg: rgba(255, 255, 255, 0.08);
            --shadow: rgba(0, 0, 0, 0.2);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5715;
            color: var(--text);
            background: var(--bg);
            padding: 24px;
            transition: all 0.3s;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        .search-bar {
            background: var(--component-bg);
            box-shadow: 0 1px 2px 0 var(--shadow);
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 16px;
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .search-bar label {
            color: var(--text);
            margin-right: 8px;
        }

        .content-box {
            background: var(--component-bg);
            box-shadow: 0 1px 2px 0 var(--shadow);
            border-radius: 8px;
            overflow: hidden;
        }

        .content-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        input {
            background: transparent;
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 4px 11px;
            height: 32px;
            color: var(--text);
            transition: all 0.3s;
            font-size: 14px;
        }

        input:hover {
            border-color: var(--primary);
        }

        input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2);
        }

        button {
            height: 32px;
            padding: 4px 15px;
            border-radius: 6px;
            border: none;
            background: var(--primary);
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }

        button:hover {
            opacity: 0.85;
        }

        button.default {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--text);
        }

        button.default:hover {
            border-color: var(--primary);
            color: var(--primary);
        }

        .table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
        }

        .table th,
        .table td {
            padding: 5px 16px;
            text-align: left;
            border-bottom: 1px solid var(--border);
            border-bottom-color: rgba(0, 0, 0, 0.06);
        }

        .table th {
            background: var(--component-bg);
            color: var(--text);
            font-weight: 500;
            white-space: nowrap;
            border-bottom: 1px solid var(--border);
        }

        .table td {
            color: var(--text);
        }

        .table tr:hover td {
            background-color: rgba(0, 0, 0, 0.02);
        }

        [data-theme='dark'] .table td {
            border-bottom-color: rgba(255, 255, 255, 0.04);
        }

        [data-theme='dark'] .table tr:hover td {
            background-color: rgba(255, 255, 255, 0.02);
        }

        .actions {
            display: flex;
            gap: 8px;
        }

        .btn-delete {
            background: transparent;
            border: 1px solid var(--border);
            color: var(--error);
        }

        .btn-delete:hover {
            background: var(--error);
            color: white;
            border-color: var(--error);
        }

        .pagination {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
        }

        .pagination-info {
            color: var(--text-secondary);
            font-size: 14px;
        }

        .pagination-buttons {
            display: flex;
            gap: 8px;
        }

        .pagination-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 32px;
            height: 32px;
            padding: 0 8px;
            font-size: 14px;
            border: 1px solid var(--border);
            border-radius: 6px;
            background: var(--component-bg);
            color: var(--text);
            cursor: pointer;
            transition: all 0.3s;
        }

        .pagination-button:hover:not(:disabled) {
            border-color: var(--primary);
            color: var(--primary);
        }

        .pagination-button:disabled {
            cursor: not-allowed;
            color: var(--text-secondary);
            background: rgba(0, 0, 0, 0.04);
        }

        .pagination-button.active {
            border-color: var(--primary);
            background: var(--primary);
            color: #fff;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.45);
            z-index: 1000;
        }

        .modal.show {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: var(--component-bg);
            border-radius: 8px;
            width: 90%;
            max-width: 520px;
            box-shadow: 0 6px 16px 0 var(--shadow);
        }

        .modal-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
        }

        .modal-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--text);
        }

        .modal-close {
            position: absolute;
            right: 16px;
            top: 16px;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-size: 16px;
            padding: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .modal-close:hover {
            color: var(--text);
        }

        .modal-body {
            padding: 32px 24px;
        }

        .form-item {
            display: flex;
            align-items: flex-start;
            position: relative;
        }

        .form-label {
            width: 100px;
            padding-right: 12px;
            line-height: 32px;
            text-align: right;
            color: var(--text);
            font-size: 14px;
        }

        .form-content {
            flex: 1;
            min-width: 0;
        }

        .form-input {
            width: 100%;
            padding: 4px 11px;
            background: var(--component-bg);
            border: 1px solid var(--border);
            border-radius: 6px;
            height: 32px;
            color: var(--text);
            transition: all 0.3s;
        }

        .form-input.error {
            border-color: var(--error);
        }

        .form-input.error:focus {
            box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2);
        }

        .form-error {
            display: none;
            color: var(--error);
            font-size: 12px;
            margin-top: 4px;
        }

        .form-error.show {
            display: block;
        }

        .form-help {
            margin-top: 8px;
            color: var(--text-secondary);
            font-size: 12px;
        }

        .modal-footer {
            padding: 16px 24px;
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: flex-end;
            gap: 8px;
        }

        .modal-footer button {
            min-width: 72px;
        }

        .message {
            display: none;
            padding: 8px 16px;
            border-radius: 6px;
            margin-bottom: 16px;
            font-size: 14px;
        }

        .message.success {
            display: block;
            background: rgba(82, 196, 26, 0.15);
            border: 1px solid rgba(82, 196, 26, 0.3);
            color: var(--success);
        }

        .message.error {
            display: block;
            background: rgba(255, 77, 79, 0.15);
            border: 1px solid rgba(255, 77, 79, 0.3);
            color: var(--error);
        }

        .toast {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translateX(-50%);
            padding: 9px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
            line-height: 1.5715;
            z-index: 1100;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            pointer-events: none;
        }

        .toast.show {
            opacity: 1;
            transform: translate(-50%, 0);
        }

        .toast.success {
            background: var(--component-bg);
            border: 1px solid var(--border);
            color: var(--text);
        }

        .toast.error {
            background: var(--component-bg);
            border: 1px solid var(--border);
            color: var(--text);
        }

        .toast-icon {
            font-size: 16px;
            display: inline-flex;
        }

        .toast-icon.success {
            color: var(--success);
        }

        .toast-icon.error {
            color: var(--error);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="search-bar">
            <label>短链ID:</label>
            <input type="text" id="searchUrl" placeholder="请输入短链接">
            <button onclick="searchUrl()">查询</button>
            <button class="default" onclick="resetSearch()">重置</button>
        </div>

        <div class="content-box">
            <div class="content-header">
                <h3>短链接列表</h3>
                <button onclick="showAddModal()">新增</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>短链接</th>
                        <th>原始链接</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="urlList"></tbody>
            </table>
            <div id="pagination"></div>
        </div>
    </div>

    <div id="addModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>新增短链接</h3>
                <button class="modal-close" onclick="closeAddModal()">×</button>
            </div>
            <div class="modal-body">
                <form onsubmit="event.preventDefault(); addUrl();">
                    <div class="form-item">
                        <label class="form-label">原始链接</label>
                        <div class="form-content">
                            <input 
                                type="url" 
                                id="longUrl" 
                                class="form-input"
                                placeholder="请输入需要转换的链接地址"
                            >
                            <div id="urlError" class="form-error"></div>
                            <div class="form-help">请输入完整的 URL 地址，包含 http:// 或 https://</div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="default" onclick="closeAddModal()">取消</button>
                <button onclick="addUrl()">确定</button>
            </div>
        </div>
    </div>

    <script>
        let currentPage = 1;
        const pageSize = 10;

        async function loadUrls(page = 1) {
            try {
                const response = await fetch('/api/queryList?page=' + page + '&pageSize=' + pageSize);
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);
                
                currentPage = page;
                renderTable(data.data.items);
                renderPagination(data.data.total);
            } catch (error) {
                showMessage(error.message, 'error');
            }
        }

        function renderTable(items) {
            const tbody = document.getElementById('urlList');

            tbody.innerHTML = items.map(item => \`
                <tr>
                    <td>\${item.id}</td>
                    <td><a href="\${item.short_url}" target="_blank">\${item.short_url || '-'}</a></td>
                    <td><a href="\${item.long_url}" target="_blank">\${item.long_url || '-'}</a></td>
                    <td class="actions">
                        <button onclick="deleteUrl('\${item.short_code}')" class="btn-delete">删除</button>
                    </td>
                </tr>
            \`).join('');
        }

        function renderPagination(total) {
            const totalPages = Math.ceil(total / pageSize);
            const pagination = document.getElementById('pagination');
            
            const prevIcon = \`
                <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                    <path d="M561.88 204.31L308.95 459.24a8.03 8.03 0 000 11.31L561.88 725.5c2.62 2.63 6.94 2.63 9.56 0l42.67-42.92c2.62-2.63 2.62-6.94 0-9.56L451.67 512l162.44-161.02c2.62-2.63 2.62-6.94 0-9.56l-42.67-42.92a6.71 6.71 0 00-9.56.81z"></path>
                </svg>
            \`;

            const nextIcon = \`
                <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                    <path d="M462.12 725.69l252.93-254.93a8.03 8.03 0 000-11.31L462.12 204.52c-2.62-2.63-6.94-2.63-9.56 0l-42.67 42.92c-2.62 2.63-2.62 6.94 0 9.56L572.33 418l-162.44 161.02c-2.62 2.63-2.62 6.94 0 9.56l42.67 42.92c2.62 2.63 6.94 2.63 9.56-.81z"></path>
                </svg>
            \`;

            pagination.innerHTML = \`
                <div class="pagination">
                    <span class="pagination-info">
                        显示 \${(currentPage - 1) * pageSize + 1}-\${Math.min(currentPage * pageSize, total)} 条，共 \${total} 条
                    </span>
                    <div class="pagination-buttons">
                        <button 
                            class="pagination-button" 
                            onclick="loadUrls(\${currentPage - 1})"
                            \${currentPage === 1 ? 'disabled' : ''}
                        >\${prevIcon}</button>
                        <button 
                            class="pagination-button active"
                        >\${currentPage}</button>
                        <button 
                            class="pagination-button" 
                            onclick="loadUrls(\${currentPage + 1})"
                            \${currentPage >= totalPages ? 'disabled' : ''}
                        >\${nextIcon}</button>
                    </div>
                </div>
            \`;
        }

        async function searchUrl() {
            const input = document.getElementById('searchUrl');
            const code = input.value.trim();
            
            if (!code) {
                showMessage('请输入短链接', 'error');
                return;
            }

            try {
                const response = await fetch('/api/queryByCode?code=' + code);
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);
                
                renderTable([data.data]);
                document.getElementById('pagination').innerHTML = '';
            } catch (error) {
                showMessage(error.message, 'error');
            }
        }

        function resetSearch() {
            document.getElementById('searchUrl').value = '';
            loadUrls(1);
        }

        async function addUrl() {
            const input = document.getElementById('longUrl');
            const error = document.getElementById('urlError');
            const long_url = input.value.trim();
            
            // 重置错误状态
            input.classList.remove('error');
            error.classList.remove('show');
            error.textContent = '';
            
            if (!long_url) {
                input.classList.add('error');
                error.textContent = '请输入链接地址';
                error.classList.add('show');
                return;
            }

            try {
                new URL(long_url);
            } catch {
                input.classList.add('error');
                error.textContent = '请输入有效的链接地址';
                error.classList.add('show');
                return;
            }

            try {
                const response = await fetch('/api/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ long_url })
                });

                const data = await response.json();
                if (data.error) throw new Error(data.error);
                
                showMessage('添加成功', 'success');
                closeAddModal();
                loadUrls(currentPage);
            } catch (error) {
                showMessage(error.message, 'error');
            }
        }

        async function deleteUrl(code) {
            if (!confirm('确定要删除该短链接吗？')) {
                return;
            }

            try {
                const response = await fetch('/api/delete?code=' + code, {
                    method: 'DELETE'
                });
                const data = await response.json();
                
                if (data.error) throw new Error(data.error);
                
                showMessage('删除成功', 'success');
                loadUrls(currentPage);
            } catch (error) {
                showMessage(error.message, 'error');
            }
        }

        function showMessage(text, type) {
            const toast = document.createElement('div');
            toast.className = \`toast \${type}\`;
            
            // 使用 SVG 图标
            const successIcon = \`
                <svg class="toast-icon success" viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
                </svg>
            \`;
            
            const errorIcon = \`
                <svg class="toast-icon error" viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                </svg>
            \`;
            
            toast.innerHTML = \`
                \${type === 'success' ? successIcon : errorIcon}
                <span>\${text}</span>
            \`;
                
            document.body.appendChild(toast);
            
            // 触发重绘以启动动画
            toast.offsetHeight;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }

        function showAddModal() {
            document.getElementById('addModal').classList.add('show');
            document.getElementById('longUrl').focus();
        }

        function closeAddModal() {
            const modal = document.getElementById('addModal');
            const input = document.getElementById('longUrl');
            const error = document.getElementById('urlError');
            
            // 重置所有状态
            modal.classList.remove('show');
            input.value = '';
            input.classList.remove('error');
            error.classList.remove('show');
            error.textContent = '';
        }

        // 主题切换功能
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }

        // 初始化主题
        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.body.setAttribute('data-theme', savedTheme);
        }

        // 初始化
        initTheme();
        loadUrls();
    </script>
</body>
</html>`;

    return new Response(html, {
        headers: {
            'content-type': 'text/html;charset=UTF-8'
        }
    });
}
