# 参与贡献

感谢你帮助改进渗行。你可以贡献错误修复、文档改进、无障碍优化、翻译、测试，以及桌面体验相关的改动。

## 开始之前

请先搜索已有的 Issue 和 Pull Request。较大的改动请在编写代码前先提交 Issue，公开讨论问题和预期行为。

请不要在 Issue、Pull Request、截图或测试夹具中包含私人进度句子、本地数据导出文件或其他个人信息。

## 本地开发

当前应用位于 `apps/percolume/frontend`，使用 Node.js 和 Vite。

```bash
cd apps/percolume/frontend
npm install
npm run dev
```

在浏览器中打开 Vite 输出的本地地址。

## 验证改动

提交 Pull Request 前请运行生产构建：

```bash
npm run build
```

涉及行为变化时，请在 Pull Request 中说明手动验证步骤。某个模块已有测试时，新测试应放在对应模块附近。

## Pull Request

每个 Pull Request 尽量只处理一个变化。请说明面向用户的结果，关联对应 Issue；视觉改动可以附截图或简短录屏。

提交信息请清晰描述改动，例如：

```text
fix(grid): preserve cell details after reshuffling
```

审查会关注正确性、清晰度、无障碍、隐私和现有界面的一致性。

## 报告错误

请使用 Bug 报告模板，并提供渗行版本、操作系统、复现步骤、预期行为和实际行为。上传文件前请移除私人句子和本地数据。

## 许可证

提交贡献即表示你同意该贡献遵循仓库的 [MIT 许可证](./LICENSE)。
