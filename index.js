import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync, existsSync, mkdirSync, writeFile } from 'fs';

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
]


registerFont('./assets/fonts/MotivaSansRegular.woff.ttf', { family: 'Motiva Sans' })

for (let level = 0; level <= 5999; level++) {

    try {
        const canvas = createCanvas(32,32);
        const ctx = canvas.getContext('2d');

        const shape = await loadImage(levelImages[Math.floor(level / 100)]);

        const y = Math.floor(level % 100 / 10) * 32;
    

        // load font
        await ctx.font

        // cut out the 32x32 protion of the shape we need
        ctx.drawImage(shape, 0, y, 32, 32, 0, 0, 32, 32);

        // draw the image text in the middle of the canvas
        ctx.font = '14px Motiva Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(level.toString(), 16, 16);

        const path = `./levels/${Math.floor(level / 1000) * 1000}/${Math.floor(level / 100) * 100 % 1000}/`;

        if(!existsSync(path)) {
            mkdirSync(path, { recursive: true });
        }

        const buffer = canvas.toBuffer('image/png');

        console.log(`Writing ${level}`);

        writeFileSync(`${path}/${level % 100}.png`, buffer);
    } catch (e) {
        console.log(`ERROR ${level}` ,e)
    }

}

// javascript create worker for each 1000 levels
