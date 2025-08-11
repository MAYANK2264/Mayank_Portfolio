# Professional Planet Texture Acquisition Script
# Curated high-quality sources for realistic planet rendering

Write-Host "=== PLANET TEXTURE SUITE DOWNLOADER ===" -ForegroundColor Green

function Get-Texture {
    param($url, $path, $name)
    Write-Host "Getting $name..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $url -OutFile $path -UserAgent "Mozilla/5.0"
        Write-Host "✓ $name" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed: $name" -ForegroundColor Red
    }
}

# Create planet directories
"earth", "jupiter", "mars", "saturn", "uranus", "moon" | ForEach-Object { 
    New-Item -ItemType Directory -Path $_ -Force | Out-Null 
}

Write-Host "`n=== EARTH TEXTURES ===" -ForegroundColor Cyan

# Earth - NASA Blue Marble 2002 (high quality alternatives)
Get-Texture "https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography/57752l.jpg" "earth\earth_diffuse_4k.jpg" "Earth Surface 4K"

# Earth elevation/normal from Natural Earth
Get-Texture "https://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/raster/HYP_HR_SR_OB_DR.zip" "earth\earth_natural_earth.zip" "Earth Natural Relief"

# Earth night lights  
Get-Texture "https://visibleearth.nasa.gov/images/55167/earths-city-lights/55167l.jpg" "earth\earth_night_lights.jpg" "Earth Night Lights"

Write-Host "`n=== MARS TEXTURES ===" -ForegroundColor Cyan

# Mars - Viking MDIM 2.1 (color)
Get-Texture "https://astrogeology.usgs.gov/cache/images/f5e372a36edfa389625da6d0cc25d4c0_mars_viking_mdim21_ClrMosaic_global_232m.tif" "mars\mars_surface_color.tif" "Mars Surface Color 4K"

# Mars elevation
Get-Texture "https://astrogeology.usgs.gov/cache/images/7677c0a9c80deae19a98c88b8c7b0b7f_mars_mgs_mola-dem_mosaic_global_463m.tif" "mars\mars_elevation.tif" "Mars Elevation 4K"

Write-Host "`n=== MOON TEXTURES ===" -ForegroundColor Cyan

# Moon LRO color
Get-Texture "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_4k.tif" "moon\moon_surface_4k.tif" "Moon Surface 4K"

# Moon elevation
Get-Texture "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg" "moon\moon_elevation_4k.jpg" "Moon Elevation 4K"

Write-Host "`n=== GAS GIANT TEXTURES ===" -ForegroundColor Cyan

# Use reliable placeholder textures for gas giants (these need manual curation)
# Jupiter
New-Item -ItemType File -Path "jupiter\README.txt" -Force -Value @"
JUPITER TEXTURES NEEDED:
- Diffuse: High-quality Cassini/Juno composite
- Normal: Cloud band height variations  
- Specular: Minimal (gas giant)

Sources to check manually:
- NASA/JPL Cassini mission data
- Björn Jónsson's planetary maps
- Planet Pixel Emporium
"@ | Out-Null

# Saturn  
New-Item -ItemType File -Path "saturn\README.txt" -Force -Value @"
SATURN TEXTURES NEEDED:
- Diffuse: Cassini composite
- Rings: Separate transparent PNG with alpha
- Normal: Subtle atmospheric bands

Ring structure needs careful processing for transparency.
"@ | Out-Null

# Uranus
New-Item -ItemType File -Path "uranus\README.txt" -Force -Value @"
URANUS TEXTURES NEEDED:  
- Diffuse: Voyager 2 based reconstruction
- Minimal surface detail (featureless blue-green)
- Rings: Faint, separate texture

Limited source imagery available.
"@ | Out-Null

Write-Host "`n=== DOWNLOADING SAMPLE HIGH-QUALITY TEXTURES ===" -ForegroundColor Magenta

# Get some reliable free textures as a starting point
Get-Texture "https://download.blender.org/demo/test/hdr/sunrise_map.jpg" "raw\sample_hdr.jpg" "Sample HDR Environment"

Write-Host "`n=== TEXTURE ACQUISITION SUMMARY ===" -ForegroundColor Green
Write-Host "✓ Directory structure created"
Write-Host "✓ NASA/USGS Earth and Mars textures attempted"  
Write-Host "✓ Moon LRO textures attempted"
Write-Host "! Gas giant textures require manual curation"
Write-Host "! Check README files in each planet directory"

Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Verify downloads completed successfully"
Write-Host "2. Manually acquire gas giant textures from specialized sources"
Write-Host "3. Process and optimize all textures to 2K-4K" 
Write-Host "4. Convert to compressed formats (KTX2)"
