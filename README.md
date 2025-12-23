<div align="center">

[![doocs-md](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/logo-2.png)]()

</div>

<h1 align="center">微信 Markdown 编辑器</h1>

<div align="center">

[![status](https://img.shields.io/github/actions/workflow/status/iBigQiang/mdPro/deploy.yml?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/iBigQiang/mdPro/actions) [![node](https://img.shields.io/badge/node-%3E%3D22-42cc23?style=flat-square&labelColor=564341)](https://nodejs.org/en/about/previous-releases) [![pr](https://img.shields.io/badge/prs-welcome-42cc23?style=flat-square&labelColor=564341)](https://github.com/iBigQiang/mdPro/pulls) [![stars](https://img.shields.io/github/stars/iBigQiang/mdPro?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/iBigQiang/mdPro/stargazers) [![forks](https://img.shields.io/github/forks/iBigQiang/mdPro?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/iBigQiang/mdPro)<br> [![release](https://img.shields.io/github/v/release/iBigQiang/mdPro?style=flat-square&labelColor=564341&color=42cc23)](https://github.com/iBigQiang/mdPro/releases) [![docker](https://img.shields.io/badge/docker-latest-42cc23?style=flat-square&labelColor=564341)](https://ghcr.io/ibigqiang/mdpro)

</div>

## 🌐 在线编辑器地址

[https://ibigqiang.github.io/mdPro/](https://ibigqiang.github.io/mdPro/)

## 📝 项目介绍

**Markdown 文档自动即时渲染为微信图文**，让你不再为微信内容排版而发愁！只要你会基本的 Markdown 语法（现在有了 AI，你甚至不需要会 Markdown），就能做出一篇样式简洁而又美观大方的微信图文。

**如果这个项目对你有帮助，请给我们点个 Star ⭐️**，我们会持续更新和维护！

> 本仓库是基于 [https://github.com/doocs/md](https://github.com/doocs/md) 开源版本优化迭代而来，集合以上优化升级修改文件内对应内容。

> **推荐使用 Chrome 浏览器**，效果最佳。

## 🤔 为何开发这款编辑器

现有的开源微信 Markdown 编辑器样式繁杂，排版过程中往往需要额外调整，影响使用效率。为了解决这一问题，我们打造了一款更加**简洁、优雅**的编辑器，提供更流畅的排版体验。

欢迎各位朋友随时提交 PR，让这款微信 Markdown 编辑器变得更好！如果你有新的想法，也欢迎在 [💬 Discussions 讨论区](https://github.com/iBigQiang/mdPro/discussions)反馈。

## ✨ 功能特性

### 🎨 核心功能

- ✅ **完整 Markdown 支持** - 支持所有基础语法、数学公式
- ✅ **图表渲染** - 支持 Mermaid 图表和 [GFM 警告块](https://github.com/orgs/community/discussions/16925)
- ✅ **PlantUML 支持** - 强大的 UML 图表渲染
- ✅ **Ruby 注音扩展** - 支持 `[文字]{注音}`、`[文字]^(注音)` 格式，支持多种分隔符

### 🎯 编辑体验

- ✅ **代码高亮** - 丰富的代码块高亮主题，提升代码可读性
- ✅ **自定义样式** - 允许自定义主题色和 CSS 样式，灵活定制展示效果
- ✅ **草稿保存** - 内置本地内容管理功能，支持草稿自动保存

### 🚀 高级功能

- ✅ **多图床支持** - 提供多种图床选择，便捷的图片上传功能
- ✅ **文件管理** - 便捷的文件导入、导出功能，提升工作效率
- ✅ **AI 集成** - 集成主流 AI 模型（DeepSeek、OpenAI、通义千问、腾讯混元、火山方舟、302.AI 等），智能辅助内容创作

## 🖼️ 支持的图床服务

| #   | 图床                                                   | 使用时是否需要配置                                                         | 备注                                                                                                                   |
| --- | ------------------------------------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | 默认                                                   | 否                                                                         | -                                                                                                                      |
| 2   | [GitHub](https://github.com)                           | 配置 `Repo`、`Token` 参数                                                  | [如何获取 GitHub token？](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) |
| 3   | [阿里云](https://www.aliyun.com/product/oss)           | 配置 `AccessKey ID`、`AccessKey Secret`、`Bucket`、`Region` 参数           | [如何使用阿里云 OSS？](https://help.aliyun.com/document_detail/31883.html)                                             |
| 4   | [腾讯云](https://cloud.tencent.com/act/pro/cos)        | 配置 `SecretId`、`SecretKey`、`Bucket`、`Region` 参数                      | [如何使用腾讯云 COS？](https://cloud.tencent.com/document/product/436/38484)                                           |
| 5   | [七牛云](https://www.qiniu.com/products/kodo)          | 配置 `AccessKey`、`SecretKey`、`Bucket`、`Domain`、`Region` 参数           | [如何使用七牛云 Kodo？](https://developer.qiniu.com/kodo)                                                              |
| 6   | [MinIO](https://min.io/)                               | 配置 `Endpoint`、`Port`、`UseSSL`、`Bucket`、`AccessKey`、`SecretKey` 参数 | [如何使用 MinIO？](http://docs.minio.org.cn/docs/master/)                                                              |
| 7   | [公众号](https://mp.weixin.qq.com/)                    | 配置 `appID`、`appsecret`、`代理域名` 参数                                 | [如何使用公众号图床？](https://md-pages.doocs.org/tutorial)                                                            |
| 8   | [Cloudflare R2](https://developers.cloudflare.com/r2/) | 配置 `AccountId`、`AccessKey`、`SecretKey`、`Bucket`、`Domain` 参数        | [如何使用 S3 API 操作 R2？](https://developers.cloudflare.com/r2/api/s3/api/)                                          |
| 9   | [又拍云](https://www.upyun.com/)                       | 配置 `Bucket`、`Operator`、`Password`、`Domain` 参数                       | [如何使用 又拍云？](https://help.upyun.com/)                                                                           |
| 10  | [Telegram](https://core.telegram.org/api)              | 配置 `Bot Token`、`Chat ID` 参数                                           | [如何使用 Telegram 图床？](https://github.com/doocs/md/blob/main/docs/telegram-usage.md)                               |
| 11  | [Cloudinary](https://cloudinary.com/)                  | 配置 `Cloud Name`、`API Key`、`API Secret` 参数                            | [如何使用 Cloudinary？](https://cloudinary.com/documentation/upload_images)                                            |
| 12  | 自定义上传                                             | 是                                                                         | [如何自定义上传？](/docs/custom-upload.md)                                                                             |

## 🎬 产品演示

<div align="center">

|                                      🎨 主题切换                                      |                                      🖼️ 图片上传                                      |
| :-----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![demo1](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/demo1.gif) | ![demo2](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/demo2.gif) |

|                                      📝 样式扩展                                      |                                      🤖 一键排版                                      |
| :-----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![demo3](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/demo3.gif) | ![demo4](https://cdn-doocs.oss-cn-shenzhen.aliyuncs.com/gh/doocs/md/images/demo4.gif) |

</div>

## 🛠️ 开发与部署

```sh
# 安装 node 版本
nvm i && nvm use

# 安装依赖
pnpm i

# 启动开发模式
pnpm web dev
# 访问 http://localhost:5173/md/

# 部署在 /md 目录
pnpm web build

# 部署在根目录
pnpm web build:h5-netlify

# Chrome 插件启动及调试
pnpm web ext:dev
# 访问 chrome://extensions/ 打开开发者模式，加载已解压的扩展程序，选择 apps/web/.output/chrome-mv3-dev 目录

# Chrome 插件打包
pnpm web ext:zip

# Firefox 扩展打包(how to build Firefox addon)
pnpm web firefox:zip # output zip file at in apps/web/.output/md-{version}-firefox.zip

# uTools 插件打包
pnpm utools:package # output zip file at apps/utools/release/md-utools-v{version}.zip

# cloudflare workers
pnpm web wrangler:dev # cloudflare workers dev 模式
pnpm web wrangler:deploy # cloudflare workers 部署命令
```



## 💻 本地开发与开发运行

如果您想在本地运行本项目进行测试或二次开发，请参考以下步骤：

**1. 克隆仓库到本地**
```bash
git clone https://github.com/iBigQiang/mdPro.git
cd mdPro
```

**2. 安装依赖**
项目使用 pnpm 进行包管理：
```bash
pnpm install
```

**3. 启动开发模式**
```bash
pnpm web dev
```
运行后，在浏览器访问：[http://localhost:5173/md/](http://localhost:5173/md/) 即可预览实时修改效果。

> **提示**：为何是 `/md/` 而不是 `/mdPro/`？这是因为本地开发环境下 Vite 默认配置了 `/md/` 作为 base 路径，而 `/mdPro/` 仅在发布到 GitHub Pages 时生效。

---

## 🐳 Docker 部署

本项目支持通过 Docker 快速部署，镜像托管在 GitHub Container Registry (GHCR)。

> [!IMPORTANT]
> **首次部署提示**：如果拉取镜像时报错 `denied: denied`，是因为 GHCR 镜像默认为私有。请前往 GitHub 仓库的 **Packages** 页面，进入 `mdpro` 设置，将 **Package Visibility** 设置为 **Public**。

### 1. 拉取镜像
```bash
docker pull ghcr.io/ibigqiang/mdpro:latest
```

### 2. 运行容器
```bash
docker run -d --name mdpro -p 8080:80 ghcr.io/ibigqiang/mdpro:latest
```
运行后，访问 `http://localhost:8080` 即可使用。

### 3. 通过 Docker Compose 部署 (推荐)
在根目录下直接运行：
```bash
docker-compose up -d
```
附 `docker-compose.yml` 内容：
```yaml
services:
  mdpro:
    image: ghcr.io/ibigqiang/mdpro:latest
    container_name: mdpro
    ports:
      - "8080:80"
    restart: always
```

### 4. 自行构建镜像 (从源码构建)
如果您想基于本地修改后的代码或最新的 master 分支构建镜像，可以参考以下步骤：

**1. 克隆仓库到本地**
```bash
git clone https://github.com/iBigQiang/mdPro.git
cd mdPro
```

**2. 构建 Docker 镜像**
```bash
docker build -t my-mdpro .
```

**3. 启动容器**
```bash
docker run -d --name my-mdpro -p 8080:80 my-mdpro
```

## 🚀 自动化发布与运维

本项目集成了高度自动化的发布流程，运维人员只需执行一条命令即可完成版本更新、Tag 打标、代码推送及 Docker 镜像构建。

### 1. 自动发布命令

在项目根目录下运行：

```bash
pnpm release
```

**该命令会自动执行以下操作：**
1.  **自动提取日志**：从 `升级日志文档.md` 中提取最新的增量更新内容。
2.  **版本更新**：自动更新 `package.json` 中的版本号。
3.  **Git 提交**：自动执行 `git commit`，提交信息包含版本号。
4.  **打标签**：自动创建对应的 Git Tag (如 `v1.2.0`)。
5.  **代码推送**：自动执行 `git push` 推送代码及 Tag 到远程仓库。
6.  **触发构建**：GitHub Actions 监听到 Tag 推送后，会自动触发 CI/CD 流程，构建并发布最新的 Docker 镜像。

### 2. 验证发布

命令执行完成后，您可以访问以下链接查看发布状态：
- **Release 页面**: [https://github.com/iBigQiang/mdPro/releases](https://github.com/iBigQiang/mdPro/releases)
- **构建状态**: [https://github.com/iBigQiang/mdPro/actions](https://github.com/iBigQiang/mdPro/actions)

## 👥 谁在使用

请查看 [📋 USERS.md](USERS.md) 文件，了解使用本项目的公众号。

## 🤝 贡献指南

我们欢迎任何形式的贡献！请查看 [📖 CONTRIBUTING.md](./CONTRIBUTING.md) 获取提交 PR、Issue 的流程与规范。

## ☕ 支持我们

如果本项目对你有所帮助，可以通过以下方式支持我们的持续开发。

## 💬 反馈与交流

如果你在使用过程中遇到问题，或者有好的建议，欢迎在 [🐛 Issues](https://github.com/iBigQiang/mdPro/issues) 中反馈。你也可以加入我们的交流群，和我们一起讨论，若群二维码失效，请添加好友，备注 `md`，我们会拉你进群。

