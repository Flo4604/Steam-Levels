import { createCanvas, loadImage, registerFont } from 'canvas';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

const levelImages = [
    './assets/images/levels_lowlevel.png',
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_hexagons.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shields.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_books.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_chevrons.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_circle2.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_angle.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_flag.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_wings.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_arrows.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_crystals.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_space.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_waterelement.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_fireelement.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_earthelement.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_airelement_1-2.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_airelement_3-4.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_airelement_5-6.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_airelement_7-8.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_airelement_9-10.png",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_geo_1-2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_geo_3-4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_geo_5-6.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_geo_7-8.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_geo_9-10.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_mandala_1-2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_mandala_3-4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_mandala_5-6.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_mandala_7-8.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_mandala_9-10.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_spiro_1-2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_spiro_3-4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_spiro_5-6.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_spiro_7-8.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_spiro_9-10.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_patterns_1-2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_patterns_3-4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_patterns_5-6.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_patterns_7-8.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_patterns_9-10.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shapes_1.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shapes_2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shapes_3.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shapes_4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_shapes_5.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_grunge_1.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_grunge_2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_grunge_3.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_grunge_4.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_grunge_5.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_halftone_1.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_halftone_2.png?v=2",
    "https://steamcommunity-a.akamaihd.net/public/shared/images/community/levels_halftone_3.png?v=2",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5300_dashes.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5400_crosshatch.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5500_spiral.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5600_leaves.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5700_mountain.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5800_rain.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_5900_tornado.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_6000_snowflake.png",
    "https://community.akamai.steamstatic.com/public/shared/images/community/levels_6100_crown.png"
];

registerFont('./assets/fonts/MotivaSansRegular.woff.ttf', { family: 'Motiva Sans' });

const imageCache = new Map();

async function loadImageCached(url: string) {
    if (!imageCache.has(url)) {
        imageCache.set(url, await loadImage(url));
    }
    return imageCache.get(url);
}

async function processLevel(level: number) {
    try {
        const canvas = createCanvas(32, 32);
        const ctx = canvas.getContext('2d');

        const shape = await loadImageCached(levelImages[Math.floor(level / 100)]);
        
        const y = Math.floor(level % 100 / 10) * 32;
        
        ctx.drawImage(shape, 0, y, 32, 32, 0, 0, 32, 32);
        
        ctx.font = '14px Motiva Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(level.toString(), 16, 16);
        
        const path = `./levels/${Math.floor(level / 1000) * 1000}/${Math.floor(level / 100) * 100 % 1000}/`;
        
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }
        
        
        writeFileSync(`${path}/${level % 100}.png`, canvas.toBuffer('image/png'));
    } catch (e) {
        console.error(`ERROR ${level}`, e);
    }
}

async function processBatch(levels: number[]) {
    await Promise.all(levels.map(level => processLevel(level)));
}

async function main() {
    const levels = Array.from({ length: 6200 }, (_, i) => i);
    const batchSize = 50;
    
    for (let i = 0; i < levels.length; i += batchSize) {
        const batch = levels.slice(i, i + batchSize);
        await processBatch(batch);
        console.log(`Completed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(levels.length / batchSize)}`);
    }
    
    console.log('All levels processed!');
}

main();