# Stage 1: Build
FROM node:22-alpine AS builder

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

# 复制依赖定义文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/core/package.json ./packages/core/
COPY packages/config/package.json ./packages/config/
COPY packages/md-cli/package.json ./packages/md-cli/

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm --filter @md/web build

# Stage 2: Serve
FROM nginx:alpine

# 复制构建产物到 Nginx 默认目录
# 注意：根据 apps/web/package.json，构建产物在 apps/web/dist
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
