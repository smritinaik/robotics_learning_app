// roboticsUtils.ts

// --- GEAR MECHANICS ---
export const calcGearRatio = (driver: number, driven: number): number | null => {
  if (!driver || !driven) return null;
  return driven / driver;
};

export const calcGearRPM = (ratio: number, rpm: number): number => rpm / ratio;
export const calcGearTorque = (ratio: number, torque: number): number => ratio * torque;

// --- OHM'S LAW ---
export type OhmsMode = 'voltage' | 'current' | 'resistance';

export const calculateOhmsLaw = (
  mode: OhmsMode,
  val1: string,
  val2: string
): { result: string; isError: boolean } => {
  const n1 = Number(val1);
  const n2 = Number(val2);

  if (isNaN(n1) || isNaN(n2) || !val1 || !val2) {
    return { result: 'Error: Missing Inputs ⚡', isError: true };
  }

  if (mode === 'voltage') {
    // V = I * R
    return { result: `${(n1 * n2).toFixed(2)} V`, isError: false };
  }

  if (mode === 'current') {
    // I = V / R
    if (n2 === 0) return { result: 'Error: Div by Zero 🛑', isError: true };
    return { result: `${(n1 / n2).toFixed(2)} A`, isError: false };
  }

  if (mode === 'resistance') {
    // R = V / I
    if (n2 === 0) return { result: 'Error: Div by Zero 🛑', isError: true };
    return { result: `${(n1 / n2).toFixed(2)} Ω`, isError: false };
  }

  return { result: '0.00', isError: false };
};

// --- RESISTOR COLOR CODE ---
export interface ColorOption {
  label: string;
  value: string;
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: string;
}

export const RESISTOR_COLORS: ColorOption[] = [
  { label: 'Black', value: 'black', hex: '#000000', digit: 0, multiplier: 1 },
  { label: 'Brown', value: 'brown', hex: '#8B4513', digit: 1, multiplier: 10, tolerance: '±1%' },
  { label: 'Red', value: 'red', hex: '#EF4444', digit: 2, multiplier: 100, tolerance: '±2%' },
  { label: 'Orange', value: 'orange', hex: '#F97316', digit: 3, multiplier: 1000 },
  { label: 'Yellow', value: 'yellow', hex: '#EAB308', digit: 4, multiplier: 10000 },
  { label: 'Green', value: 'green', hex: '#22C55E', digit: 5, multiplier: 100000, tolerance: '±0.5%' },
  { label: 'Blue', value: 'blue', hex: '#3B82F6', digit: 6, multiplier: 1000000, tolerance: '±0.25%' },
  { label: 'Violet', value: 'violet', hex: '#A855F7', digit: 7, multiplier: 10000000, tolerance: '±0.1%' },
  { label: 'Grey', value: 'grey', hex: '#6B7280', digit: 8, multiplier: 100000000, tolerance: '±0.05%' },
  { label: 'White', value: 'white', hex: '#FFFFFF', digit: 9, multiplier: 1000000000 },
  { label: 'Gold', value: 'gold', hex: '#EAB308', multiplier: 0.1, tolerance: '±5%' },
  { label: 'Silver', value: 'silver', hex: '#9CA3AF', multiplier: 0.01, tolerance: '±10%' },
];

export const formatResistance = (ohms: number): string => {
  if (ohms >= 1e9) return `${(ohms / 1e9).toFixed(2)} GΩ`;
  if (ohms >= 1e6) return `${(ohms / 1e6).toFixed(2)} MΩ`;
  if (ohms >= 1e3) return `${(ohms / 1e3).toFixed(2)} kΩ`;
  return `${ohms.toFixed(2)} Ω`;
};