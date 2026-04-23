// 对 VitePress 构建产物中的所有 HTML 文件做 AES-256 加密（StatiCrypt）
// 运行前请设置环境变量 STATICRYPT_PASSWORD
//
// 本地预览：
//   PowerShell:  $env:STATICRYPT_PASSWORD="YourPass"; npm run build:secure
//   Bash:        STATICRYPT_PASSWORD=YourPass npm run build:secure
//
// CI（GitHub Actions）里：secrets.STATICRYPT_PASSWORD 自动注入。

import { spawnSync } from 'node:child_process'
import { existsSync, rmSync, renameSync } from 'node:fs'
import { resolve, join, dirname, basename } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const password = process.env.STATICRYPT_PASSWORD

if (!password) {
  console.error('\n[encrypt] 错误：未设置 STATICRYPT_PASSWORD 环境变量。')
  console.error('         本地运行请用：STATICRYPT_PASSWORD=your-strong-password npm run build:secure')
  console.error('         CI 运行请在 GitHub Settings → Secrets 中设置 STATICRYPT_PASSWORD。\n')
  process.exit(1)
}

if (password.length < 10) {
  console.warn('\n[encrypt] 警告：密码短于 10 位，建议使用至少 14 位混合字符以抵抗暴力破解。\n')
}

const distDir = resolve('docs/.vitepress/dist')
if (!existsSync(distDir)) {
  console.error(`\n[encrypt] 错误：构建产物目录不存在：${distDir}`)
  console.error('         请先执行 npm run build。\n')
  process.exit(1)
}

// 解析 staticrypt 的 CLI 入口文件（避免 Windows npx.cmd / shell 兼容性问题）
let staticryptCliPath
try {
  staticryptCliPath = require.resolve('staticrypt/cli/index.js')
} catch (e) {
  console.error('\n[encrypt] 错误：找不到 staticrypt。请先 npm install。\n')
  process.exit(1)
}

// StatiCrypt 使用 `-r <dir> -d <outDir>` 模式时，会在 outDir 下创建一个与 dir 同名的子目录。
// 所以流程：在 dist 的父目录里，输入 dist，输出到临时目录 dist-encrypted-tmp，
// 然后把 dist-encrypted-tmp/dist 搬回 dist。
const parentDir = dirname(distDir)         // .../docs/.vitepress
const distName = basename(distDir)         // "dist"
const tempDir = join(parentDir, 'dist-encrypted-tmp')

if (existsSync(tempDir)) {
  rmSync(tempDir, { recursive: true, force: true })
}

// 中文化的登录页模板文案
const templateArgs = [
  ['--template-title', '运营 SOP 知识库'],
  ['--template-instructions', '本站为公司内部文档，请输入访问密码'],
  ['--template-button', '进入'],
  ['--template-placeholder', '请输入密码'],
  ['--template-error', '密码错误，请重试'],
  ['--template-remember', '30 天内免登录'],
  ['--template-color-primary', '#3451b2'],
  ['--template-color-secondary', '#f6f6f7'],
]

const staticryptArgs = [
  staticryptCliPath,
  '--recursive',
  '-d', tempDir,
  distName,
  '--short',
  '--remember', '30',
  '--config', 'false',
]
for (const [k, v] of templateArgs) staticryptArgs.push(k, v)

console.log('[encrypt] 正在加密 HTML ...')

const result = spawnSync(process.execPath, staticryptArgs, {
  cwd: parentDir,
  stdio: 'inherit',
  env: { ...process.env, STATICRYPT_PASSWORD: password },
})

if (result.status !== 0) {
  console.error('\n[encrypt] StatiCrypt 加密失败（退出码 ' + result.status + '）。')
  if (result.error) console.error(result.error)
  process.exit(result.status ?? 1)
}

// 把 tempDir/dist 的内容搬回 distDir
const encryptedInner = join(tempDir, distName)
if (!existsSync(encryptedInner)) {
  console.error(`\n[encrypt] 错误：加密输出缺失 ${encryptedInner}`)
  process.exit(1)
}

rmSync(distDir, { recursive: true, force: true })
renameSync(encryptedInner, distDir)
rmSync(tempDir, { recursive: true, force: true })

console.log(`\n[encrypt] ✅ 加密完成。dist 已替换为加密版本。`)
