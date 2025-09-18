# Optimize project for Netlify upload
# This script removes unused files and optimizes the build

Write-Host "Optimizing project for upload..." -ForegroundColor Green

# Remove unused audio files (keep only A1-A8 as we have 8 destinations)
Write-Host "Removing unused audio files..." -ForegroundColor Yellow
$unusedAudio = "public\music\A9.mp3"
if (Test-Path $unusedAudio) {
    Remove-Item $unusedAudio
    Write-Host "✓ Removed A9.mp3 (unused)" -ForegroundColor Green
}

# Remove placeholder files
Write-Host "Removing placeholder files..." -ForegroundColor Yellow
$placeholderFiles = @(
    "public\video\placeholder.txt"
)

foreach ($file in $placeholderFiles) {
    if (Test-Path $file) {
        Remove-Item $file
        Write-Host "✓ Removed $file" -ForegroundColor Green
    }
}

# Clean dist folder and rebuild
Write-Host "Cleaning and rebuilding..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Cleaned dist folder" -ForegroundColor Green
}

# Rebuild with optimizations
Write-Host "Rebuilding project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Build completed successfully" -ForegroundColor Green
    
    # Show new size
    $newSize = (Get-ChildItem -Path dist -Recurse | Measure-Object -Property Length -Sum).Sum
    Write-Host "New dist size: $([math]::Round($newSize / 1MB, 2)) MB" -ForegroundColor Green
    
    # Show largest files
    Write-Host "`nLargest files in dist:" -ForegroundColor Yellow
    Get-ChildItem -Path dist -Recurse | Sort-Object Length -Descending | Select-Object -First 5 Name, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
    
} else {
    Write-Host "✗ Build failed" -ForegroundColor Red
}

Write-Host "`nOptimization complete!" -ForegroundColor Green
Write-Host "You can now upload the dist folder to Netlify" -ForegroundColor White









