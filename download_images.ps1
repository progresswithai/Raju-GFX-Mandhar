$imageUrls = @(
    "https://designflash.in/wp-content/uploads/2025/01/RST.png.webp",
    "https://designflash.in/wp-content/uploads/2024/07/Group-378.png.webp",
    "https://designflash.in/wp-content/uploads/2024/07/Group-379.png.webp",
    "https://designflash.in/wp-content/uploads/2024/10/Baklava-Mockup.png.webp",
    "https://designflash.in/wp-content/uploads/2025/01/BNB-MC.png.webp",
    "https://designflash.in/wp-content/uploads/2024/10/shifiq-Mockup.png.webp",
    "https://designflash.in/wp-content/uploads/2025/01/Group-441.png.webp",
    "https://designflash.in/wp-content/uploads/2025/01/Group-441-2.png.webp",
    "https://designflash.in/wp-content/uploads/2024/11/Airmaster-Mock-up.png.webp"
)

$downloadDir = "$PSScriptRoot\portfolio_images"
if (-not (Test-Path $downloadDir)) {
    New-Item -ItemType Directory -Force -Path $downloadDir
}

foreach ($url in $imageUrls) {
    $fileName = [System.IO.Path]::GetFileName($url)
    $destination = Join-Path $downloadDir $fileName
    Write-Host "Downloading $fileName..."
    Invoke-WebRequest -Uri $url -OutFile $destination
}

Write-Host "All images downloaded successfully to $downloadDir"
Read-Host "Press Enter to exit..."
