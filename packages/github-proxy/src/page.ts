export const getPage = (url: URL): string => {
    const proto = url.protocol.startsWith('https') ? 'wss' : 'ws';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub File Downloader</title>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --border-color: #e0e0e0;
            --hover-color: #f5f5f5;
            --primary-color: #2196f3;
            --primary-dark: #1976d2;
            --error-color: #f44336;
            --success-color: #4caf50;
            --disabled-color: #9e9e9e;
            --disabled-bg: #f5f5f5;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --bg-color: #1a1a1a;
                --text-color: #ffffff;
                --border-color: #333333;
                --hover-color: #2a2a2a;
                --primary-color: #64b5f6;
                --primary-dark: #42a5f5;
                --disabled-bg: #2a2a2a;
                --disabled-color: #666666;
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
        }

        .container {
            max-width: 800px;
            width: 100%;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
        }

        h1 {
            text-align: center;
            margin-bottom: 2rem;
            font-size: 2.5rem;
            background: linear-gradient(45deg, var(--primary-color), #9c27b0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: titleGlow 2s ease-in-out infinite alternate;
        }

        .input-group {
            position: relative;
            margin-bottom: 2rem;
        }

        input {
            width: 100%;
            padding: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--bg-color);
            color: var(--text-color);
            font-size: 1rem;
            outline: none;
        }

        input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        }

        button {
            width: 100%;
            padding: 1rem;
            border: none;
            border-radius: 8px;
            background-color: var(--primary-color);
            color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        button:hover:not(:disabled) {
            transform: translateY(-2px);
            background-color: var(--primary-dark);
            box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
        }

        button:active:not(:disabled) {
            transform: translateY(0);
        }

        button:disabled {
            background-color: var(--disabled-bg);
            color: var(--disabled-color);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }

        button:disabled::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            border: 2px solid var(--disabled-color);
            border-top-color: transparent;
            border-radius: 50%;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            animation: spin 1s linear infinite;
        }

        .progress-container {
            margin-top: 2rem;
            display: none;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background-color: var(--border-color);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
        }

        .progress {
            width: 0%;
            height: 100%;
            background-color: var(--primary-color);
            transition: width 0.3s ease;
            position: relative;
        }

        .progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            animation: shimmer 1.5s infinite;
        }

        .status {
            margin-top: 1rem;
            text-align: center;
            font-size: 0.9rem;
        }

        .error {
            color: var(--error-color);
            animation: shake 0.5s ease-in-out;
        }

        .success {
            color: var(--success-color);
        }

        .connection-status {
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.8rem;
            opacity: 0.8;
        }

        .connection-status.connected {
            background-color: var(--success-color);
            color: white;
        }

        .connection-status.disconnected {
            background-color: var(--error-color);
            color: white;
        }

        @keyframes titleGlow {
            from {
                filter: drop-shadow(0 0 2px rgba(33, 150, 243, 0.2));
            }
            to {
                filter: drop-shadow(0 0 10px rgba(33, 150, 243, 0.4));
            }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        @keyframes spin {
            to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    </style>
</head>
<body>
    <div class="connection-status" id="connectionStatus">Connecting...</div>
    <div class="container">
        <h1>GitHub File Downloader</h1>
        <div class="input-group">
            <input type="text" id="urlInput" placeholder="Enter GitHub file URL..." 
                   autocomplete="off" spellcheck="false">
        </div>
        <button id="downloadBtn">Download</button>
        <div class="progress-container" id="progressContainer">
            <div class="progress-bar">
                <div class="progress" id="progress"></div>
            </div>
            <div class="status" id="status"></div>
        </div>
    </div>

    <script>
        let ws = null;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;

        const urlInput = document.getElementById('urlInput');
        const downloadBtn = document.getElementById('downloadBtn');
        const progressContainer = document.getElementById('progressContainer');
        const progress = document.getElementById('progress');
        const status = document.getElementById('status');
        const connectionStatus = document.getElementById('connectionStatus');

        function connectWebSocket() {
            if (reconnectAttempts >= maxReconnectAttempts) {
                connectionStatus.textContent = 'Connection failed';
                connectionStatus.className = 'connection-status disconnected';
                return;
            }

            ws = new WebSocket(\`${proto}://${url.host}\`);
            
            ws.onopen = () => {
                console.log('WebSocket connected');
                connectionStatus.textContent = 'Connected';
                connectionStatus.className = 'connection-status connected';
                reconnectAttempts = 0;
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    
                    switch (data.type) {
                        case 'progress':
                            progress.style.width = \`\${data.progress}%\`;
                            if (data.totalBytes) {
                                status.textContent = \`Downloaded \${formatBytes(data.bytesRead)} of \${formatBytes(data.totalBytes)} (\${data.progress.toFixed(1)}%)\`;
                            }
                            if (data.status === 'complete') {
                                status.textContent = 'Download completed!';
                                status.className = 'status success';
                            }
                            break;
                        case 'error':
                            showError(data.message);
                            break;
                        case 'cancelled':
                            status.textContent = 'Download cancelled';
                            status.className = 'status';
                            break;
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                }
            };

            ws.onclose = () => {
                console.log('WebSocket disconnected');
                connectionStatus.textContent = 'Disconnected - Reconnecting...';
                connectionStatus.className = 'connection-status disconnected';
                reconnectAttempts++;
                setTimeout(connectWebSocket, 5000);
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                connectionStatus.textContent = 'Connection error';
                connectionStatus.className = 'connection-status disconnected';
            };
        }

        async function startDownload() {
            const url = urlInput.value.trim();
            
            if (!url) {
                showError('Please enter a valid GitHub URL');
                return;
            }

            try {
                // 禁用按钮并显示加载状态
                downloadBtn.disabled = true;
                progressContainer.style.display = 'block';
                progress.style.width = '0%';
                status.textContent = 'Starting download...';
                status.className = 'status';

                const response = await fetch(\`/download?url=\${encodeURIComponent(url)}\`);
                
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Download failed');
                }

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);
                const filename = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download';
                
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);

                 // 恢复提示语
                status.textContent = '';

            } catch (error) {
                showError(error.message);
            } finally {
                // 恢复按钮状态
                downloadBtn.disabled = false;
            }
        }

        function showError(message) {
            status.textContent = message;
            status.className = 'status error';
            progressContainer.style.display = 'block';
            progress.style.width = '0%';
            downloadBtn.disabled = false;
        }

        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        // 初始化
        connectWebSocket();
        downloadBtn.addEventListener('click', startDownload);
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !downloadBtn.disabled) {
                startDownload();
            }
        });

        // 页面卸载时关闭 WebSocket 连接
        window.addEventListener('beforeunload', () => {
            if (ws) {
                ws.close();
            }
        });
    </script>
</body>
</html>`;
};
