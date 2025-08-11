# Simple Texture Processing Script
Write-Host "=== PROCESSING EXISTING TEXTURES ===" -ForegroundColor Green

# Check current texture inventory
Write-Host "Current texture inventory:" -ForegroundColor Cyan
Get-ChildItem -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|png|tif)$" } | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Directory.Name)\$($_.Name) - $sizeMB MB" -ForegroundColor White
}

# Create texture manifest
$textureManifest = @"
# Planet Texture Manifest
Generated: $(Get-Date)

## Available Textures
"@

$planets = @("earth", "mars", "moon", "jupiter", "saturn", "uranus")
$textureTypes = @("diffuse", "normal", "specular", "clouds")

foreach ($planet in $planets) {
    $textureManifest += "`n`n### $planet`n"
    
    if (Test-Path $planet) {
        $files = Get-ChildItem -Path $planet -File
        if ($files.Count -gt 0) {
            foreach ($file in $files) {
                if ($file.Extension -match "\.(jpg|png|tif)$") {
                    $sizeMB = [math]::Round($file.Length / 1MB, 2)
                    $textureManifest += "- ✅ $($file.Name) ($sizeMB MB)`n"
                } else {
                    $textureManifest += "- 📄 $($file.Name) (guide/info)`n"
                }
            }
        } else {
            $textureManifest += "- ❌ No textures found`n"
        }
        
        # List what's needed
        $textureManifest += "`n**Still needed:**`n"
        foreach ($type in $textureTypes) {
            $hasType = $files | Where-Object { $_.Name -match $type }
            if (!$hasType) {
                $textureManifest += "- ⭕ $type map`n"
            }
        }
    } else {
        $textureManifest += "- ❌ Directory not found`n"
    }
}

$textureManifest += @"

## Next Steps
1. Manual download from sources in manual-texture-guide.md
2. Run ImageMagick optimization (if available)
3. Generate missing texture maps
4. Convert to KTX2 format

## Tool Installation
- ImageMagick: https://imagemagick.org/script/download.php#windows
- KTX Tools: https://github.com/KhronosGroup/KTX-Software/releases

## Processing Commands
```powershell
# Resize to 2K
magick input.jpg -resize 2048x1024 -quality 95 output_2k.jpg

# Generate specular from diffuse (Earth oceans)
magick earth_diffuse.jpg -channel B -separate -threshold 40% -negate earth_specular.jpg

# Generate normal from height
magick elevation.jpg -colorspace Gray -emboss 2 -normalize normal.jpg

# Convert to KTX2
toktx --genmipmap --encode ETC1S output.ktx2 input.jpg
```
"@

$textureManifest | Out-File "TEXTURE_STATUS.md" -Encoding UTF8

Write-Host "`n✅ Created texture status report: TEXTURE_STATUS.md" -ForegroundColor Green

# Process Moon texture if available
$moonTexture = Get-ChildItem -Path "moon" -File | Where-Object { $_.Extension -match "\.(jpg|png)$" } | Select-Object -First 1

if ($moonTexture) {
    Write-Host "`nProcessing Moon texture..." -ForegroundColor Yellow
    
    # Try to optimize Moon texture with basic tools
    try {
        # Check if ImageMagick is available
        magick --version | Out-Null
        $hasImageMagick = $true
        Write-Host "ImageMagick found - processing Moon texture" -ForegroundColor Green
        
        # Create 2K version
        $outputPath = "processed\moon_surface_2k.jpg"
        magick $moonTexture.FullName -resize 2048x1024 -quality 95 -strip $outputPath
        
        if (Test-Path $outputPath) {
            $outputSize = [math]::Round((Get-Item $outputPath).Length / 1MB, 2)
            Write-Host "✅ Created optimized Moon texture: $outputSize MB" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "ImageMagick not available - Moon texture copied as-is" -ForegroundColor Yellow
        Copy-Item $moonTexture.FullName "processed\moon_surface_original.jpg"
    }
} else {
    Write-Host "No Moon texture found to process" -ForegroundColor Red
}

Write-Host "`n=== TEXTURE PROCESSING COMPLETED ===" -ForegroundColor Green
Write-Host "✅ Generated texture status report" -ForegroundColor White
Write-Host "✅ Processed available textures" -ForegroundColor White  
Write-Host "📋 Review TEXTURE_STATUS.md for next steps" -ForegroundColor White
Write-Host "Manual download required for complete texture set" -ForegroundColor Yellow
