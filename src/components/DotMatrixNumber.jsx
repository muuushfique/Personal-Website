const GLYPHS = {
  '0': [
    '01110',
    '11011',
    '10001',
    '10001',
    '10001',
    '11011',
    '01110',
  ],
  '1': [
    '00110',
    '01110',
    '00110',
    '00110',
    '00110',
    '00110',
    '01111',
  ],
  '2': [
    '01110',
    '11011',
    '00011',
    '00110',
    '01100',
    '11000',
    '11111',
  ],
  '3': [
    '01110',
    '11011',
    '00011',
    '00110',
    '00011',
    '11011',
    '01110',
  ],
  '4': [
    '00011',
    '00111',
    '01111',
    '11011',
    '11111',
    '00011',
    '00011',
  ],
  '5': [
    '11111',
    '11000',
    '11110',
    '00011',
    '00011',
    '11011',
    '01110',
  ],
  '6': [
    '01110',
    '11000',
    '11110',
    '11011',
    '11011',
    '11011',
    '01110',
  ],
  '7': [
    '11111',
    '00011',
    '00110',
    '00110',
    '01100',
    '01100',
    '01100',
  ],
  '8': [
    '01110',
    '11011',
    '11011',
    '01110',
    '11011',
    '11011',
    '01110',
  ],
  '9': [
    '01110',
    '11011',
    '11011',
    '01111',
    '00011',
    '11011',
    '01110',
  ],
  '+': [
    '00000',
    '00100',
    '00100',
    '11111',
    '00100',
    '00100',
    '00000',
  ],
  '-': [
    '00000',
    '00000',
    '00000',
    '11111',
    '00000',
    '00000',
    '00000',
  ],
  '.': [
    '000',
    '000',
    '000',
    '000',
    '000',
    '110',
    '110',
  ],
  '%': [
    '11001',
    '11010',
    '00100',
    '00100',
    '01011',
    '10011',
    '00000',
  ],
};

export default function DotMatrixNumber({ value = '3.65', dotSize = 4.2, gap = 7.4 }) {
  const chars = String(value).split('');
  const dots = [];
  let cursorX = 0;

  chars.forEach((ch) => {
    const grid = GLYPHS[ch];
    if (!grid) {
      cursorX += gap * 2;
      return;
    }
    const cols = grid[0].length;
    grid.forEach((rowStr, r) => {
      for (let c = 0; c < cols; c++) {
        if (rowStr[c] === '1') {
          dots.push({
            cx: cursorX + c * gap + dotSize,
            cy: r * gap + dotSize,
          });
        }
      }
    });
    cursorX += (cols + 1.35) * gap;
  });

  const width = Math.max(20, cursorX - gap * 0.5);
  const height = 7 * gap + dotSize;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        height: 'clamp(2.85rem, 4.4vw, 4.1rem)',
        width: 'auto',
        display: 'block',
        overflow: 'visible',
      }}
      aria-label={String(value)}
      role="img"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={dotSize * 0.54} fill="currentColor" />
      ))}
    </svg>
  );
}
