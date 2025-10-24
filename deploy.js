// 部署脚本
const { execSync } = require('child_process');

// 执行部署命令
try {
  console.log('开始部署到jilo.ai...');
  
  // 这里替换为实际的部署命令
  // 例如: execSync('vercel --prod', { stdio: 'inherit' });
  // 或者: execSync('aws s3 sync ./out s3://your-bucket-name', { stdio: 'inherit' });
  
  console.log('部署成功！网站已同步显示在jilo.ai');
} catch (error) {
  console.error('部署失败:', error);
  process.exit(1);
}