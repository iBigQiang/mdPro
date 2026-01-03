import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * 自动化发布助手 (Pro Max版)
 * 功能：
 * 1. 自动计算补丁版本 (Patch Version)
 * 2. 自动提取 Git 提交记录生成日志内容
 * 3. 自动更新 package.json 和 升级日志文档.md
 * 4. 自动 Commit, Tag, Push, Release
 */

const isDryRun = process.argv.includes('--dry-run');

function formatDate(date) {
  const pad = (n) => n.toString().padStart(2, '0');
  const YYYY = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${YYYY}-${MM}-${DD} ${HH}:${mm}`;
}

function run(command, options = {}) {
  console.log(`> ${command}`);
  if (!isDryRun || options.force) {
    return execSync(command, { stdio: options.stdio || 'inherit' });
  }
  return "";
}

try {
  // 1. 读取当前版本
  const pkgPath = path.resolve('package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const currentVersion = pkg.version;
  
  // 计算新版本 (1.2.3 -> 1.2.4)
  const versionParts = currentVersion.split('.').map(Number);
  versionParts[2] += 1;
  const newVersion = versionParts.join('.');
  const newVersionTag = `v${newVersion}`;
  const currentVersionTag = `v${currentVersion}`;

  console.log(`🚀 ${isDryRun ? '[DRY RUN] ' : ''}准备发布: ${currentVersionTag} -> ${newVersionTag}`);

  // 2. 获取 Git 增量日志
  // 如果没有上一个 tag，就获取所有日志 (防错)
  let gitLogs = "";
  try {
    // 获取 currentVersionTag 到 HEAD 的 commit，排除 merge commit，格式化为 "- message"
    const logCommand = `git log ${currentVersionTag}..HEAD --no-merges --pretty=format:"- %s"`;
    // 注意：这里必须强制执行才能拿到 log，即使是 dry-run 也要看
    gitLogs = execSync(logCommand).toString().trim();
  } catch (e) {
    console.log('⚠️ 无法获取 Git 日志 (可能没有上一个 tag)，将使用空日志。');
  }

  // 简单的日志过滤 (排除 release 自身的提交)
  gitLogs = gitLogs.split('\n')
    .filter(line => line && !line.includes(`release: v`))
    .join('\n');

  if (!gitLogs) {
    gitLogs = "- (无代码变动或仅有 release 提交)";
  }

  // 3. 更新 package.json
  if (!isDryRun) {
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log(`✅ package.json 更新完毕`);
  }

  // 4. 更新 升级日志文档.md
  const changelogPath = path.resolve('升级日志文档.md');
  let content = fs.readFileSync(changelogPath, 'utf8');
  const dateStr = formatDate(new Date());
  
  // 检查是否已经手动写了未发布的日志 (检查顶部第一条及其内容)
  // 如果第一行是 ## ... (但没有日期)，并且下面有内容，说明用户手写了
  const titleRegex = /^(##\s+)(.*)$/m;
  const match = content.match(titleRegex);
  
  let newBlock = "";
  let isManualLog = false;

  if (match) {
    const firstTitleLine = match[0];
    const firstTitleContent = match[2];
    
    // 如果最近的标题里已经包含当前日期，或者包含新版本号，说明可能重跑脚本，或者用户已改
    if (firstTitleContent.includes(newVersionTag)) {
       console.log('ℹ️ 检测到日志文件中已包含新版本号，将复用现有日志内容。');
       isManualLog = true;
    } 
    // 否则，我们需要插入新的日志块
  }

  if (!isManualLog) {
    // 生成新的日志块
    const newTitle = `## ${dateStr} (${newVersionTag}) 自动更新`;
    newBlock = `${newTitle}\n\n${gitLogs}\n\n`;
    
    // 插入到文件顶部 (在 '# 升级日志' 之后，或者直接插在最前)
    // 假设文件以 '# 升级日志' 开头，我们在它后面加
    if (content.startsWith('# 升级日志')) {
      content = content.replace('# 升级日志', `# 升级日志\n\n${newBlock.trim()}`);
    } else {
      content = newBlock + content;
    }
    
    if (!isDryRun) {
      fs.writeFileSync(changelogPath, content);
      console.log(`✅ 升级日志文档已自动插入新条目`);
    }
  }

  // 提取最新的日志段落用于 GitHub Release
  // 重新读取(内存中)的 content
  const logMatch = content.match(/##[\s\S]*?(?=\n##|$)/);
  let latestLog = logMatch ? logMatch[0].trim() : `Release ${newVersionTag}`;
  
  if (isDryRun) {
    console.log(`\n📄 [预览] 新增日志内容:\n${isManualLog ? '(用户手动内容)' : newBlock}`);
    console.log(`\n📄 [预览] Release 描述:\n${latestLog}`);
    console.log('✅ 干跑模式结束。');
    process.exit(0);
  }

  // 5. Git 提交流程
  console.log('📦 Git 提交...');
  run('git add .');
  run(`git commit -m "release: ${newVersionTag}"`);

  // 二次清理 tag (防重跑冲突)
  try {
    execSync(`git tag -d ${newVersionTag}`, { stdio: 'ignore' });
    execSync(`git push origin :refs/tags/${newVersionTag}`, { stdio: 'ignore' });
  } catch (e) {}

  console.log('🏷️ 打标签...');
  run(`git tag ${newVersionTag}`);
  
  console.log('🚀 推送...');
  run(`git push origin main`);
  run(`git push origin ${newVersionTag}`);

  // 6. GitHub Release
  console.log('🌐 创建 GitHub Release...');
  let hasGh = false;
  try { execSync('gh --version', { stdio: 'ignore' }); hasGh = true; } catch (e) {}

  if (hasGh) {
    const tempFile = 'temp_release_log.md';
    fs.writeFileSync(tempFile, latestLog);
    try {
      try { execSync(`gh release delete ${newVersionTag} -y`, { stdio: 'ignore' }); } catch (e) {}
      run(`gh release create ${newVersionTag} -F ${tempFile} -t "${newVersionTag}"`);
      console.log(`✅ GitHub Release 完成`);
    } catch (err) {
      console.error(`⚠️ Release 创建异常: ${err.message}`);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }

  console.log(`\n🎉 发布版本 ${newVersionTag} 成功！`);
  console.log(`🔗 Release: https://github.com/iBigQiang/mdPro/releases/tag/${newVersionTag}`);

} catch (error) {
  console.error('\n❌ 错误:', error.message);
  process.exit(1);
}
