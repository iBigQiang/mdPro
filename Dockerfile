# Stage 1: Build
FROM node:22-slim AS builder

# 安装 pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# 复制所有文件（依赖 .dockerignore 排除 node_modules 等）
# 这样可以确保 patches、所有 package.json、pnpm-workspace.yaml 都在位
COPY . .

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建项目
RUN pnpm --filter @md/web build

# Stage 2: Serve
FROM nginx:alpine

# 复制构建产物到 Nginx 默认目录
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
