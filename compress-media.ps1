# Media Compression Script for Netlify Upload
# This script compresses videos and audio files to reduce upload size

Write-Host "Starting media compression..." -ForegroundColor Green

# Check if ffmpeg is available
try {
    $ffmpegVersion = ffmpeg -version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "ffmpeg not found"
    }
    Write-Host "ffmpeg found, proceeding with compression..." -ForegroundColor Green
} catch {
    Write-Host "ffmpeg not found. Please install ffmpeg first:" -ForegroundColor Red
    Write-Host "1. Download from https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "2. Or install via chocolatey: choco install ffmpeg" -ForegroundColor Yellow
    Write-Host "3. Or install via winget: winget install ffmpeg" -ForegroundColor Yellow
    exit 1
}

# Create compressed directory
$compressedDir = "public\compressed"
if (!(Test-Path $compressedDir)) {
    New-Item -ItemType Directory -Path $compressedDir
    Write-Host "Created compressed directory" -ForegroundColor Green
}

# Compress videos
Write-Host "Compressing videos..." -ForegroundColor Yellow
$videoFiles = @(
    "public\video\story-explorer-bg.mp4",
    "public\video\20250910_1508_South Africa's Natural Beauty_simple_compose_01k4tgemd1fqrsqx9h5ay1y9ce.mp4",
    "public\video\20250910_1535_Savanna Sunset Serenity_remix_01k4tj0hbbekd865ng1cpwyg42.mp4"
)

foreach ($video in $videoFiles) {
    if (Test-Path $video) {
        $fileName = [System.IO.Path]::GetFileName($video)
        $outputPath = "$compressedDir\$fileName"
        
        Write-Host "Compressing $fileName..." -ForegroundColor Cyan
        
        # Compress video with good quality but smaller size
        ffmpeg -i $video -c:v libx264 -crf 28 -c:a aac -b:a 128k -movflags +faststart $outputPath -y
        
        if ($LASTEXITCODE -eq 0) {
            $originalSize = (Get-Item $video).Length
            $compressedSize = (Get-Item $outputPath).Length
            $reduction = [math]::Round((1 - $compressedSize / $originalSize) * 100, 1)
            Write-Host "✓ Compressed $fileName - Size reduced by $reduction%" -ForegroundColor Green
        } else {
            Write-Host "✗ Failed to compress $fileName" -ForegroundColor Red
        }
    }
}

# Compress audio files
Write-Host "Compressing audio files..." -ForegroundColor Yellow
$audioFiles = Get-ChildItem "public\music\*.mp3"

foreach ($audio in $audioFiles) {
    $outputPath = "$compressedDir\$($audio.Name)"
    
    Write-Host "Compressing $($audio.Name)..." -ForegroundColor Cyan
    
    # Compress audio to 96kbps for web
    ffmpeg -i $audio.FullName -c:a libmp3lame -b:a 96k $outputPath -y
    
    if ($LASTEXITCODE -eq 0) {
        $originalSize = $audio.Length
        $compressedSize = (Get-Item $outputPath).Length
        $reduction = [math]::Round((1 - $compressedSize / $originalSize) * 100, 1)
        Write-Host "✓ Compressed $($audio.Name) - Size reduced by $reduction%" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to compress $($audio.Name)" -ForegroundColor Red
    }
}

# Show compression summary
Write-Host "`nCompression Summary:" -ForegroundColor Green
$originalTotal = (Get-ChildItem "public\video\*.mp4", "public\music\*.mp3" | Measure-Object -Property Length -Sum).Sum
$compressedTotal = (Get-ChildItem "$compressedDir\*" | Measure-Object -Property Length -Sum).Sum
$totalReduction = [math]::Round((1 - $compressedTotal / $originalTotal) * 100, 1)

Write-Host "Original size: $([math]::Round($originalTotal / 1MB, 2)) MB" -ForegroundColor White
Write-Host "Compressed size: $([math]::Round($compressedTotal / 1MB, 2)) MB" -ForegroundColor White
Write-Host "Total reduction: $totalReduction%" -ForegroundColor Green

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Copy compressed files to replace originals" -ForegroundColor White
Write-Host "2. Rebuild the project: npm run build" -ForegroundColor White
Write-Host "3. Upload the new dist folder to Netlify" -ForegroundColor White









