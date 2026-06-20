# 🎨 ascii-art-generator

A TypeScript CLI tool that transforms any text into stunning ASCII art — with multiple fonts, colors, and an interactive mode.

```
   _   _      _ _
  | | | | ___| | | ___
  | |_| |/ _ \ | |/ _ \
  |  _  |  __/ | | (_) |
  |_| |_|\___|_|_|\___/
```

## Features

- **10 fonts** — Standard, Big, Block, Banner, Slant, 3-D, Shadow, Doom, Ghost, Graffiti
- **8 colors** — red, green, yellow, blue, magenta, cyan, white, and 🌈 rainbow
- **Interactive mode** — guided prompts for easy use
- **Zero config** — works out of the box with `npx`
- Written in **TypeScript** with full type safety

## Quick start

No install needed:

```bash
npx ascii-art-generator "Hello World"
```

## Installation

```bash
npm install -g ascii-art-generator
```

## Usage

```bash
# Basic usage
ascii-art "Hello World"

# Choose a font and color
ascii-art "GitHub" --font Doom --color rainbow

# Interactive mode
ascii-art --interactive

# List available fonts
ascii-art --list-fonts
```

## Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--font <font>` | `-f` | Font to use | `Standard` |
| `--color <color>` | `-c` | Output color | `cyan` |
| `--align <align>` | `-a` | Alignment (default, full, fitted) | `default` |
| `--width <width>` | `-w` | Output width in characters | `80` |
| `--list-fonts` | `-l` | Show all available fonts | — |
| `--interactive` | `-i` | Interactive guided mode | — |

## Available fonts

| # | Font | Style |
|---|------|-------|
| 1 | Standard | Classic clean look |
| 2 | Big | Large block letters |
| 3 | Block | Heavy filled blocks |
| 4 | Banner | Wide horizontal banners |
| 5 | Slant | Italic-style slant |
| 6 | 3-D | Three-dimensional effect |
| 7 | Shadow | Letters with drop shadow |
| 8 | Doom | Inspired by the game |
| 9 | Ghost | Hollow outlined letters |
| 10 | Graffiti | Street art style |

## Available colors

`red` · `green` · `yellow` · `blue` · `magenta` · `cyan` · `white` · `rainbow`

## Examples

```bash
ascii-art "Welcome" --font Slant --color cyan
ascii-art "TypeScript" --font Doom --color rainbow
ascii-art "v1.0.0" --font Big --color green --width 100
```

## Development

```bash
git clone https://github.com/yourusername/ascii-art-generator
cd ascii-art-generator
npm install
npm run dev -- "Hello" --font Slant --color magenta
npm run build
```

## Tech stack

- [TypeScript](https://www.typescriptlang.org/)
- [figlet](https://github.com/patorjk/figlet.js) — ASCII art rendering
- [chalk](https://github.com/chalk/chalk) — terminal colors
- [commander](https://github.com/tj/commander.js) — CLI argument parsing