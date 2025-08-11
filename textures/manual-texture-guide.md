# Planet Texture Collection Guide

## High-Quality Texture Sources

### Earth Textures
**NASA Visible Earth (Free)**
- Diffuse: https://visibleearth.nasa.gov/images/57752/blue-marble-land-surface-shallow-water-and-shaded-topography
- Normal/Elevation: https://visibleearth.nasa.gov/images/73934/topography-and-bathymetry  
- Night Lights: https://visibleearth.nasa.gov/images/55167/earths-city-lights
- Clouds: https://visibleearth.nasa.gov/images/57747/blue-marble-clouds

**Download Instructions:**
1. Visit each URL
2. Click "Download" and select highest resolution (typically 8640x4320 or 21600x10800)
3. Save to `earth/` directory with descriptive names

### Mars Textures
**USGS Astrogeology (Free)**
- Diffuse: https://astrogeology.usgs.gov/search/details/Mars/Viking/MDIM21-color/Mars_Viking_MDIM21_ClrMosaic_global_232m/cub
- Elevation: https://astrogeology.usgs.gov/search/details/Mars/MGS/MOLA-DEM/Mars_MGS_MOLA_DEM_mosaic_global_463m/cub

### Moon Textures  
**NASA Scientific Visualization Studio (Free)**
- Diffuse: https://svs.gsfc.nasa.gov/4720 (LRO Color Shaded Relief)
- Elevation: https://svs.gsfc.nasa.gov/4720 (LROC Elevation Map)

### Jupiter Textures
**Björn Jónsson's Planetary Maps (Free for non-commercial)**
- Website: http://bjj.mmedia.is/
- Download: jupiter2k.jpg (2048×1024)
- Based on Cassini and Voyager data

### Saturn Textures
**Planet Pixel Emporium (Free for non-commercial)**
- Website: https://planetpixelemporium.com/saturn.html
- Planet: saturn2k.jpg (2048×1024)  
- Rings Color: saturnringcolor.jpg
- Ring Alpha: saturnringpattern.gif

### Uranus Textures
**Planet Pixel Emporium**
- Website: https://planetpixelemporium.com/uranus.html  
- Download: uranus2k.jpg (2048×1024)

## Alternative Free Sources

### Solar System Scope Textures
**Website:** https://www.solarsystemscope.com/textures/
- Free for non-commercial use
- Available in 1K, 2K, 4K, 8K resolutions
- Includes: diffuse, normal, specular maps
- All planets covered

### Natural Earth Data
**Website:** https://www.naturalearthdata.com/
- Earth-only but extremely high quality
- Cross Blended Hypsometric Tints
- Shaded relief and satellite imagery

## Texture Requirements Summary

### Earth (Complete Set)
- [x] Diffuse: Blue Marble composite (4K-8K)  
- [ ] Normal: Elevation/bathymetry data converted
- [ ] Specular: Ocean mask (high for water, low for land)
- [ ] Clouds: Separate cloud layer with alpha

### Mars (Complete Set)
- [x] Diffuse: Viking MDIM 2.1 color composite (4K)
- [ ] Normal: MOLA elevation data converted  
- [ ] Specular: Minimal (dusty surface)

### Moon (Complete Set)
- [x] Diffuse: LRO color composite (4K)
- [ ] Normal: LROC elevation data converted
- [ ] Specular: Very low (rocky surface)

### Jupiter (Gas Giant)
- [ ] Diffuse: Cassini/Juno composite with cloud bands (2K)
- [ ] Normal: Subtle cloud height variations
- [ ] Specular: Minimal (gas surface)

### Saturn (Gas Giant + Rings)
- [ ] Diffuse: Cassini composite (2K)
- [ ] Rings: Separate PNG with transparency (4K)
- [ ] Normal: Atmospheric bands
- [ ] Specular: Minimal

### Uranus (Ice Giant)  
- [ ] Diffuse: Voyager 2 reconstruction (2K)
- [ ] Normal: Minimal features
- [ ] Specular: Low (ice surface)

## Next Steps

1. **Manual Download**: Visit sources above and download textures
2. **Process & Optimize**: Resize to 2K-4K and convert formats  
3. **Generate Missing Maps**: Create normal/specular from diffuse
4. **Compress**: Convert to KTX2 or other compressed formats
