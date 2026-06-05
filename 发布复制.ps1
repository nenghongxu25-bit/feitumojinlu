# 每次在LayaAir构建后运行此脚本，复制场景和脚本到发布目录
$src = "d:\Desktop\新建文件夹\LayaProject\assets"
$dst = "d:\Desktop\新建文件夹\LayaProject\release\bytedancegame"
$jsSrc = "d:\Desktop\新建文件夹\LayaProject\bin\js\bundles"

# 复制场景文件
Copy-Item "$src\MainPage.ls" $dst -Force
Copy-Item "$src\MapPage.ls" $dst -Force
Copy-Item "$src\无兴村地图.ls" $dst -Force
Copy-Item "$src\石坝镇地图.ls" $dst -Force
Copy-Item "$src\大岭山区地图.ls" $dst -Force
Copy-Item "$src\长岭市中心地图.ls" $dst -Force
Copy-Item "$src\长岭工业园区地图.ls" $dst -Force
Copy-Item "$src\长岭城西地图.ls" $dst -Force

# 复制脚本包
Copy-Item "$jsSrc\JumpTo.scene.js" "$dst\js\bundle.scene.js" -Force

# 确保 game.js 加载 bundle.scene.js
$gameJs = "$dst\game.js"
$content = Get-Content $gameJs -Raw
if ($content -notmatch "bundle\.scene\.js") {
    $content = $content.Replace('require("js/bundle.js");', 'require("js/bundle.js");' + "`n//" + "`nrequire(`"js/bundle.scene.js`");")
    Set-Content $gameJs $content -Encoding UTF8
}

Write-Host "=== 发布文件已更新 ===" -ForegroundColor Green
