import { type RequestHandler } from '@builder.io/qwik-city';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const onGet: RequestHandler = async ({ params, url, send }) => {
  const game = params.game || 'Brain Rush';
  const username = url.searchParams.get('username') || 'Player';
  const score = url.searchParams.get('score') || '0';

  const width = 1200;
  const height = 630;

  const svg = await satori(
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a',
        color: 'white',
        fontSize: 48,
        fontWeight: 700,
        fontFamily: 'sans-serif',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <div>{game} Complete!</div>
      <div style={{ fontSize: 36, marginTop: 20 }}>{username} scored:</div>
      <div style={{ fontSize: 72 }}>{score}</div>
    </div>,
    {
      width,
      height,
      fonts: [],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
  });
  const pngBuffer = resvg.render().asPng();

  send(
    new Response(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  );
};
