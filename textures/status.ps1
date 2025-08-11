# Texture Status Report
Write-Host "=== PLANET TEXTURE STATUS ===" -ForegroundColor Green

Write-Host "`nCurrent texture inventory:" -ForegroundColor Cyan
Get-ChildItem -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|png|tif)$" } | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Directory.Name)\$($_.Name) - $sizeMB MB" -ForegroundColor White
}

# Create texture status report
$report = "# Planet Texture Collection Status`n"
$report += "Generated: $(Get-Date)`n`n"

$planets = @("earth", "mars", "moon", "jupiter", "saturn", "uranus")

foreach ($planet in $planets) {
    $report += "## $planet`n"
    
    if (Test-Path $planet) {
        $files = Get-ChildItem -Path $planet -File
        if ($files.Count -gt 0) {
            $report += "**Available:**`n"
            foreach ($file in $files) {
                if ($file.Extension -match "\.(jpg|png|tif)$") {
                    $sizeMB = [math]::Round($file.Length / 1MB, 2)
                    $report += "- TEXTURE: $($file.Name) ($sizeMB MB)`n"
                } else {
                    $report += "- INFO: $($file.Name)`n"
                }
            }
        } else {
            $report += "- No textures available`n"
        }
        
        $report += "`n**Still needed:**`n"
        $textureTypes = @("diffuse", "normal", "specular", "clouds")
        foreach ($type in $textureTypes) {
            $hasType = $files | Where-Object { $_.Name -match $type }
            if (!$hasType) {
                $report += "- $type map`n"
            }
        }
    } else {
        $report += "- Directory missing`n"
    }
    $report += "`n"
}

$report += @"
## Acquisition Status Summary

### Completed
- Moon: 1K surface texture (139 KB)
- Directory structure created
- Source guides for gas giants

### In Progress
- Earth textures (manual download needed)
- Mars textures (manual download needed)
- Jupiter/Saturn/Uranus (manual download needed)

### Next Steps
1. Visit NASA/USGS sources for Earth/Mars
2. Download from Planet Pixel Emporium for gas giants  
3. Process and optimize to 2K-4K
4. Generate missing texture types
5. Convert to KTX2 compressed format

## Manual Download Sources
- Earth: NASA Visible Earth (visibleearth.nasa.gov)
- Mars: USGS Astrogeology (astrogeology.usgs.gov)
- Gas Giants: Planet Pixel Emporium (planetpixelemporium.com)
- Alternative: Solar System Scope (solarsystemscope.com/textures/)

## Tool Requirements
- ImageMagick: Resize and process textures
- KTX Tools: Convert to compressed KTX2 format
"@

$report | Out-File "TEXTURE_COLLECTION_STATUS.md" -Encoding UTF8

# Process Moon texture if available
$moonTexture = Get-ChildItem -Path "moon" -File | Where-Object { $_.Extension -match "\.(jpg|png)$" } | Select-Object -First 1

if ($moonTexture) {
    Write-Host "`nProcessing Moon texture..." -ForegroundColor Yellow
    try {
        Copy-Item $moonTexture.FullName "processed\moon_surface_original.jpg" -Force
        Write-Host "Moon texture copied to processed directory" -ForegroundColor Green
    } catch {
        Write-Host "Failed to copy Moon texture" -ForegroundColor Red
    }
}

Write-Host "`n=== STATUS REPORT COMPLETED ===" -ForegroundColor Green
Write-Host "Generated: TEXTURE_COLLECTION_STATUS.md" -ForegroundColor White
