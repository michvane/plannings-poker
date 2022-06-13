type BaseColorNames = 'primary' | 'alert' | 'warning' | 'success' | 'neutral';
type BaseColorVariations = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type NeutralExtraColorsVariations = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

type MiscellaneousColors = 'defaultLight' | 'defaultDark' | 'white' | 'black';

type Colors =
  | `${BaseColorNames}-${BaseColorVariations}`
  | `neutral${NeutralExtraColorsVariations}`
  | MiscellaneousColors;

export default Colors;
