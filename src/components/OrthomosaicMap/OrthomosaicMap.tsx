import s from './OrthomosaicMap.module.scss';

type HouseConfig = Readonly<[number, number, string]>;
type TreeConfig = Readonly<[number, number, number]>;
type CarConfig = Readonly<[number, number, number, number, string]>;
type GcpConfig = Readonly<[number, number]>;

const ROOFS: string[] = [
    '#c87050', '#b86040', '#a07048', '#c08050', '#986040', '#b07860',
];

const gridHouses = (
    xs: readonly number[],
    ys: readonly number[],
    offset = 0,
): HouseConfig[] =>
    ys.flatMap((y, ri) =>
        xs.map((x, ci): HouseConfig => [
            x,
            y,
            ROOFS[(ri * xs.length + ci + offset) % ROOFS.length] ?? '#c08050',
        ]),
    );

// ── House zones ────────────────────────────────────────────────────────────────
// NW block (x=0–86, y=0–86)
const nwHouses = gridHouses([4, 28, 52], [4, 22, 40, 58]);
// N-mid-left (x=100–194, y=0–86)
const nmlHouses = gridHouses([102, 126, 150, 172], [4, 22, 40, 58], 1);
// NE (x=360–458, y=0–86)
const neHouses = gridHouses([362, 386, 410, 434], [4, 22, 40, 58], 2);
// Center-NE residential (x=226–346, y=100–194)
const cneHouses = gridHouses([228, 252, 276, 300, 322], [102, 120, 140, 162], 3);
// E-upper (x=360–458, y=100–194)
const euHouses = gridHouses([362, 386, 410], [102, 120, 140, 162], 4);
// Center-SW (x=100–194, y=226–346)
const cswHouses = gridHouses([102, 126, 150, 172], [228, 248, 268, 288, 308], 5);
// E-lower (x=360–458, y=226–346)
const elHouses = gridHouses([362, 386, 410], [228, 248, 268, 288, 308], 0);
// Bottom-mid-left (x=100–194, y=360–458)
const bmlHouses = gridHouses([102, 126, 150, 172], [362, 382, 402, 422], 2);
// Bottom-mid-right (x=226–346, y=360–458)
const bmrHouses = gridHouses([228, 252, 276, 300, 322], [362, 382, 402, 422], 4);

const allHouses: HouseConfig[] = [
    ...nwHouses, ...nmlHouses, ...neHouses,
    ...cneHouses, ...euHouses,
    ...cswHouses, ...elHouses,
    ...bmlHouses, ...bmrHouses,
];

// ── Trees ──────────────────────────────────────────────────────────────────────
const trees: TreeConfig[] = [
    // NE green zone
    [368, 8, 6], [380, 20, 7], [396, 10, 5], [410, 16, 8], [422, 6, 6],
    [438, 18, 5], [452, 10, 7], [372, 36, 5], [390, 44, 6], [408, 34, 7],
    [424, 46, 5], [444, 38, 6], [458, 50, 5], [378, 60, 6], [400, 70, 5],
    [418, 58, 7], [440, 68, 6], [456, 74, 5],
    // Center-SE water zone perimeter
    [234, 236, 5], [246, 228, 6], [230, 252, 7], [242, 266, 5],
    [318, 232, 6], [332, 242, 5], [344, 234, 7], [338, 256, 5],
    [230, 308, 6], [244, 322, 5], [258, 312, 7], [236, 334, 5],
    [320, 310, 6], [332, 324, 5], [344, 314, 7], [340, 336, 6],
    // Bottom-right green zone
    [366, 368, 6], [380, 380, 7], [396, 370, 5], [410, 382, 8],
    [424, 368, 6], [438, 380, 5], [452, 370, 7], [372, 398, 5],
    [388, 410, 6], [406, 398, 7], [422, 410, 5], [440, 396, 6],
    [454, 410, 7], [376, 424, 5], [394, 436, 6], [412, 426, 7],
    [430, 438, 5], [448, 428, 6], [458, 442, 5],
    // Verge / gap trees
    [42, 196, 5], [64, 226, 4], [106, 200, 5], [138, 226, 4],
    [228, 200, 5], [278, 226, 4], [308, 200, 5],
    [196, 106, 4], [198, 140, 5], [196, 232, 4], [198, 278, 5],
];

// ── Cars ───────────────────────────────────────────────────────────────────────
const cars: CarConfig[] = [
    // Main H road — top edge y≈191
    [16, 189, 10, 5, '#8a7060'], [42, 189, 10, 5, '#607080'],
    [70, 189, 10, 5, '#708060'], [114, 189, 10, 5, '#806050'],
    [140, 189, 10, 5, '#506870'], [170, 189, 10, 5, '#786050'],
    [232, 189, 10, 5, '#608070'], [260, 189, 10, 5, '#806050'],
    [294, 189, 10, 5, '#506880'], [322, 189, 10, 5, '#708060'],
    [358, 189, 10, 5, '#8a6050'], [388, 189, 10, 5, '#607890'],
    [418, 189, 10, 5, '#806050'], [442, 189, 10, 5, '#608060'],
    // Main H road — bottom edge y≈227
    [12, 227, 10, 5, '#707060'], [38, 227, 10, 5, '#607080'],
    [66, 227, 10, 5, '#806070'], [108, 227, 10, 5, '#506070'],
    [136, 227, 10, 5, '#708060'], [162, 227, 10, 5, '#906050'],
    [228, 227, 10, 5, '#506880'], [256, 227, 10, 5, '#708050'],
    [288, 227, 10, 5, '#806060'], [316, 227, 10, 5, '#608070'],
    [360, 227, 10, 5, '#806050'], [392, 227, 10, 5, '#507080'],
    [424, 227, 10, 5, '#708060'], [446, 227, 10, 5, '#806050'],
    // Main V road — left edge x≈191
    [187, 12, 5, 10, '#607080'], [187, 42, 5, 10, '#806050'],
    [187, 72, 5, 10, '#607060'], [187, 110, 5, 10, '#708060'],
    [187, 142, 5, 10, '#506880'], [187, 166, 5, 10, '#806050'],
    [187, 232, 5, 10, '#608070'], [187, 262, 5, 10, '#706050'],
    [187, 296, 5, 10, '#507080'], [187, 326, 5, 10, '#806060'],
    [187, 366, 5, 10, '#608060'], [187, 406, 5, 10, '#806050'],
    [187, 438, 5, 10, '#507080'],
    // Main V road — right edge x≈227
    [227, 16, 5, 10, '#806050'], [227, 50, 5, 10, '#607080'],
    [227, 82, 5, 10, '#708060'], [227, 114, 5, 10, '#506870'],
    [227, 146, 5, 10, '#806050'], [227, 172, 5, 10, '#608080'],
    [227, 234, 5, 10, '#706050'], [227, 266, 5, 10, '#507080'],
    [227, 304, 5, 10, '#806060'], [227, 332, 5, 10, '#608060'],
    [227, 372, 5, 10, '#806050'], [227, 414, 5, 10, '#507080'],
    [227, 442, 5, 10, '#706060'],
    // Secondary roads
    [12, 83, 10, 4, '#806050'], [36, 83, 10, 4, '#607080'],
    [60, 83, 10, 4, '#708060'], [120, 83, 10, 4, '#506870'],
    [150, 83, 10, 4, '#806060'],
    [12, 355, 10, 4, '#506870'], [38, 355, 10, 4, '#806060'],
    [240, 355, 10, 4, '#608070'], [280, 355, 10, 4, '#807060'],
    [352, 12, 4, 10, '#608070'], [352, 44, 4, 10, '#806050'],
    [352, 130, 4, 10, '#507080'], [352, 164, 4, 10, '#708060'],
    [352, 240, 4, 10, '#806050'], [352, 310, 4, 10, '#608070'],
];

// ── GCP survey markers ─────────────────────────────────────────────────────────
const gcps: GcpConfig[] = [
    [58, 166],   // near main H road, left side
    [316, 54],   // N-mid-right commercial zone
    [414, 306],  // E-lower residential
];

// ── Render helpers ─────────────────────────────────────────────────────────────
const renderHouse = ([x, y, roofColor]: HouseConfig, key: number) => (
    <g key={key}>
        <rect x={x} y={y} width="20" height="14" fill={roofColor} />
        <rect x={x + 18} y={y} width="2" height="14" fill="rgba(0,0,0,0.2)" />
        <rect x={x} y={y + 12} width="20" height="2" fill="rgba(0,0,0,0.16)" />
        <rect x={x + 2} y={y + 3} width="4" height="3" fill="rgba(200,220,240,0.8)" />
        <rect x={x + 8} y={y + 3} width="4" height="3" fill="rgba(200,220,240,0.8)" />
        <rect x={x + 14} y={y + 7} width="3" height="5" fill="rgba(0,0,0,0.32)" />
    </g>
);

const renderGcp = ([cx, cy]: GcpConfig, key: string) => (
    <g key={key}>
        <circle cx={cx} cy={cy} r="8" fill="none" stroke="#e74c3c" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="2.5" fill="#e74c3c" />
        <line x1={cx - 14} y1={cy} x2={cx - 10} y2={cy} stroke="#e74c3c" strokeWidth="1.5" />
        <line x1={cx + 10} y1={cy} x2={cx + 14} y2={cy} stroke="#e74c3c" strokeWidth="1.5" />
        <line x1={cx} y1={cy - 14} x2={cx} y2={cy - 10} stroke="#e74c3c" strokeWidth="1.5" />
        <line x1={cx} y1={cy + 10} x2={cx} y2={cy + 14} stroke="#e74c3c" strokeWidth="1.5" />
    </g>
);

// ── Component ──────────────────────────────────────────────────────────────────
export const OrthomosaicMap = () => (
    <div className={s.wrapper}>
        <div className={s.rotating}>
            <svg
                width="660"
                height="660"
                viewBox="0 0 460 460"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {/* ── Ground base ────────────────────────────────────────── */}
                <rect width="460" height="460" fill="#d6cebc" />

                {/* ── Green zones ────────────────────────────────────────── */}
                <rect x="360" y="0" width="100" height="88" rx="2" fill="#c2d48a" />
                <rect x="226" y="226" width="120" height="120" rx="2" fill="#c2d48a" />
                <rect x="360" y="360" width="100" height="100" rx="2" fill="#c2d48a" />

                {/* Water body */}
                <ellipse cx="282" cy="280" rx="46" ry="36" fill="#7bb8d4" />
                <ellipse cx="274" cy="272" rx="18" ry="11" fill="rgba(255,255,255,0.14)" />

                {/* ── Secondary roads ────────────────────────────────────── */}
                <rect x="0" y="88" width="460" height="10" fill="#bab2a0" />
                <rect x="0" y="348" width="460" height="10" fill="#bab2a0" />
                <rect x="88" y="0" width="10" height="460" fill="#bab2a0" />
                <rect x="348" y="0" width="10" height="460" fill="#bab2a0" />
                {/* Secondary surfaces */}
                <rect x="0" y="89" width="460" height="8" fill="#c4bca8" />
                <rect x="0" y="349" width="460" height="8" fill="#c4bca8" />
                <rect x="89" y="0" width="8" height="460" fill="#c4bca8" />
                <rect x="349" y="0" width="8" height="460" fill="#c4bca8" />

                {/* Secondary centreline dashes */}
                {[4,22,42,62,72,100,120,140,162,180,226,250,272,294,314,334,360,382,402,424,444].map(x => (
                    <rect key={`sh1${x}`} x={x} y="92" width="10" height="2" fill="#e0d8c0" />
                ))}
                {[4,22,42,62,72,100,120,140,162,180,226,250,272,294,314,334,360,382,402,424,444].map(x => (
                    <rect key={`sh2${x}`} x={x} y="352" width="10" height="2" fill="#e0d8c0" />
                ))}
                {[4,22,42,62,74,100,120,140,160,180,226,250,272,292,314,334,360,382,404,424,444].map(y => (
                    <rect key={`sv1${y}`} x="92" y={y} width="2" height="10" fill="#e0d8c0" />
                ))}
                {[4,22,42,62,74,100,120,140,160,180,226,250,272,292,314,334,360,382,404,424,444].map(y => (
                    <rect key={`sv2${y}`} x="352" y={y} width="2" height="10" fill="#e0d8c0" />
                ))}

                {/* ── Main roads ─────────────────────────────────────────── */}
                <rect x="0" y="195" width="460" height="30" fill="#a8a090" />
                <rect x="195" y="0" width="30" height="460" fill="#a8a090" />
                <rect x="0" y="197" width="460" height="26" fill="#b4ac9a" />
                <rect x="197" y="0" width="26" height="460" fill="#b4ac9a" />
                <rect x="197" y="197" width="26" height="26" fill="#aca498" />

                {/* Main H centreline dashes */}
                {[4,22,42,62,80,100,120,140,162,180].map(x => (
                    <rect key={`mhl${x}`} x={x} y="208" width="12" height="2" fill="#e8e0c8" />
                ))}
                {[226,246,266,288,308,328,348,366,386,406,426,446].map(x => (
                    <rect key={`mhr${x}`} x={x} y="208" width="12" height="2" fill="#e8e0c8" />
                ))}
                {/* Main V centreline dashes */}
                {[4,22,42,62,80,100,120,140,162,180].map(y => (
                    <rect key={`mvt${y}`} x="208" y={y} width="2" height="12" fill="#e8e0c8" />
                ))}
                {[226,246,266,288,308,328,348,366,386,406,426,446].map(y => (
                    <rect key={`mvb${y}`} x="208" y={y} width="2" height="12" fill="#e8e0c8" />
                ))}

                {/* ── Houses ─────────────────────────────────────────────── */}
                {allHouses.map((cfg, i) => renderHouse(cfg, i))}

                {/* ── Commercial strip (x=226–346, y=0–86) ──────────────── */}
                {/* Bldg A */}
                <rect x="228" y="4" width="54" height="32" fill="#a8c890" />
                <rect x="280" y="4" width="2" height="32" fill="rgba(0,0,0,0.2)" />
                <rect x="228" y="34" width="54" height="2" fill="rgba(0,0,0,0.18)" />
                <rect x="231" y="10" width="46" height="10" fill="rgba(170,210,230,0.75)" />
                {[10,20,30,40].map(ox => (
                    <line key={`ca${ox}`} x1={228+ox} y1="10" x2={228+ox} y2="20" stroke="rgba(120,160,180,0.5)" strokeWidth="0.8" />
                ))}
                <rect x="248" y="24" width="8" height="8" fill="rgba(80,120,100,0.85)" />

                {/* Bldg B */}
                <rect x="286" y="4" width="56" height="32" fill="#9cbd84" />
                <rect x="340" y="4" width="2" height="32" fill="rgba(0,0,0,0.2)" />
                <rect x="286" y="34" width="56" height="2" fill="rgba(0,0,0,0.18)" />
                <rect x="289" y="10" width="48" height="10" fill="rgba(170,210,230,0.75)" />
                {[10,22,34,44].map(ox => (
                    <line key={`cb${ox}`} x1={286+ox} y1="10" x2={286+ox} y2="20" stroke="rgba(120,160,180,0.5)" strokeWidth="0.8" />
                ))}
                <rect x="308" y="24" width="8" height="8" fill="rgba(80,120,100,0.85)" />

                {/* Bldg C */}
                <rect x="228" y="42" width="54" height="38" fill="#b2d098" />
                <rect x="280" y="42" width="2" height="38" fill="rgba(0,0,0,0.2)" />
                <rect x="228" y="78" width="54" height="2" fill="rgba(0,0,0,0.18)" />
                <rect x="231" y="48" width="46" height="10" fill="rgba(170,210,230,0.75)" />
                {[10,20,30,40].map(ox => (
                    <line key={`cc${ox}`} x1={228+ox} y1="48" x2={228+ox} y2="58" stroke="rgba(120,160,180,0.5)" strokeWidth="0.8" />
                ))}
                <rect x="231" y="62" width="46" height="8" fill="rgba(170,210,230,0.6)" />
                <rect x="248" y="70" width="8" height="8" fill="rgba(80,120,100,0.85)" />

                {/* Bldg D */}
                <rect x="286" y="42" width="56" height="38" fill="#a6c88a" />
                <rect x="340" y="42" width="2" height="38" fill="rgba(0,0,0,0.2)" />
                <rect x="286" y="78" width="56" height="2" fill="rgba(0,0,0,0.18)" />
                <rect x="289" y="48" width="48" height="10" fill="rgba(170,210,230,0.75)" />
                {[10,22,34,44].map(ox => (
                    <line key={`cd${ox}`} x1={286+ox} y1="48" x2={286+ox} y2="58" stroke="rgba(120,160,180,0.5)" strokeWidth="0.8" />
                ))}
                <rect x="289" y="62" width="48" height="8" fill="rgba(170,210,230,0.6)" />
                <rect x="308" y="70" width="8" height="8" fill="rgba(80,120,100,0.85)" />

                {/* ── Industrial W-upper (x=0–86, y=100–194) ────────────── */}
                {/* Warehouse A */}
                <rect x="3" y="102" width="82" height="40" fill="#b0b0a8" />
                <rect x="83" y="102" width="2" height="40" fill="rgba(0,0,0,0.25)" />
                <rect x="3" y="140" width="82" height="2" fill="rgba(0,0,0,0.2)" />
                {[22,42,62].map(x => (
                    <line key={`wa${x}`} x1={x} y1="102" x2={x} y2="142" stroke="#989890" strokeWidth="1" />
                ))}
                <rect x="6" y="118" width="13" height="15" fill="#8a8a82" />
                <rect x="26" y="118" width="13" height="15" fill="#8a8a82" />
                <rect x="48" y="118" width="13" height="15" fill="#8a8a82" />

                {/* Warehouse B */}
                <rect x="3" y="150" width="74" height="38" fill="#acacA4" />
                <rect x="75" y="150" width="2" height="38" fill="rgba(0,0,0,0.24)" />
                <rect x="3" y="186" width="74" height="2" fill="rgba(0,0,0,0.2)" />
                {[22,44,64].map(x => (
                    <line key={`wb${x}`} x1={x} y1="150" x2={x} y2="188" stroke="#989890" strokeWidth="1" />
                ))}
                <rect x="6" y="164" width="12" height="14" fill="#8a8a82" />
                <rect x="28" y="164" width="12" height="14" fill="#8a8a82" />

                {/* ── Office Center-NW (x=100–194, y=100–194) ───────────── */}
                <rect x="103" y="103" width="88" height="86" fill="#7a90a8" />
                <rect x="189" y="103" width="2" height="86" fill="rgba(0,0,0,0.28)" />
                <rect x="103" y="187" width="88" height="2" fill="rgba(0,0,0,0.22)" />
                {/* Window grid: 4 cols × 6 rows */}
                {([0,1,2,3] as const).map(col =>
                    ([0,1,2,3,4,5] as const).map(row => (
                        <rect
                            key={`ow${col}${row}`}
                            x={108 + col * 20}
                            y={110 + row * 12}
                            width="12"
                            height="7"
                            fill="rgba(190,220,250,0.72)"
                        />
                    ))
                )}
                {/* Entrance */}
                <rect x="126" y="185" width="16" height="6" fill="rgba(170,210,240,0.9)" />
                <rect x="132" y="185" width="4" height="6" fill="rgba(80,120,160,0.5)" />

                {/* ── Industrial W-lower (x=0–86, y=226–346) ────────────── */}
                {/* Big warehouse */}
                <rect x="3" y="228" width="82" height="52" fill="#b4b4aa" />
                <rect x="83" y="228" width="2" height="52" fill="rgba(0,0,0,0.25)" />
                <rect x="3" y="278" width="82" height="2" fill="rgba(0,0,0,0.2)" />
                {[22,44,64].map(x => (
                    <line key={`wc${x}`} x1={x} y1="228" x2={x} y2="280" stroke="#9a9a92" strokeWidth="1.2" />
                ))}
                <rect x="6" y="248" width="13" height="18" fill="#888880" />
                <rect x="28" y="248" width="13" height="18" fill="#888880" />
                <rect x="52" y="248" width="13" height="18" fill="#888880" />

                {/* Medium warehouse */}
                <rect x="3" y="288" width="76" height="46" fill="#b0b0a6" />
                <rect x="77" y="288" width="2" height="46" fill="rgba(0,0,0,0.24)" />
                <rect x="3" y="332" width="76" height="2" fill="rgba(0,0,0,0.2)" />
                {[22,44,64].map(x => (
                    <line key={`wd${x}`} x1={x} y1="288" x2={x} y2="334" stroke="#9a9a92" strokeWidth="1" />
                ))}
                <rect x="6" y="302" width="12" height="16" fill="#888880" />
                <rect x="26" y="302" width="12" height="16" fill="#888880" />

                {/* Small annex */}
                <rect x="3" y="340" width="50" height="14" fill="#acacA4" />
                {[18,36].map(x => (
                    <line key={`we${x}`} x1={x} y1="340" x2={x} y2="354" stroke="#989890" strokeWidth="0.8" />
                ))}

                {/* ── Industrial bottom-left (x=0–86, y=360–458) ─────────── */}
                <rect x="3" y="362" width="82" height="52" fill="#b0b0a8" />
                <rect x="83" y="362" width="2" height="52" fill="rgba(0,0,0,0.24)" />
                <rect x="3" y="412" width="82" height="2" fill="rgba(0,0,0,0.2)" />
                {[22,44,64].map(x => (
                    <line key={`wf${x}`} x1={x} y1="362" x2={x} y2="414" stroke="#9a9a90" strokeWidth="1" />
                ))}
                <rect x="6" y="378" width="13" height="18" fill="#888880" />
                <rect x="28" y="378" width="13" height="18" fill="#888880" />
                <rect x="3" y="420" width="56" height="32" fill="#acacA4" />
                {[18,38].map(x => (
                    <line key={`wg${x}`} x1={x} y1="420" x2={x} y2="452" stroke="#989890" strokeWidth="0.8" />
                ))}
                <rect x="6" y="432" width="10" height="14" fill="#888880" />

                {/* ── Trees ──────────────────────────────────────────────── */}
                {trees.map(([cx, cy, r], i) => (
                    <g key={`t${i}`}>
                        <circle cx={cx} cy={cy} r={r} fill="#5a8236" />
                        <circle cx={cx - 1.5} cy={cy - 1.5} r={r * 0.6} fill="#7a9e50" />
                        {r > 5 && (
                            <circle cx={cx + 2} cy={cy + 1} r={r * 0.4} fill="#6a9040" />
                        )}
                    </g>
                ))}

                {/* ── Parked cars ────────────────────────────────────────── */}
                {cars.map(([x, y, w, h, c], i) => (
                    <rect key={`car${i}`} x={x} y={y} width={w} height={h} fill={c} rx="1" />
                ))}

                {/* ── Tile grid overlay ───────────────────────────────────── */}
                <defs>
                    <pattern id="orthoTile" width="22" height="22" patternUnits="userSpaceOnUse">
                        <path
                            d="M 22 0 L 0 0 0 22"
                            fill="none"
                            stroke="rgba(255,255,255,0.04)"
                            strokeWidth="0.5"
                        />
                    </pattern>
                </defs>
                <rect width="460" height="460" fill="url(#orthoTile)" />

                {/* ── GCP survey markers ─────────────────────────────────── */}
                {gcps.map((cfg, i) => renderGcp(cfg, `gcp${i}`))}
            </svg>
        </div>
        <div className={s.scanLine} aria-hidden="true" />
    </div>
);
