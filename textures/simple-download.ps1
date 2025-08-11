# Simple Planet Texture Downloader
Write-Host "Planet Texture Downloader Started" -ForegroundColor Green

# Create directories
$dirs = @("earth", "jupiter", "mars", "saturn", "uranus", "moon", "raw")
foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
}

Write-Host "Downloading Earth textures..." -ForegroundColor Yellow
try {
    Invoke-WebRequest -Uri "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.200407.3x5400x2700.jpg" -OutFile "earth\earth_diffuse_2k.jpg"
    Write-Host "Earth diffuse texture downloaded" -ForegroundColor Green
} catch {
    Write-Host "Earth diffuse download failed" -ForegroundColor Red
}

try {
    Invoke-WebRequest -Uri "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_bathy.5400x2700_8bit.jpg" -OutFile "earth\earth_elevation_2k.jpg"
    Write-Host "Earth elevation texture downloaded" -ForegroundColor Green
} catch {
    Write-Host "Earth elevation download failed" -ForegroundColor Red
}

Write-Host "Creating texture source guides..." -ForegroundColor Yellow

# Jupiter
"JUPITER TEXTURE SOURCES:
1. Planet Pixel Emporium: https://planetpixelemporium.com/jupiter.html
2. Bjorn Jonsson Maps: http://bjj.mmedia.is/

Download jupiter2k.jpg (2048x1024)" | Out-File "jupiter\sources.txt"

# Saturn  
"SATURN TEXTURE SOURCES:
1. Planet Pixel Emporium: https://planetpixelemporium.com/saturn.html
2. Cassini Mission: https://solarsystem.nasa.gov/missions/cassini/

Download:
- saturn2k.jpg (planet)
- saturnringcolor.jpg (rings color)
- saturnringpattern.gif (rings alpha)" | Out-File "saturn\sources.txt"

# Mars
try {
    Invoke-WebRequest -Uri "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA00409_hires.jpg" -OutFile "mars\mars_surface.jpg"
    Write-Host "Mars texture downloaded" -ForegroundColor Green
} catch {
    Write-Host "Mars download failed" -ForegroundColor Red
}

# Moon
try {
    Invoke-WebRequest -Uri "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg" -OutFile "moon\moon_surface_1k.jpg"
    Write-Host "Moon texture downloaded" -ForegroundColor Green
} catch {
    Write-Host "Moon download failed" -ForegroundColor Red
}

# Uranus
"URANUS TEXTURE SOURCES:
1. Planet Pixel Emporium: https://planetpixelemporium.com/uranus.html

Download uranus2k.jpg" | Out-File "uranus\sources.txt"

Write-Host "Texture acquisition completed!" -ForegroundColor Green
Write-Host "Check individual planet directories for files and sources" -ForegroundColor Cyan
