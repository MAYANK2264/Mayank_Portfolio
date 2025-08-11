# Planet Texture Optimization and Compression Script
# Optimizes textures to 2K-4K and converts to compressed formats (KTX2)

Write-Host "=== PLANET TEXTURE OPTIMIZER ===" -ForegroundColor Green
Write-Host "Optimizing textures to 2K-4K and converting to KTX2..." -ForegroundColor Cyan

# Check if required tools are available
function Test-Tool {
    param($toolName, $testCommand)
    try {
        $null = & $testCommand 2>$null
        Write-Host "✓ $toolName found" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "✗ $toolName not found" -ForegroundColor Red
        return $false
    }
}

Write-Host "`n=== CHECKING REQUIRED TOOLS ===" -ForegroundColor Yellow

# Check for ImageMagick
$hasImageMagick = Test-Tool "ImageMagick" "magick"

# Check for toktx (KTX2 encoder)
$hasToktx = Test-Tool "toktx (KTX2)" "toktx"

if (!$hasImageMagick) {
    Write-Host "`nImageMagick not found. Install from: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
}

if (!$hasToktx) {
    Write-Host "`nKTX Tools not found. Install from: https://github.com/KhronosGroup/KTX-Software/releases" -ForegroundColor Yellow
}

# Create optimization function
function Optimize-PlanetTexture {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [int]$targetWidth = 2048,
        [string]$textureType = "diffuse"
    )
    
    if (!(Test-Path $inputPath)) {
        Write-Host "✗ Input file not found: $inputPath" -ForegroundColor Red
        return $false
    }
    
    $outputDir = Split-Path $outputPath -Parent
    if (!(Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    Write-Host "Optimizing $inputPath..." -ForegroundColor Yellow
    
    try {
        # Calculate target height (maintain aspect ratio for cylindrical projection)
        $targetHeight = $targetWidth / 2
        
        if ($hasImageMagick) {
            # Resize and optimize with ImageMagick
            $magickArgs = @(
                $inputPath
                "-resize", "${targetWidth}x${targetHeight}"
                "-quality", "95"
                "-strip"  # Remove metadata
            )
            
            # Add specific processing based on texture type
            switch ($textureType) {
                "diffuse" {
                    $magickArgs += @("-colorspace", "sRGB")
                }
                "normal" {
                    $magickArgs += @("-colorspace", "RGB")
                }
                "specular" {
                    $magickArgs += @("-colorspace", "Gray")
                }
            }
            
            $magickArgs += $outputPath
            & magick @magickArgs
            
            if (Test-Path $outputPath) {
                Write-Host "✓ Optimized: $outputPath" -ForegroundColor Green
                return $true
            }
        } else {
            Write-Host "✗ ImageMagick required for optimization" -ForegroundColor Red
        }
    } catch {
        Write-Host "✗ Failed to optimize: $inputPath" -ForegroundColor Red
    }
    
    return $false
}

# Convert to KTX2 format
function Convert-ToKTX2 {
    param(
        [string]$inputPath,
        [string]$outputPath,
        [string]$textureType = "diffuse"
    )
    
    if (!$hasToktx -or !(Test-Path $inputPath)) {
        return $false
    }
    
    Write-Host "Converting to KTX2: $inputPath..." -ForegroundColor Yellow
    
    try {
        # KTX2 compression settings based on texture type
        $compressionFormat = switch ($textureType) {
            "diffuse" { "ETC1S" }  # Good for color textures
            "normal" { "UASTC" }   # Better for normal maps
            "specular" { "ETC1S" } # Good for grayscale
            default { "ETC1S" }
        }
        
        $toktxArgs = @(
            "--genmipmap"
            "--encode", $compressionFormat
            $outputPath
            $inputPath
        )
        
        & toktx @toktxArgs
        
        if (Test-Path $outputPath) {
            Write-Host "✓ KTX2 created: $outputPath" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "✗ Failed to create KTX2: $inputPath" -ForegroundColor Red
    }
    
    return $false
}

# Process existing textures
Write-Host "`n=== PROCESSING EXISTING TEXTURES ===" -ForegroundColor Cyan

$planets = @("earth", "mars", "moon", "jupiter", "saturn", "uranus")

foreach ($planet in $planets) {
    if (Test-Path $planet) {
        Write-Host "`n--- Processing $planet textures ---" -ForegroundColor White
        
        $textures = Get-ChildItem -Path $planet -File | Where-Object { $_.Extension -match "\.(jpg|png|tif|tiff)$" }
        
        foreach ($texture in $textures) {
            $inputPath = $texture.FullName
            $baseName = [System.IO.Path]::GetFileNameWithoutExtension($texture.Name)
            
            # Determine texture type from filename
            $textureType = "diffuse"  # Default
            if ($baseName -match "normal|elevation|bump|height") { $textureType = "normal" }
            elseif ($baseName -match "specular|spec|metallic") { $textureType = "specular" }
            elseif ($baseName -match "cloud|atmosphere") { $textureType = "diffuse" }
            
            # Create optimized version
            $optimizedPath = "processed\${planet}_${baseName}_2k.jpg"
            $success = Optimize-PlanetTexture -inputPath $inputPath -outputPath $optimizedPath -targetWidth 2048 -textureType $textureType
            
            # Convert to KTX2 if optimization successful
            if ($success -and $hasToktx) {
                $ktx2Path = "processed\${planet}_${baseName}_2k.ktx2"
                Convert-ToKTX2 -inputPath $optimizedPath -outputPath $ktx2Path -textureType $textureType
            }
        }
    }
}

# Create missing texture maps using procedural generation
Write-Host "`n=== GENERATING MISSING TEXTURE MAPS ===" -ForegroundColor Cyan

function Generate-SpecularMap {
    param($diffusePath, $outputPath)
    
    if (!(Test-Path $diffusePath) -or !$hasImageMagick) { return $false }
    
    Write-Host "Generating specular map from $diffusePath..." -ForegroundColor Yellow
    
    try {
        # For Earth: create ocean mask (blue areas = high specularity)
        if ($diffusePath -match "earth") {
            & magick $diffusePath -channel B -separate -threshold 40% -negate $outputPath
        } else {
            # For other planets: create low specularity (dark) map
            & magick $diffusePath -colorspace Gray -level 20%,30% $outputPath
        }
        
        if (Test-Path $outputPath) {
            Write-Host "✓ Generated specular map: $outputPath" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "✗ Failed to generate specular map" -ForegroundColor Red
    }
    
    return $false
}

function Generate-NormalMap {
    param($heightPath, $outputPath)
    
    if (!(Test-Path $heightPath) -or !$hasImageMagick) { return $false }
    
    Write-Host "Generating normal map from $heightPath..." -ForegroundColor Yellow
    
    try {
        # Convert height/elevation to normal map
        & magick $heightPath -colorspace Gray -emboss 2 -normalize $outputPath
        
        if (Test-Path $outputPath) {
            Write-Host "✓ Generated normal map: $outputPath" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "✗ Failed to generate normal map" -ForegroundColor Red
    }
    
    return $false
}

# Generate missing maps for planets with diffuse textures
foreach ($planet in $planets) {
    $diffuseTextures = Get-ChildItem -Path "processed" -File | Where-Object { 
        $_.Name -match "${planet}.*diffuse.*\.jpg$" 
    }
    
    foreach ($diffuse in $diffuseTextures) {
        $baseName = $diffuse.BaseName -replace "_diffuse", ""
        
        # Generate specular map
        $specularPath = "processed\${baseName}_specular.jpg"
        if (!(Test-Path $specularPath)) {
            Generate-SpecularMap -diffusePath $diffuse.FullName -outputPath $specularPath
            
            # Convert to KTX2
            if ((Test-Path $specularPath) -and $hasToktx) {
                $ktx2Path = $specularPath -replace "\.jpg$", ".ktx2"
                Convert-ToKTX2 -inputPath $specularPath -outputPath $ktx2Path -textureType "specular"
            }
        }
    }
    
    # Generate normal maps from elevation data
    $elevationTextures = Get-ChildItem -Path "processed" -File | Where-Object { 
        $_.Name -match "${planet}.*(elevation|height|bump).*\.jpg$" 
    }
    
    foreach ($elevation in $elevationTextures) {
        $baseName = $elevation.BaseName -replace "_(elevation|height|bump)", ""
        $normalPath = "processed\${baseName}_normal.jpg"
        
        if (!(Test-Path $normalPath)) {
            Generate-NormalMap -heightPath $elevation.FullName -outputPath $normalPath
            
            # Convert to KTX2
            if ((Test-Path $normalPath) -and $hasToktx) {
                $ktx2Path = $normalPath -replace "\.jpg$", ".ktx2"
                Convert-ToKTX2 -inputPath $normalPath -outputPath $ktx2Path -textureType "normal"
            }
        }
    }
}

Write-Host "`n=== OPTIMIZATION SUMMARY ===" -ForegroundColor Green

# List processed textures
$processedTextures = Get-ChildItem -Path "processed" -File | Where-Object { $_.Extension -match "\.(jpg|png|ktx2)$" }

Write-Host "Processed textures:" -ForegroundColor White
$processedTextures | ForEach-Object {
    $sizeMB = [math]::Round($_.Length / 1MB, 2)
    Write-Host "  $($_.Name) - $sizeMB MB" -ForegroundColor Cyan
}

Write-Host "`nTexture optimization completed!" -ForegroundColor Green
Write-Host "✓ Optimized to 2K resolution" -ForegroundColor Yellow
Write-Host "✓ Generated missing texture maps" -ForegroundColor Yellow
if ($hasToktx) {
    Write-Host "✓ Created KTX2 compressed versions" -ForegroundColor Yellow
} else {
    Write-Host "! Install KTX Tools for KTX2 compression" -ForegroundColor Red
}
