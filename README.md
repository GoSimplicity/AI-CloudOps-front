# AI CloudOps Frontend

精简自 Ant Design Pro 的中后台模板，保留登录、仪表盘和基础布局，方便快速接入业务页面。

## 快速开始

```bash
pnpm install # 或 npm install / yarn
npm run dev   # 启动本地开发
```

### 常用脚本

- `npm run dev`：本地开发，默认端口 8000。
- `npm run build`：打包产物至 `dist/`。
- `npm run preview`：本地预览生产包。
- `npm run lint`：运行 Biome + TypeScript 检查。
- `npm run test`：执行单元测试（可按需补充）。

## 目录结构（节选）

```
├── config          # Umi 配置、路由、默认主题
├── public          # 静态资源
├── src
│   ├── app.tsx     # 运行时配置
│   ├── components  # 布局组件（页脚/头像菜单）
│   ├── pages       # 登录、Dashboard 等页面
│   └── services    # 权限与登录示例
```

## 下一步

- 在 `src/pages/dashboard` 中接入业务模块。
- 将 `src/services/auth.ts` 替换为真实接口。
- 根据需要扩展国际化、图表等能力。
