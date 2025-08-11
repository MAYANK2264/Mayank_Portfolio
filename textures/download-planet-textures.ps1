# Planet Texture Downloader - Simplified Version
Write-Host "=== PLANET TEXTURE DOWNLOADER ===" -ForegroundColor Green

function Download-File {
    param($url, $output, $description)
    Write-Host "Downloading $description..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        Write-Host "✓ Success: $description" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Failed: $description" -ForegroundColor Red
        return $false
    }
}

# Create directories
Write-Host "Creating directory structure..."
$dirs = @("earth", "jupiter", "mars", "saturn", "uranus", "moon", "raw", "processed")
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}
Write-Host "✓ Directory structure created" -ForegroundColor Green

Write-Host "`n=== EARTH TEXTURES ===" -ForegroundColor Cyan
# Using smaller but accessible Earth textures first
Download-File "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.200407.3x5400x2700.jpg" "earth\earth_diffuse_2k.jpg" "Earth Surface 2K"
Download-File "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_bathy.5400x2700_8bit.jpg" "earth\earth_bump_2k.jpg" "Earth Elevation 2K"

Write-Host "`n=== MARS TEXTURES ===" -ForegroundColor Cyan
# Mars textures from reliable sources
Download-File "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA00409_hires.jpg" "mars\mars_surface.jpg" "Mars Surface"

Write-Host "`n=== MOON TEXTURES ===" -ForegroundColor Cyan  
Download-File "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg" "moon\moon_surface_1k.jpg" "Moon Surface 1K"

Write-Host "`n=== CREATING PLACEHOLDER TEXTURES ===" -ForegroundColor Magenta
# Create basic procedural textures for missing planets using PowerShell

# Jupiter - procedural bands
$jupiterReadme = @"
JUPITER TEXTURE SOURCES:
For high-quality Jupiter textures, download from:
1. Bjorn Jonsson Maps: http://bjj.mmedia.is/
2. Planet Pixel Emporium: https://planetpixelemporium.com/jupiter.html
3. NASA Juno Mission: https://www.missionjuno.swri.edu/junocam/processing

Recommended: jupiter2k.jpg (2048x1024) from planetpixelemporium.com
"@
$jupiterReadme | Out-File "jupiter\TEXTURE_SOURCES.txt"

# Saturn  
$saturnReadme = @"
SATURN TEXTURE SOURCES:
For Saturn textures and rings:
1. Planet Pixel Emporium: https://planetpixelemporium.com/saturn.html
2. Cassini Mission Archives: https://solarsystem.nasa.gov/missions/cassini/
3. Bjorn Jonsson Maps: http://bjj.mmedia.is/

Required files:
- saturn2k.jpg (planet surface)
- saturnringcolor.jpg (ring texture)
- saturnringpattern.gif (ring transparency map)
"@
$saturnReadme | Out-File "saturn\TEXTURE_SOURCES.txt"

# Uranus
$uranusReadme = @"
URANUS TEXTURE SOURCES:
Limited texture options available:
1. Planet Pixel Emporium: https://planetpixelemporium.com/uranus.html
2. Voyager 2 based reconstructions

Recommended: uranus2k.jpg from planetpixelemporium.com
Note: Uranus has minimal surface features
"@
$uranusReadme | Out-File "uranus\TEXTURE_SOURCES.txt"

Write-Host "`n✓ Created texture source guides for gas giants" -ForegroundColor Green

Write-Host "`n=== SUMMARY ===" -ForegroundColor Yellow
Write-Host "Downloaded textures saved in respective directories"
Write-Host "Manual acquisition needed for Jupiter, Saturn, Uranus"
Write-Host "Check TEXTURE_SOURCES.txt files for download links"

# Check what we successfully downloaded
Write-Host "`n=== DOWNLOADED FILES ===" -ForegroundColor White
Get-ChildItem -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|png|tif|tiff)$" } | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    $dirName = $_.DirectoryName.Split('\\')[-1]
    Write-Host "$dirName\$($_.Name) ($sizeMB MB)" -ForegroundColor Cyan
}
