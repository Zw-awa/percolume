# Percolume · 渗行

[English](./README.md) | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

**Small efforts find a path.**

渗行是一个安静的桌面小组件，用来让微小的努力变得可见。记录一次进步，目标网格中就会随机亮起一个格子。随着积累，分散的点可能连接成一条从顶部通到底部的路径。

## 功能

- 用每日贡献区域记录努力。
- 每次记录随机点亮目标网格中的一个格子。
- 悬停每日格子时查看日期和当天记录次数。
- 用清晰的网格展示长期积累的进度。
- 数据保存在本地，不需要账号。
- 适合日常使用的安静、低干扰界面。

## 使用渗行

1. 点击 **记录今天**，增加一次记录并点亮一个格子。
2. 使用 **编辑目标** 修改目标名称或网格大小。
3. 将鼠标悬停在每日格子上，查看日期和当天记录次数。
4. 点击已点亮的目标格子查看它，或使用 **重新洗牌** 清空当前网格分布。

网页原型支持 4x4 到 14x14 的网格。空格子会保留给后续记录，当前累计数据会自动保存在浏览器中。

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

渗行使用浏览器本地存储，将进度记录保存在你的设备上。网页应用不会把进度发送到托管服务。清除网站数据或更换浏览器配置文件会删除本地记录。

## 参与贡献

请阅读 [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md)。

## 许可证

MIT，详见 [LICENSE](./LICENSE)。
