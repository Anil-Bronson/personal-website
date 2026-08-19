import { ImageResponse } from 'next/og';

export const alt = 'Anil Bronson — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          fontFamily: 'Georgia, serif',
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
          }}
        >
          Radio Club Bar
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 300,
            letterSpacing: 4,
            color: '#f1e6d6',
            lineHeight: 1,
          }}
        >
          ANIL BRONSON
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
          Production Services Technician · Sony Pictures Imageworks
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
          }}
        >
          est. mcmxcvii
        </div>
      </div>
    ),
    { ...size }
  );
}
