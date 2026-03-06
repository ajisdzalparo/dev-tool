# Developer Toolbox

A lightweight, fast-loading collection of essential developer tools built with Next.js. Perfect for quick deployment in videos and demos. No database required!

## Features

- **JSON Formatter** - Format and minify JSON with real-time validation
- **UUID Generator** - Generate single or bulk UUIDs (1-100 at a time)
- **Base64 Encoder/Decoder** - Encode text to Base64 or decode Base64 strings
- **API Tester** - Test GET requests and view JSON responses with timing info

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Runtime**: Node.js 18+
- **Package Manager**: pnpm

## Project Structure

```
developer-toolbox/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with tab navigation
│   └── globals.css         # Tailwind styles
├── components/
│   ├── JSONFormatter.tsx   # JSON formatting tool
│   ├── UUIDGenerator.tsx   # UUID generation tool
│   ├── Base64Tool.tsx      # Base64 encode/decode tool
│   └── APITester.tsx       # API testing tool
├── Dockerfile              # Multi-stage Docker build
├── .dockerignore           # Docker ignore rules
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run development server**:
   ```bash
   pnpm dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### Production Build

1. **Build the project**:
   ```bash
   pnpm build
   ```

2. **Start production server**:
   ```bash
   pnpm start
   ```

## Docker Deployment

### Build Image

```bash
docker build -t devtools .
```

### Run Container

```bash
docker run -p 3000:3000 devtools
```

The application will be available at `http://localhost:3000`

### Docker Compose (Optional)

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  devtools:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

Then run:
```bash
docker-compose up
```

## Features in Detail

### JSON Formatter
- Paste JSON and click "Format" to prettify
- "Minify" button to compress JSON
- Real-time validation with error messages
- Copy formatted output to clipboard
- Clear button to reset input

### UUID Generator
- Generate 1, 5, 10, 25, or 100 UUIDs at once
- Display all generated UUIDs with copy buttons
- Copy all UUIDs at once
- Clear all button to reset list
- All generation happens locally in the browser

### Base64 Tool
- Switch between Encode and Decode modes
- Supports Unicode and special characters
- Error handling for invalid Base64
- Paste and copy functionality
- Clear buttons for input/output

### API Tester
- Test GET requests to any API endpoint
- Displays HTTP status code
- Shows response time in milliseconds
- Automatic JSON formatting for responses
- CORS-aware error messages
- Keyboard shortcut: Ctrl+Enter (Cmd+Enter on Mac)

## Performance

- **Minimal dependencies**: Only essential packages included
- **Lightweight build**: ~50KB gzipped bundle
- **Fast cold starts**: Optimized for Docker deployment
- **No database**: All tools run client-side

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Adding New Tools

1. Create a new component in `/components/`
2. Import it in `/app/page.tsx`
3. Add a tool entry to the `tools` array
4. Add conditional rendering in the content area

### Customization

- **Colors**: Edit CSS custom properties in `/app/globals.css`
- **Font**: Modify font imports in `/app/layout.tsx`
- **Layout**: Update grid/flex utilities in components
- **Icons**: Replace Lucide icons with alternatives

## Environment Variables

No environment variables required for basic functionality.

## License

MIT

## Notes

- This project is optimized for single-container Docker deployment
- All tools process data locally (no external API calls except for API Tester)
- Perfect for demo videos due to fast startup and minimal dependencies
