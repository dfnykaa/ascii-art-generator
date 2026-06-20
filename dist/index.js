"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const readline = __importStar(require("readline"));
const FONTS = [
    "Standard", "Big", "Block", "Banner", "Slant",
    "3-D", "Shadow", "Doom", "Ghost", "Graffiti",
];
const COLORS = {
    red: (t) => chalk_1.default.red(t),
    green: (t) => chalk_1.default.green(t),
    yellow: (t) => chalk_1.default.yellow(t),
    blue: (t) => chalk_1.default.blue(t),
    magenta: (t) => chalk_1.default.magenta(t),
    cyan: (t) => chalk_1.default.cyan(t),
    white: (t) => chalk_1.default.white(t),
    rainbow: (t) => rainbowify(t),
};
function rainbowify(text) {
    const colors = [chalk_1.default.red, chalk_1.default.yellow, chalk_1.default.green, chalk_1.default.cyan, chalk_1.default.blue, chalk_1.default.magenta];
    return text.split("").map((char, i) => colors[i % colors.length](char)).join("");
}
function renderArt(text, options) {
    try {
        const opts = {
            font: options.font,
            horizontalLayout: options.align,
            width: options.width,
        };
        const art = figlet_1.default.textSync(text, opts);
        return COLORS[options.color](art);
    }
    catch {
        return chalk_1.default.red(`Error: could not render with font "${options.font}"`);
    }
}
async function interactiveMode() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise((res) => rl.question(q, res));
    console.clear();
    console.log(chalk_1.default.cyan.bold("╔══════════════════════════════╗"));
    console.log(chalk_1.default.cyan.bold("║   ASCII Art Generator 🎨     ║"));
    console.log(chalk_1.default.cyan.bold("╚══════════════════════════════╝\n"));
    const text = await ask(chalk_1.default.white("Enter text: "));
    if (!text.trim()) {
        console.log(chalk_1.default.red("No text provided."));
        rl.close();
        return;
    }
    console.log(chalk_1.default.gray("\nFonts: ") + FONTS.map((f, i) => `${i + 1}. ${f}`).join("  "));
    const fontInput = await ask(chalk_1.default.white("\nChoose font (1-10, default 1): "));
    const fontIndex = Math.min(Math.max((parseInt(fontInput) || 1) - 1, 0), FONTS.length - 1);
    const colorNames = Object.keys(COLORS);
    console.log(chalk_1.default.gray("\nColors: ") + colorNames.map((c, i) => `${i + 1}. ${c}`).join("  "));
    const colorInput = await ask(chalk_1.default.white("\nChoose color (1-8, default 3): "));
    const colorIndex = Math.min(Math.max((parseInt(colorInput) || 3) - 1, 0), colorNames.length - 1);
    const options = {
        font: FONTS[fontIndex],
        color: colorNames[colorIndex],
        align: "default",
        width: process.stdout.columns || 80,
    };
    console.log("\n" + renderArt(text, options) + "\n");
    console.log(chalk_1.default.gray(`Font: ${options.font} | Color: ${options.color}\n`));
    rl.close();
}
const program = new commander_1.Command();
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
    .action(async (text, opts) => {
    if (opts.listFonts) {
        console.log(chalk_1.default.cyan.bold("\nAvailable fonts:\n"));
        FONTS.forEach((f, i) => console.log(chalk_1.default.white(`  ${i + 1}. ${f}`)));
        console.log();
        return;
    }
    if (opts.interactive || !text) {
        await interactiveMode();
        return;
    }
    const options = {
        font: (FONTS.includes(opts.font) ? opts.font : "Standard"),
        color: (Object.keys(COLORS).includes(opts.color) ? opts.color : "cyan"),
        align: opts.align,
        width: parseInt(opts.width) || 80,
    };
    console.log("\n" + renderArt(text, options) + "\n");
});
program.parse();