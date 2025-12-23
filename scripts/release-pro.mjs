import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * 自动化发布助手
 * 功能：
 * 1. 自动提取 升级日志文档.md 中最新的增量内容
 * 2. 自动提交、标记版本、推送到 GitHub
 * 3. 使用 gh CLI 创建只包含增量日志的 GitHub Release
 */

// 检查是否为干跑模式 (Dry Run)
const isDryRun = process.argv.includes('--dry-run');

// 1. 获取当前版本
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = `v${pkg.version}`;

// 2. 提取最新增量日志
const changelogPath = path.resolve(process.cwd(), '升级日志文档.md');
const content = fs.readFileSync(changelogPath, 'utf8');

// 匹配第一个 ## 到下一个 ## 之间的内容 (包括标题)
const match = content.match(/##[\s\S]*?(?=\n##|$)/);
const latestLog = match ? match[0].trim() : `Release ${version}`;

console.log(`🚀 ${isDryRun ? '[DRY RUN] ' : ''}准备发布版本: ${version}`);
console.log(`📝 提取到的增量日志:\n-------------------\n${latestLog}\n-------------------\n`);

if (isDryRun) {
  console.log('✅ 干跑模式结束。');
  process.exit(0);
}

function run(command) {
  console.log(`> ${command}`);
  return execSync(command, { stdio: 'inherit' });
}

try {
  // 3. Git 操作
  console.log('📦 正在同步本地仓库状态...');
  run('git add .');
  
  // 检查是否有改动需要 commit
  const status = execSync('git status --porcelain').toString().trim();
  if (status) {
    run(`git commit -m "release: ${version}"`);
  } else {
    console.log('✨ 没有需要提交的新改动。');
  }
  
  // 4. 处理标签 (如果已存在则覆盖)
  try {
    execSync(`git tag -d ${version}`, { stdio: 'ignore' });
    execSync(`git push origin :refs/tags/${version}`, { stdio: 'ignore' });
  } catch (e) {
    // 标签不存在，忽略错误
  }
  
  run(`git tag ${version}`);
  run(`git push origin main`);
  run(`git push origin ${version}`);

  // 5. 调用 GitHub CLI 创建 Release
  console.log('🌐 正在同步到 GitHub Releases...');
  
  // 将日志写入临时文件以处理多行文本
  const tempFile = 'temp_release_log.md';
  fs.writeFileSync(tempFile, latestLog);

  try {
    // 如果 Release 已存在，先删除 (确保覆盖)
    try { execSync(`gh release delete ${version} -y`, { stdio: 'ignore' }); } catch (e) {}
    
    // 创建新的 Release
    run(`gh release create ${version} -F ${tempFile} -t "${version}"`);
    console.log(`\n✅ 发布成功！请访问: https://github.com/iBigQiang/mdPro/releases/tag/${version}`);
  } catch (err) {
    console.error(`❌ GitHub Release 创建失败 (请确认是否已安装并登录 gh CLI): ${err.message}`);
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }

} catch (error) {
  console.error('\n❌ 发布流程中断:', error.message);
  process.exit(1);
}
