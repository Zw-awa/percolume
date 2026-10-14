# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

**Small efforts find a path.**

渗行是一个安静的桌面小组件，用来让微小的努力变得可见。记录一次进步，目标网格中就会随机亮起一个格子。随着积累，分散的点可能连接成一条从顶部通到底部的路径。

## 功能

- 用每日贡献区域记录努力。
- 每次记录随机点亮目标网格中的一个格子。
- 每个格子可以保存点亮时间和一句话。
- 当进度形成四方向连通路径时，将路径可视化。
- 数据保存在本地，不需要账号。
- 适合日常使用的安静、低干扰界面。

## 开始使用

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

创建生产版本：

```bash
npm run build
```

## 仓库

应用位于 [`apps/percolume/frontend`](./apps/percolume/frontend)。GitHub 社区文件位于 [`.github`](./.github)。

## 隐私

渗行将进度记录保存在你的设备上。应用不会把句子和时间记录发送到托管服务。

## 参与贡献

请阅读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。

## 许可证

MIT，详见 [LICENSE](./LICENSE)。
