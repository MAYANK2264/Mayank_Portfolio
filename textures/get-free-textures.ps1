# Free Planet Texture Acquisition using curl
Write-Host "=== FREE PLANET TEXTURE DOWNLOADER ===" -ForegroundColor Green

# Function to download with curl (more reliable)
function Get-TextureWithCurl {
    param($url, $output, $description)
    Write-Host "Downloading $description..." -ForegroundColor Yellow
    try {
        $result = curl.exe -L -o $output $url --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" --silent --show-error
        if (Test-Path $output -and (Get-Item $output).Length -gt 1000) {
            Write-Host "✓ $description downloaded" -ForegroundColor Green
            return $true
        } else {
            Write-Host "✗ $description failed or too small" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "✗ $description failed" -ForegroundColor Red
        return $false
    }
}

Write-Host "`n=== DOWNLOADING FREE TEXTURE ALTERNATIVES ===" -ForegroundColor Cyan

# Earth - Use OpenGameArt textures as alternatives
Get-TextureWithCurl "https://opengameart.org/sites/default/files/earth_diffuse.jpg" "earth\earth_alt_diffuse.jpg" "Earth Alternative Diffuse"

# Mars - Use NASA JPL archives
Get-TextureWithCurl "https://photojournal.jpl.nasa.gov/jpegMod/PIA00407_modest.jpg" "mars\mars_viking.jpg" "Mars Viking Composite"

# Jupiter - Use Solar System Scope texture (free for non-commercial)
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg" "jupiter\jupiter_2k.jpg" "Jupiter 2K Texture"

# Saturn - Use Solar System Scope texture
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg" "saturn\saturn_2k.jpg" "Saturn 2K Texture"
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png" "saturn\saturn_rings_alpha.png" "Saturn Rings Alpha"

# Uranus
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg" "uranus\uranus_2k.jpg" "Uranus 2K Texture"

# Earth night lights alternative
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg" "earth\earth_night_2k.jpg" "Earth Night Lights 2K"

# Earth clouds
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg" "earth\earth_clouds_2k.jpg" "Earth Clouds 2K"

# Earth normal/bump
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.tif" "earth\earth_normal_2k.tif" "Earth Normal Map 2K"

# Mars normal
Get-TextureWithCurl "https://www.solarsystemscope.com/textures/download/2k_mars_normal_map.tif" "mars\mars_normal_2k.tif" "Mars Normal Map 2K"

Write-Host "`n=== CREATING PROCEDURAL TEXTURES ===" -ForegroundColor Magenta

# Create a simple specular map for Earth (water areas)
Write-Host "Creating Earth specular map..." -ForegroundColor Yellow
# This would ideally be done with image processing tools, but we'll create placeholder info
"# Earth Specular Map Generation Guide

To create Earth specular maps:
1. Use the diffuse texture as base
2. Mask ocean areas (blue regions) -> high specularity (white)
3. Land areas -> low specularity (dark gray/black)
4. Save as grayscale PNG/JPG

Tools: GIMP, Photoshop, or ImageMagick
Command example: convert earth_diffuse_2k.jpg -threshold 40% earth_specular_2k.jpg
" | Out-File "earth\create_specular_guide.txt"

# Create Saturn ring processing guide
"# Saturn Ring Processing Guide

Saturn rings need special handling:
1. Download color ring texture
2. Download alpha/transparency mask
3. Combine using image editor:
   - Color rings as RGB channels
   - Alpha mask as transparency channel
4. Save as PNG with transparency

Result: saturn_rings_final.png (with alpha channel)
" | Out-File "saturn\ring_processing_guide.txt"

Write-Host "`n=== SUMMARY ===" -ForegroundColor Green
Write-Host "Free texture downloads attempted from Solar System Scope"
Write-Host "Check each planet directory for downloaded files"
Write-Host "Review processing guides for advanced textures"

# List what we got
Write-Host "`n=== DOWNLOADED TEXTURES ===" -ForegroundColor White
Get-ChildItem -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|png|tif)$" } | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Directory.Name)\$($_.Name) - $sizeMB MB" -ForegroundColor Cyan
}
