export function generateHTML(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Universal Resource Downloader</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #000000;
            --border-color: #e0e0e0;
            --hover-color: #f5f5f5;
            --card-bg: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.1);
            --error-color: #FF3B30;
            --success-color: #34C759;
            --warning-color: #FF9500;
            --info-color: #007AFF;
        }

        [data-theme="dark"] {
            --bg-color: #1c1c1e;
            --text-color: #ffffff;
            --border-color: #2c2c2e;
            --hover-color: #2c2c2e;
            --card-bg: #2c2c2e;
            --shadow-color: rgba(0, 0, 0, 0.3);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: all 0.3s ease;
            min-height: 100vh;
            padding: 20px;
            line-height: 1.5;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }

        .title {
            font-size: 24px;
            font-weight: 600;
        }

        .controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .theme-switch {
            background: none;
            border: none;
            padding: 10px;
            cursor: pointer;
            color: var(--text-color);
            font-size: 20px;
            border-radius: 50%;
            transition: background-color 0.3s ease;
        }

        .theme-switch:hover {
            background-color: var(--hover-color);
        }

        .card {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 6px var(--shadow-color);
            margin-bottom: 20px;
        }

        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }

        input {
            flex: 1;
            padding: 12px 16px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            color: var(--text-color);
            font-size: 14px;
            transition: all 0.3s ease;
        }

        input:focus {
            outline: none;
            border-color: var(--info-color);
            box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
        }

        button {
            padding: 12px 24px;
            border-radius: 8px;
            border: none;
            background: var(--info-color);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        button:hover {
            opacity: 0.9;
        }

        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .download-info {
            margin-top: 12px;
            font-size: 13px;
            color: var(--text-color);
            opacity: 0.7;
        }

        .progress-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 20px;
            background: var(--card-bg);
            box-shadow: 0 2px 10px var(--shadow-color);
            z-index: 1000;
            transform: translateY(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .progress-overlay.active {
            transform: translateY(0);
        }

        .progress-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .progress-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .progress-title {
            font-weight: 500;
            font-size: 14px;
        }

        .progress-stats {
            font-size: 12px;
            opacity: 0.7;
        }

        .progress-bar-container {
            height: 6px;
            background: var(--border-color);
            border-radius: 3px;
            overflow: hidden;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--info-color), #00C7FF);
            width: 0%;
            transition: width 0.3s ease;
        }

        .connection-status {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            background: var(--card-bg);
            box-shadow: 0 2px 10px var(--shadow-color);
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .connection-status.connected .status-dot {
            background: var(--success-color);
            box-shadow: 0 0 0 2px rgba(52, 199, 89, 0.2);
        }

        .connection-status.disconnected .status-dot {
            background: var(--error-color);
            box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2);
        }

        .history-section {
            margin-top: 40px;
        }

        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .history-title {
            font-size: 18px;
            font-weight: 600;
        }

        .clear-history {
            font-size: 14px;
            color: var(--info-color);
            cursor: pointer;
            background: none;
            border: none;
            padding: 4px 8px;
        }

        .history-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .history-item {
            background: var(--bg-color);
            padding: 16px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
        }

        .history-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px var(--shadow-color);
        }

        .history-item-left {
            flex: 1;
            margin-right: 20px;
        }

        .history-item-filename {
            font-weight: 500;
            margin-bottom: 4px;
            word-break: break-all;
        }

        .history-item-time {
            font-size: 12px;
            opacity: 0.7;
        }

        .history-item-right {
            text-align: right;
            min-width: 100px;
        }

        .history-item-size {
            font-weight: 500;
            margin-bottom: 4px;
        }

        .history-item-url {
            font-size: 12px;
            color: var(--info-color);
            text-decoration: none;
            word-break: break-all;
        }

        .empty-history {
            text-align: center;
            padding: 40px;
            color: var(--text-color);
            opacity: 0.5;
        }

        .tooltip {
            position: relative;
            display: inline-block;
        }

        .tooltip:hover::before {
            content: attr(data-tooltip);
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 4px 8px;
            background: var(--card-bg);
            color: var(--text-color);
            font-size: 12px;
            border-radius: 4px;
            white-space: nowrap;
            box-shadow: 0 2px 4px var(--shadow-color);
        }

        .error-message {
            color: var(--error-color);
            font-size: 14px;
            margin-top: 8px;
            display: none;
        }

        .error-message.visible {
            display: block;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        .downloading {
            animation: pulse 1s infinite;
        }

        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }

            .input-group {
                flex-direction: column;
            }

            button {
                width: 100%;
            }

            .history-item {
                flex-direction: column;
                gap: 10px;
            }

            .history-item-right {
                text-align: left;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="title">Universal Resource Downloader</h1>
            <div class="controls">
                <button class="theme-switch" onclick="toggleTheme()" id="themeSwitch">🌙</button>
            </div>
        </div>

        <div class="card">
            <div class="input-group">
                <input type="text" id="urlInput" placeholder="Enter resource URL (e.g., https://example.com/file.zip)">
                <button onclick="startDownload()" id="downloadBtn">
                    <span>Download</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 12L3 7H13L8 12Z" fill="currentColor"/>
                        <path d="M8 2V8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div class="download-info">
                Maximum file size: 50MB • Supports: HTTP, HTTPS
            </div>
            <div class="error-message" id="errorMessage"></div>
        </div>

        <div class="history-section">
            <div class="history-header">
                <div class="history-title">Download History</div>
                <button class="clear-history" onclick="clearHistory()">Clear All</button>
            </div>
            <div id="history" class="history-list">
                <div class="empty-history">No download history yet</div>
            </div>
        </div>
    </div>

    <div class="progress-overlay" id="progressOverlay">
        <div class="progress-container">
            <div class="progress-header">
                <div class="progress-title" id="progressTitle">Downloading...</div>
                <div class="progress-stats" id="progressStats">0% • 0 KB/s</div>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" id="progressBar"></div>
            </div>
        </div>
    </div>

    <div class="connection-status" id="connectionStatus">
        <div class="status-dot"></div>
        <span>Connecting...</span>
    </div>

    <script>
        class WebSocketClient {
            constructor() {
                this.ws = null;
                this.reconnectAttempts = 0;
                this.maxReconnectAttempts = 5;
                this.reconnectDelay = 1000;
                this.lastPing = Date.now();
                this.connect();
            }

            connect() {
                this.ws = new WebSocket(\`\${location.protocol === 'https:' ? 'wss:' : 'ws:'}//\${location.host}/ws\`);
                this.ws.onmessage = this.handleMessage.bind(this);
                this.ws.onclose = this.handleClose.bind(this);
                this.ws.onopen = this.handleOpen.bind(this);
            }

            handleMessage(event) {
                const data = JSON.parse(event.data);
                
                switch (data.type) {
                    case 'connected':
                        this.updateConnectionStatus('Connected');
                        break;
                    case 'heartbeat':
                        this.lastPing = Date.now();
                        this.ws.send(JSON.stringify({ type: 'pong' }));
                        break;
                    case 'progress':
                        this.updateProgress(data);
                        break;
                    case 'complete':
                        this.handleDownloadComplete(data);
                        break;
                    case 'error':
                        this.handleError(data);
                        break;
                }
            }

            handleClose() {
                this.updateConnectionStatus('Disconnected');
                if (this.reconnectAttempts < this.maxReconnectAttempts) {
                    setTimeout(() => {
                        this.reconnectAttempts++;
                        this.connect();
                    }, this.reconnectDelay * this.reconnectAttempts);
                }
            }

            handleOpen() {
                this.reconnectAttempts = 0;
                this.updateConnectionStatus('Connected');
            }

            updateConnectionStatus(status) {
                const statusEl = document.getElementById('connectionStatus');
                statusEl.className = 'connection-status ' + 
                    (status === 'Connected' ? 'connected' : 'disconnected');
                statusEl.querySelector('span').textContent = status;
            }

            updateProgress(data) {
                const overlay = document.getElementById('progressOverlay');
                const bar = document.getElementById('progressBar');
                const stats = document.getElementById('progressStats');
                const title = document.getElementById('progressTitle');
                
                overlay.classList.add('active');
                bar.style.width = \`\${data.percent}%\`;
                stats.textContent = \`\${data.percent}% • \${formatSpeed(data.speed)}\`;
                title.textContent = 'Downloading...';
            }

            handleDownloadComplete(data) {
                const overlay = document.getElementById('progressOverlay');
                const title = document.getElementById('progressTitle');
                
                title.textContent = 'Download Complete!';
                
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 1000);

                addToHistory({
                    filename: data.filename,
                    downloadTime: new Date().toLocaleString(),
                    fileSize: data.size,
                    url: data.url
                });

                updateHistory();  // 确保这个函数被调用来更新界面
            }

            handleError(data) {
                const errorMessage = document.getElementById('errorMessage');
                errorMessage.textContent = data.message;
                errorMessage.classList.add('visible');
                
                document.getElementById('progressOverlay').classList.remove('active');
                document.getElementById('downloadBtn').disabled = false;

                setTimeout(() => {
                    errorMessage.classList.remove('visible');
                }, 5000);
            }
        }

        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        function formatSpeed(bytesPerSecond) {
            return formatFileSize(bytesPerSecond) + '/s';
        }

        function toggleTheme() {
            const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            document.getElementById('themeSwitch').textContent = theme === 'dark' ? '☀️' : '🌙';
        }

        function clearHistory() {
            if (confirm('Are you sure you want to clear all download history?')) {
                localStorage.removeItem('downloadHistory');
                updateHistory();
            }
        }

        function addToHistory(record) {
            const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
            history.unshift(record);
            if (history.length > 10) history.pop();
            localStorage.setItem('downloadHistory', JSON.stringify(history));
            updateHistory();
        }

        function updateHistory() {
            const history = JSON.parse(localStorage.getItem('downloadHistory') || '[]');
            const historyEl = document.getElementById('history');
            
            if (history.length === 0) {
                historyEl.innerHTML = '<div class="empty-history">No download history yet</div>';
                return;
            }

            historyEl.innerHTML = history
                .map(item => \`
                    <div class="history-item">
                        <div class="history-item-left">
                            <div class="history-item-filename">\${item.filename}</div>
                            <div class="history-item-time">\${item.downloadTime}</div>
                        </div>
                        <div class="history-item-right">
                            <div class="history-item-size">\${formatFileSize(item.fileSize)}</div>
                            <a href="\${item.url}" class="history-item-url" target="_blank" rel="noopener noreferrer">View source</a>
                        </div>
                    </div>
                \`)
                .join('');
        }

        async function startDownload() {
            const urlInput = document.getElementById('urlInput');
            const downloadBtn = document.getElementById('downloadBtn');
            const url = urlInput.value.trim();
            const errorMessage = document.getElementById('errorMessage');

            errorMessage.classList.remove('visible');

            if (!url) {
                errorMessage.textContent = 'Please enter a URL';
                errorMessage.classList.add('visible');
                return;
            }

            if (!isValidUrl(url)) {
                errorMessage.textContent = 'Please enter a valid URL';
                errorMessage.classList.add('visible');
                return;
            }

            try {
                downloadBtn.disabled = true;
                const response = await fetch(url.replace('https://github.com', ''));
                
                if (!response.ok) throw new Error('Download failed');

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = url.split('/').pop();
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);

            } catch (error) {
                errorMessage.textContent = 'Download failed: ' + error.message;
                errorMessage.classList.add('visible');
            } finally {
                downloadBtn.disabled = false;
            }
        }

        function isValidUrl(string) {
            try {
                new URL(string);
                return true;
            } catch (_) {
                return false;
            }
        }

        // Initialize WebSocket client
        const wsClient = new WebSocketClient();

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        document.getElementById('themeSwitch').textContent = savedTheme === 'dark' ? '☀️' : '🌙';

        // Initialize history
        updateHistory();

        // Add keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === document.getElementById('urlInput')) {
                startDownload();
            }
        });
    </script>
</body>
</html>
`;
}
