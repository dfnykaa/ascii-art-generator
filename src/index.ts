import figlet, { FontName, FigletOptions } from "figlet";
import chalk from "chalk";
import { Command } from "commander";
import * as readline from "readline";

type KerningMethods = "default" | "full" | "fitted" | "controlled smushing" | "universal smushing";
type ColorName = "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "rainbow";

interface ArtOptions {
  font: FontName;
  color: ColorName;
  align: KerningMethods;
  width: number;
}

const FONTS: FontName[] = [
  "Standard", "Big", "Block", "Banner", "Slant",
  "3-D", "Shadow", "Doom", "Ghost", "Graffiti",
];

const COLORS: Record<ColorName, (text: string) => string> = {
  red: (t) => chalk.red(t),
  green: (t) => chalk.green(t),
  yellow: (t) => chalk.yellow(t),
  blue: (t) => chalk.blue(t),
  magenta: (t) => chalk.magenta(t),
  cyan: (t) => chalk.cyan(t),
  white: (t) => chalk.white(t),
  rainbow: (t) => rainbowify(t),
};

function rainbowify(text: string): string {
  const colors = [chalk.red, chalk.yellow, chalk.green, chalk.cyan, chalk.blue, chalk.magenta];
  return text.split("").map((char, i) => colors[i % colors.length](char)).join("");
}

function renderArt(text: string, options: ArtOptions): string {
  try {
    const opts: FigletOptions = {
      font: options.font,
      horizontalLayout: options.align,
      width: options.width,
    };
    const art = figlet.textSync(text, opts);
    return COLORS[options.color](art);
  } catch {
    return chalk.red(`Error: could not render with font "${options.font}"`);
  }
}

async function interactiveMode(): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string): Promise<string> => new Promise((res) => rl.question(q, res));

  console.clear();
  console.log(chalk.cyan.bold("╔══════════════════════════════╗"));
  console.log(chalk.cyan.bold("║   ASCII Art Generator 🎨     ║"));
  console.log(chalk.cyan.bold("╚══════════════════════════════╝\n"));

  const text = await ask(chalk.white("Enter text: "));
  if (!text.trim()) { console.log(chalk.red("No text provided.")); rl.close(); return; }

  console.log(chalk.gray("\nFonts: ") + FONTS.map((f, i) => `${i + 1}. ${f}`).join("  "));
  const fontInput = await ask(chalk.white("\nChoose font (1-10, default 1): "));
  const fontIndex = Math.min(Math.max((parseInt(fontInput) || 1) - 1, 0), FONTS.length - 1);

  const colorNames = Object.keys(COLORS) as ColorName[];
  console.log(chalk.gray("\nColors: ") + colorNames.map((c, i) => `${i + 1}. ${c}`).join("  "));
  const colorInput = await ask(chalk.white("\nChoose color (1-8, default 3): "));
  const colorIndex = Math.min(Math.max((parseInt(colorInput) || 3) - 1, 0), colorNames.length - 1);

  const options: ArtOptions = {
    font: FONTS[fontIndex],
    color: colorNames[colorIndex],
    align: "default",
    width: process.stdout.columns || 80,
  };

  console.log("\n" + renderArt(text, options) + "\n");
  console.log(chalk.gray(`Font: ${options.font} | Color: ${options.color}\n`));
  rl.close();
}

const program = new Command();

program
  .name("ascii-art")
  .description("Transform text into stunning ASCII art")
  .version("1.0.0");

program
  .argument("[text]", "Text to convert")
  .option("-f, --font <font>", `Font to use (${FONTS.join(", ")})`, "Standard")
  .option("-c, --color <color>", `Color (${Object.keys(COLORS).join(", ")})`, "cyan")
  .option("-a, --align <align>", "Alignment (default, full, fitted)", "default")
  .option("-w, --width <width>", "Output width", "80")
  .option("-l, --list-fonts", "List all available fonts")
  .option("-i, --interactive", "Interactive mode")
  .action(async (text: string | undefined, opts) => {
    if (opts.listFonts) {
      console.log(chalk.cyan.bold("\nAvailable fonts:\n"));
      FONTS.forEach((f, i) => console.log(chalk.white(`  ${i + 1}. ${f}`)));
      console.log();
      return;
    }
    if (opts.interactive || !text) { await interactiveMode(); return; }

    const options: ArtOptions = {
      font: (FONTS.includes(opts.font as FontName) ? opts.font : "Standard") as FontName,
      color: (Object.keys(COLORS).includes(opts.color) ? opts.color : "cyan") as ColorName,
      align: opts.align as KerningMethods,
      width: parseInt(opts.width) || 80,
    };

    console.log("\n" + renderArt(text, options) + "\n");
  });

program.parse();