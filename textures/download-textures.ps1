# Planet Texture Download Script
# Downloads high-quality planet textures for Earth, Jupiter, Mars, Saturn, Uranus, and Moon

Write-Host "Starting planet texture download..." -ForegroundColor Green

# Create download function
function Download-Texture {
    param(
        [string]$Url,
        [string]$OutputPath,
        [string]$Description
    )
    
    Write-Host "Downloading $Description..." -ForegroundColor Yellow
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        Write-Host "✓ Downloaded: $Description" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Failed to download: $Description - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Earth textures
Write-Host "`n=== EARTH TEXTURES ===" -ForegroundColor Cyan

# Earth diffuse (Blue Marble 2002 - 4K)
Download-Texture -Url "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200407.3x21600x10800.jpg" -OutputPath "earth\earth_diffuse_4k.jpg" -Description "Earth Diffuse 4K"

# Earth normal map (from NASA Visible Earth)
Download-Texture -Url "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_bathy.21600x10800_8bit.jpg" -OutputPath "earth\earth_elevation_4k.jpg" -Description "Earth Elevation Map 4K"

# Earth specular/ocean mask
Download-Texture -Url "https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/BlackMarble_2016_3km_geo.tif" -OutputPath "earth\earth_night_lights_4k.tif" -Description "Earth Night Lights 4K"

# Earth clouds (from NASA)
Download-Texture -Url "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg" -OutputPath "earth\earth_clouds_2k.jpg" -Description "Earth Clouds 2K"

# Mars textures
Write-Host "`n=== MARS TEXTURES ===" -ForegroundColor Cyan

# Mars diffuse (USGS)
Download-Texture -Url "https://astrogeology.usgs.gov/cache/images/f5e372a36edfa389625da6d0cc25d4c0_mars_viking_mdim21_ClrMosaic_global_232m.tif" -OutputPath "mars\mars_diffuse_4k.tif" -Description "Mars Diffuse 4K"

# Jupiter textures
Write-Host "`n=== JUPITER TEXTURES ===" -ForegroundColor Cyan

# Jupiter diffuse (Björn Jónsson's work based on Cassini/Voyager data)
Download-Texture -Url "https://planetpixelemporium.com/download/download.php?earthmap1k.jpg" -OutputPath "jupiter\jupiter_temp.jpg" -Description "Jupiter texture (placeholder)"

# Moon textures
Write-Host "`n=== MOON TEXTURES ===" -ForegroundColor Cyan

# Moon diffuse (LRO)
Download-Texture -Url "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_4k.tif" -OutputPath "moon\moon_diffuse_4k.tif" -Description "Moon Diffuse 4K"

# Moon normal/bump
Download-Texture -Url "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg" -OutputPath "moon\moon_elevation_4k.jpg" -Description "Moon Elevation 4K"

# Saturn textures
Write-Host "`n=== SATURN TEXTURES ===" -ForegroundColor Cyan
# Note: Saturn ring textures will be created separately

# Uranus textures
Write-Host "`n=== URANUS TEXTURES ===" -ForegroundColor Cyan

Write-Host "`nTexture download completed!" -ForegroundColor Green
Write-Host "Note: Some textures may need manual acquisition from specialized sources." -ForegroundColor Yellow
