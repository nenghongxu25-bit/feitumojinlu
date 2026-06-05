# 一键修复脚本 - 每次构建后运行
$gamePath = "d:\Desktop\新建文件夹\LayaProject\release\bytedancegame\game.js"
$indexPath = "d:\Desktop\新建文件夹\LayaProject\release\bytedancegame\js\index.js"
$bundleSrc = "d:\Desktop\新建文件夹\LayaProject\bin\js\bundles\JumpTo.scene.js"
$bundleDst = "d:\Desktop\新建文件夹\LayaProject\release\bytedancegame\js\bundle.scene.js"

# 1. 修改 game.js - 添加 bundle.scene.js 加载
$gameContent = Get-Content $gamePath -Raw
if ($gameContent -notmatch "bundle\.scene\.js") {
    $gameContent = $gameContent.Replace('require("js/JumpTo.js");', 'require("js/bundle.scene.js");' + "`n//" + "`n" + 'require("js/JumpTo.js");')
    Set-Content $gamePath $gameContent -Encoding UTF8
    Write-Host "[OK] game.js 已添加 bundle.scene.js" -ForegroundColor Green
} else {
    Write-Host "[OK] game.js 已包含 bundle.scene.js" -ForegroundColor Green
}

# 2. 复制脚本包
if (Test-Path $bundleSrc) {
    Copy-Item $bundleSrc $bundleDst -Force
    Write-Host "[OK] bundle.scene.js 已复制" -ForegroundColor Green
} else {
    Write-Host "[ERROR] 找不到 $bundleSrc，请先在 LayaAir IDE 中编译" -ForegroundColor Red
    pause
    exit 1
}

# 3. 确保 index.js 使用 GameMain 启动
$indexContent = Get-Content $indexPath -Raw
if ($indexContent -notmatch "GameMain") {
    Write-Host "[WARN] index.js 需要修复，请手动替换为支持 GameMain 的版本" -ForegroundColor Yellow
    Write-Host "或者运行以下命令修复 index.js:" -ForegroundColor Cyan
    Write-Host '  (Get-Content "$indexPath") -replace "Laya.Scene.open", "// Laya.Scene.open" | Set-Content "$indexPath"' -ForegroundColor Gray
} else {
    Write-Host "[OK] index.js 已配置 GameMain" -ForegroundColor Green
}

Write-Host "`n=== 修复完成！去抖音开发者工具点击编译 ===" -ForegroundColor Cyan
pause
