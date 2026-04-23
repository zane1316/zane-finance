# Cloudflare Pages 部署指南

## 方式一：Git 集成（推荐，自动部署）

1. 访问 https://dash.cloudflare.com，登录你的 Cloudflare 账号
2. 左侧菜单找到 "Pages"，点击 "Create a project"
3. 选择 "Connect to Git"，授权连接你的 GitHub 账号
4. 选择 `zane-finance` 仓库，点击 "Begin setup"
5. 配置如下：
   - **Project name**: zane-finance（或你喜欢的名字）
   - **Production branch**: main
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
6. 点击 "Save and Deploy" 开始首次部署

## 方式二：Wrangler CLI 部署

1. 在终端运行：`npx wrangler login`
2. 浏览器会弹出授权页面，点击 "Allow"
3. 运行以下命令部署：
   ```bash
   cd "d:\kimi code\html_test0417"
   npm run build
   npx wrangler pages deploy dist --project-name=zane-finance
   ```

## 环境变量配置（必须）

部署成功后，需要在 Cloudflare Pages 项目设置中添加环境变量：

1. 进入 Cloudflare Pages 项目 -> Settings -> Environment variables
2. 添加以下变量（Production 环境）：
   - `VITE_SUPABASE_URL` = 你的 Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 Supabase anon public key
3. 点击 "Save"，然后重新部署

## 自定义域名（可选）

1. 在 Cloudflare Pages 项目 -> Custom domains 中
2. 点击 "Set up a custom domain"
3. 输入你的域名，按提示完成 DNS 配置
