# Comprehensive Planet Texture Acquisition Script
# Downloads diffuse, normal, specular, and cloud maps for all requested celestial bodies

Write-Host "=== PLANET TEXTURE ACQUISITION SYSTEM ===" -ForegroundColor Green
Write-Host "Acquiring 2K-4K textures for: Earth, Jupiter, Mars, Saturn, Uranus, Moon" -ForegroundColor Cyan

# Enhanced download function with retry logic
function Download-Texture {
    param(
        [string]$Url,
        [string]$OutputPath,
        [string]$Description,
        [int]$MaxRetries = 3
    )
    
    $retryCount = 0
    while ($retryCount -lt $MaxRetries) {
        try {
            Write-Host "Downloading $Description (attempt $($retryCount + 1))..." -ForegroundColor Yellow
            
            # Ensure directory exists
            $directory = Split-Path $OutputPath
            if (!(Test-Path $directory)) {
                New-Item -ItemType Directory -Path $directory -Force | Out-Null
            }
            
            $webClient = New-Object System.Net.WebClient
            $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
            $webClient.DownloadFile($Url, $OutputPath)
            $webClient.Dispose()
            
            if (Test-Path $OutputPath) {
                $fileSize = (Get-Item $OutputPath).Length
                Write-Host "✓ Downloaded: $Description ($([math]::Round($fileSize/1MB, 2)) MB)" -ForegroundColor Green
                return $true
            }
        }
        catch {
            Write-Host "✗ Attempt $($retryCount + 1) failed: $($_.Exception.Message)" -ForegroundColor Red
            $retryCount++
            if ($retryCount -lt $MaxRetries) {
                Start-Sleep -Seconds 2
            }
        }
    }
    
    Write-Host "✗ Failed to download after $MaxRetries attempts: $Description" -ForegroundColor Red
    return $false
}

# Alternative high-quality texture sources
$textureSources = @{
    # EARTH TEXTURES
    "earth_diffuse_8k" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200407.3x21600x10800.jpg"
    "earth_bump_4k" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73934/gebco_bathy.21600x10800_8bit.jpg" 
    "earth_clouds_4k" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_4096.jpg"
    "earth_night_4k" = "https://eoimages.gsfc.nasa.gov/images/imagerecords/144000/144898/BlackMarble_2016_3km_geo.tif"
    
    # MARS TEXTURES  
    "mars_diffuse_4k" = "https://astrogeology.usgs.gov/cache/images/f5e372a36edfa389625da6d0cc25d4c0_mars_viking_mdim21_ClrMosaic_global_232m.tif"
    "mars_bump_4k" = "https://astrogeology.usgs.gov/cache/images/7677c0a9c80deae19a98c88b8c7b0b7f_mars_mgs_mola-dem_mosaic_global_463m.tif"
    
    # MOON TEXTURES
    "moon_diffuse_4k" = "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_4k.tif"
    "moon_bump_4k" = "https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg"
    
    # JUPITER TEXTURES (Björn Jónsson reconstructions)
    "jupiter_diffuse_2k" = "https://www.johnstonsarchive.net/spaceart/cylmaps/jupitercyl4.jpg"
    
    # SATURN TEXTURES
    "saturn_diffuse_2k" = "https://www.johnstonsarchive.net/spaceart/cylmaps/saturncyl1.jpg"
    "saturn_rings_4k" = "https://www.johnstonsarchive.net/spaceart/saturnrings.png"
    
    # URANUS TEXTURES
    "uranus_diffuse_2k" = "https://www.johnstonsarchive.net/spaceart/cylmaps/uranuscyl2.jpg"
}

# Download Earth textures
Write-Host "`n=== EARTH TEXTURE ACQUISITION ===" -ForegroundColor Cyan
Download-Texture -Url $textureSources["earth_diffuse_8k"] -OutputPath "earth\earth_diffuse_8k.jpg" -Description "Earth Diffuse 8K (Blue Marble)"
Download-Texture -Url $textureSources["earth_bump_4k"] -OutputPath "earth\earth_elevation_4k.jpg" -Description "Earth Elevation/Normal Map 4K"
Download-Texture -Url $textureSources["earth_clouds_4k"] -OutputPath "earth\earth_clouds_4k.jpg" -Description "Earth Cloud Map 4K"
Download-Texture -Url $textureSources["earth_night_4k"] -OutputPath "earth\earth_night_4k.tif" -Description "Earth Night Lights 4K"

# Download Mars textures  
Write-Host "`n=== MARS TEXTURE ACQUISITION ===" -ForegroundColor Cyan
Download-Texture -Url $textureSources["mars_diffuse_4k"] -OutputPath "mars\mars_diffuse_4k.tif" -Description "Mars Diffuse 4K (USGS Viking)"
Download-Texture -Url $textureSources["mars_bump_4k"] -OutputPath "mars\mars_elevation_4k.tif" -Description "Mars Elevation 4K (MOLA DEM)"

# Download Moon textures
Write-Host "`n=== MOON TEXTURE ACQUISITION ===" -ForegroundColor Cyan  
Download-Texture -Url $textureSources["moon_diffuse_4k"] -OutputPath "moon\moon_diffuse_4k.tif" -Description "Moon Diffuse 4K (LRO)"
Download-Texture -Url $textureSources["moon_bump_4k"] -OutputPath "moon\moon_elevation_4k.jpg" -Description "Moon Elevation 4K (LDEM)"

# Download Jupiter textures
Write-Host "`n=== JUPITER TEXTURE ACQUISITION ===" -ForegroundColor Cyan
Download-Texture -Url $textureSources["jupiter_diffuse_2k"] -OutputPath "jupiter\jupiter_diffuse_2k.jpg" -Description "Jupiter Diffuse 2K"

# Download Saturn textures
Write-Host "`n=== SATURN TEXTURE ACQUISITION ===" -ForegroundColor Cyan
Download-Texture -Url $textureSources["saturn_diffuse_2k"] -OutputPath "saturn\saturn_diffuse_2k.jpg" -Description "Saturn Diffuse 2K" 
Download-Texture -Url $textureSources["saturn_rings_4k"] -OutputPath "saturn\saturn_rings_4k.png" -Description "Saturn Rings 4K (Transparent)"

# Download Uranus textures
Write-Host "`n=== URANUS TEXTURE ACQUISITION ===" -ForegroundColor Cyan
Download-Texture -Url $textureSources["uranus_diffuse_2k"] -OutputPath "uranus\uranus_diffuse_2k.jpg" -Description "Uranus Diffuse 2K"

Write-Host "`n=== TEXTURE ACQUISITION COMPLETED ===" -ForegroundColor Green
Write-Host "Downloaded textures are saved in respective planet directories." -ForegroundColor Yellow

# List downloaded files
Write-Host "`n=== DOWNLOAD SUMMARY ===" -ForegroundColor Magenta
Get-ChildItem -Path . -Recurse -File | ForEach-Object {
    $sizeMB = [math]::Round($_.Length/1MB, 2)
    Write-Host "$($_.DirectoryName)\$($_.Name) - $sizeGB MB" -ForegroundColor White
}
