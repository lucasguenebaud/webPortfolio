# Lucas Guenebaud — portfolio

Personal portfolio for a Senior Data, Cloud & ML Engineer. Rebuilt around the CV in `../web/resume.json`, retaining the original DeveloperFolio purple palette, Montserrat typography, Agustina signature, illustrations, dark theme and animated reveals.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
npm start
```

Open the local URL printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

Upload the contents of `build/` to a static host. Relative asset paths support both a domain root and a subdirectory. Nothing is published by these commands. No API keys, GitHub token or backend are needed. Fonts and artwork are served locally.

On Google Drive for Windows, npm may fail with `EBADF` / `TAR_ENTRY_ERROR`. In that case copy the project (excluding `node_modules`, `.git` and `build`) to a local disk, run the commands there, and copy the generated `build/` back.

## Content and CV updates

The canonical career history, projects, education, skills and contact details live in `../web/resume.json`. The portfolio commits a snapshot in `src/data/resume.json` so it also builds as a standalone repository.

After editing the canonical CV, install the dependencies in `../web` if needed, then run:

```sh
npm run sync:cv
npm run build
```

The sync command regenerates the Elegant Pink HTML and PDF with the existing CV renderer, then copies both into `public/cv/` and updates the data snapshot. If Puppeteer cannot find Chrome, set `PUPPETEER_EXECUTABLE_PATH` to your Chrome executable before syncing. On Windows, for example:

```powershell
$env:PUPPETEER_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm run sync:cv
```

`src/portfolio-data.js` contains the short editorial summaries and technology selections. `src/App.jsx` provides the page sections; `src/App.css` and `src/index.css` define responsive layout, motion and themes. Employment highlights are taken directly from the CV. The displayed spelling of Sorbonne is corrected without altering the source CV. Chevalue has a contact link because no public project URL is provided in the CV. The previous GitHub profile link is retained; LinkedIn comes from the new CV.

## Browser checks

```sh
npm run build
npm test
```

Tests use an installed Chrome/Chromium browser (set `PUPPETEER_EXECUTABLE_PATH` if it is not in a standard location). They check desktop/mobile overflow, real CV content and downloads, theme persistence, mobile navigation, keyboard access and reduced motion against the production build.

## Credits

This portfolio originated from [DeveloperFolio by Saad Pasta and contributors](https://github.com/saadpasta/developerFolio). The original contributor list is retained in `.all-contributorsrc`. Existing illustration and font assets are retained from that project; the Chevalue graph illustration is original SVG. Employer names are typeset text, not downloaded brand marks. No remote image, font, social embed, analytics or GitHub API requests are made by the portfolio.

The old Create React App, Apollo and react-reveal stack has been replaced with React, Vite and native CSS/IntersectionObserver animations. Empty template sections and obsolete integrations have been removed. Theme preferences are saved locally; reduced-motion preferences disable animations. The original implementation remains in Git history.
