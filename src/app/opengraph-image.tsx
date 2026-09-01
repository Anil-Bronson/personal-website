import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Anil Bronson — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [josefinSlab, alegreyaSans, alegreyaSansMedium] = await Promise.all([
    readFile(join(process.cwd(), 'src/assets/fonts/JosefinSlab-300.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/AlegreyaSans-400.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/AlegreyaSans-500.woff')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: '#0c0806',
          backgroundImage:
            'radial-gradient(circle at 50% 62%, #7a4a1e 0%, #3a2210 22%, #180f0a 48%, #0c0806 72%)',
          fontFamily: 'Alegreya Sans',
        }}
      >
        {/* frame */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: '1px solid #4a3420',
            borderRadius: 4,
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 10,
            color: '#a97d43',
            textTransform: 'uppercase',
            marginBottom: 36,
            fontFamily: 'Josefin Slab',
          }}
        >
          Radio Club Bar
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 500,
            letterSpacing: 3,
            color: '#f1e6d6',
            lineHeight: 1,
            fontFamily: 'Alegreya Sans Medium',
            textTransform: 'uppercase',
          }}
        >
          Anil Bronson
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            marginTop: 26,
            color: '#c9a878',
            letterSpacing: 1,
          }}
        >
          Software Developer
        </div>

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 46,
            fontSize: 15,
            letterSpacing: 6,
            color: '#5a4530',
            textTransform: 'uppercase',
            fontFamily: 'Josefin Slab',
          }}
        >
          est. mcmxcvii
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Josefin Slab', data: josefinSlab, style: 'normal', weight: 300 },
        { name: 'Alegreya Sans', data: alegreyaSans, style: 'normal', weight: 400 },
        { name: 'Alegreya Sans Medium', data: alegreyaSansMedium, style: 'normal', weight: 500 },
      ],
    }
  );
}
