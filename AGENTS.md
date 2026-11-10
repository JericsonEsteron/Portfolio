# AGENTS.md

## Project purpose

This repository is a game-developer portfolio built with React, JavaScript, and Vite. The portfolio should present each game clearly and professionally, with enough context for a visitor to understand the game and enough media to evaluate the work.

## Technology rules

- Use React with plain JavaScript. Do not introduce TypeScript unless explicitly requested.
- Use Vite for development and production builds.
- Prefer small, composable React components over one large page component.
- Keep portfolio content separate from presentation code. Store game entries in a JavaScript data module or another easily editable content source, then render them through reusable components.
- Avoid adding a dependency when browser APIs, React, or existing project utilities are sufficient.
- Use semantic HTML elements (`main`, `section`, `article`, `figure`, `footer`, headings, and links) and accessible labels.
- Keep components, data, and styles organized by feature where practical. Use clear, descriptive names.

## Game portfolio content contract

Every game entry must support:

- `title`: the game name.
- `description`: a concise description of the game and the developer's contribution.
- `images`: one or more screenshots, key art images, or GIFs with meaningful alternative text.
- `gameUrl`: a link to play, download, or learn more about the game when one exists.
- `playableAd`: optional information for playable-ad entries, including the HTML asset or embed source needed to play it.
- Optional metadata such as role, studio/client, platform, genre, technologies, release date, and responsibilities.

When adding a game, do not omit the description, game imagery, or a clear call to action. If a game is a playable ad, show an embedded or in-page HTML playable experience when technically safe and appropriate; also provide a fallback link or message if the playable cannot load.

Use descriptive alt text for informative images. Decorative images should use an empty alt value. Do not put essential game information only inside an image or playable ad.

## Playable-ad rules

- Treat supplied playable HTML as untrusted content. Prefer sandboxed `iframe` embeds with the minimum permissions required, or an isolated component when the asset is part of this project.
- Do not allow an embedded playable to navigate the portfolio, access unrelated browser capabilities, or request unnecessary permissions.
- Give each playable a visible title, responsive aspect-ratio container, loading state, and fallback link or text.
- Do not autoplay audio. Respect browser autoplay restrictions and provide an obvious play/replay control when needed.
- Keep playable-ad assets isolated from the main React application where possible so they cannot accidentally modify portfolio state or styles.

## Responsive design

- The portfolio must work from small mobile screens through large desktop screens.
- Build mobile-first layouts that expand progressively for larger viewports.
- Do not rely on fixed widths that cause horizontal scrolling. Use flexible grids, fluid media, sensible max-widths, and responsive typography.
- Use responsive images and preserve their aspect ratios. Avoid layout shifts by reserving media space where possible.
- Ensure touch targets are comfortably usable on mobile and that keyboard navigation is visible and complete.
- Test portrait and landscape layouts, narrow phone widths, tablet widths, and wide desktop widths.
- Respect `prefers-reduced-motion` and avoid motion that is required to understand or operate the site.

## Single-HTML production build

- The production deliverable must be a single self-contained HTML file with no runtime server requirement.
- Configure the Vite build to inline JavaScript, CSS, and required local assets into the generated HTML. Verify the exact output after every build.
- Do not assume a size limit; prioritize a polished result, but optimize oversized images and unnecessary assets for load performance.
- Local fonts, images, and playable-ad assets must be bundled or otherwise made available to the standalone HTML. Do not leave build output dependent on Vite's asset paths.
- External URLs may be used for intentional game links or explicitly approved embeds, but the portfolio shell must remain usable if an external resource is unavailable.
- Do not claim the build is single-file until opening the generated HTML independently confirms it renders without the Vite dev server.

## Content and visual quality

- Make the portfolio owner's role and contribution obvious for every game.
- Use consistent card, gallery, metadata, and call-to-action patterns across entries.
- Keep descriptions scannable: lead with what the game is, then explain the work performed and notable technologies or outcomes.
- Use high-quality screenshots that show gameplay or the final experience. Compress images when practical without making important details illegible.
- Links should have descriptive text, open safely when opening a new tab, and visibly communicate whether they play, download, view, or learn more.

## Validation checklist

Before considering a change complete:

1. Run the Vite build and confirm it succeeds.
2. Inspect the generated output and confirm the deliverable is one standalone HTML file.
3. Test the page at mobile, tablet, and desktop widths.
4. Verify every game has a description, image media, and an appropriate link or playable-ad experience.
5. Check keyboard navigation, focus visibility, image alt text, heading order, and playable fallback behavior.
6. Confirm there is no unintended horizontal overflow, broken asset path, console error, or missing game content.

## Scope discipline

Preserve existing portfolio content and user changes. Make the smallest coherent change needed for the request, and do not replace game assets or rewrite content without a clear reason.
