window.addEventListener('load', () => {
    const action_header = document.querySelector('.react-blob-header-edit-and-raw-actions');

    if (action_header) {
        const raw_btn = action_header.querySelector('a[data-testid="raw-button"]');

        const raw_href = raw_btn.getAttribute('href');

        const clone_btn = raw_btn.cloneNode(true);

        clone_btn.setAttribute('target', '_blank');

        clone_btn.textContent = 'Proxy Raw';

        // 添加到raw_btn前面
        clone_btn.setAttribute('href', raw_href.replace('github.com', 'github-proxy.visitor-worker.workers.dev'));

        action_header.appendChild(clone_btn);
    }
});
