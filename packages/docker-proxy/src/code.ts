export default {
    change_registry: (domain: string) => ({
        code: [
            'sudo tee /etc/docker/daemon.json <<EOF',
            '{',
            `  "registry-mirrors": ["https://docker.${domain}"]`,
            '}',
            'EOF',
            '\n',
            '# 配置完后需要重启 Docker 服务',
            'sudo systemctl restart docker'
        ].join('\n'),
        title: '更换 Docker 镜像源'
    }),

    docker: (domain: string) => ({
        code: ['# docker pull nginx:latest', `docker pull docker.${domain}/library/nginx:latest`].join('\n'),
        title: 'Docker 镜像'
    }),

    quay: (domain: string) => ({
        code: ['# docker pull quay.io/opstree/redis-operator', `docker pull quay.${domain}/opstree/redis-operator`].join('\n'),
        title: 'Quay 镜像'
    }),

    gcr: (domain: string) => ({
        code: [
            '# docker pull gcr.io/kaniko-project/executor:latest',
            `docker pull gcr.${domain}/kaniko-project/executor:latest  GCR 镜像`
        ].join('\n'),
        title: 'GCR 镜像'
    }),

    k8s_gcr: (domain: string) => ({
        code: ['# docker pull k8s.gcr.io/pause', `docker pull k8s-gcr.${domain}/pause`].join('\n'),
        title: 'k8s.gcr.io 镜像'
    }),

    registry_k8s: (domain: string) => ({
        code: [
            '# docker pull registry.k8s.io/sig-storage/csi-node-driver-registrar:v2.3.0',
            `docker pull k8s.${domain}/sig-storage/csi-node-driver-registrar:v2.3.0`
        ].join('\n'),
        title: 'registry.k8s.io 镜像'
    }),

    github: (domain: string) => ({
        code: ['# docker pull ghcr.io/jinnrry/pmail:latest', `docker pull ghcr.${domain}/jinnrry/pmail:latest`].join('\n'),
        title: 'GitHub 容器镜像'
    }),

    cloudsmith: (domain: string) => ({
        code: ['# docker pull docker.cloudsmith.io/org/registry/image', `docker pull cloudsmith.${domain}/org/registry/image`].join('\n'),
        title: '  Cloudsmith 镜像'
    })
};
