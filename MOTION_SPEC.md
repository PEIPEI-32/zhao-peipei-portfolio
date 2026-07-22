# ZPP Portfolio — Motion Specification v2

## Visual language

The site now behaves like a continuous contemporary art exhibition: warm paper,
oil paint, plaster sculpture, handwritten display type and cobalt pigment. The ZPP
letter sculpture has been removed from the hero to reduce the product-tech feeling
and eliminate the heaviest rendering work.

## Primary pinned scenes

### 01. Hero (`0%–100%` of 195vh)

- A reconstructed classical landscape forms the full-bleed base layer.
- The enlarged plaster bust and its three centered golden orbital rings share one upper-right exit path and are fully off-canvas before the About reveal completes.
- The rings rotate continuously around the bust's head while the shared group remains on screen.
- Three plaster polyhedrons leave on separate upward trajectories and speeds.
- Chinese and English names separate like loose editorial layers.
- The landscape slowly pushes in as a cobalt torn-paper curtain rises from the bottom and carries the About visual language into view.
- Every transform is scrubbed and restores exactly on reverse scroll.

### 02. About (`0%–100%` of 160vh)

- A reconstructed classical lake-and-garden landscape forms the section background.
- The plaster head exits completely toward the upper left.
- Three butterflies and three magnifying glasses leave on separate upper-right trajectories.
- Lower-left magnolia foliage and the upper-right branch sway through two gentle wind beats while the page moves.
- The landscape receives a restrained push-in, while the blue wash keeps long-form copy readable.

### 03. Experience (`0%–100%` of 460vh)

- Four metrics still take over the center one at a time.
- Four paper-like media plates enter from top-left, right, lower diagonal and depth.
- Blur animation has been removed; only transform and opacity run during scroll.
- Scrub smoothing was shortened to reduce the feeling of lag.

## Art intermissions

Six full-height intermissions sit between the main chapters:

1. Oil-painting dialogue between logic and art.
2. Plaster bust and reaching hand about active observation.
3. A 48-tile paper wave about accumulated small changes.
4. Oil painting, bust and hand collage about evidence.
5. Sculpture transition between AI practice and tools.
6. Oil-painting handoff into Contact.

Each intermission has one ScrollTrigger timeline moving all its layers at different
vertical rates. The tile wave also uses one shared timeline rather than creating a
trigger for every square.

## Section-level art movement

- Real-world: bust and hand cross behind torn paper scene cards.
- Capabilities: hand cast and pigment rings enter on opposing arcs; capability
  modules read as rotated paper sheets rather than SaaS cards.
- AI Lab: painting window and translucent bust move behind a stack of paper rows.
- Tools: a large plaster hand crosses the orbital labels while rows drift laterally.

## Performance decisions

- The WebGL/Three.js scene and dependencies were removed.
- Generated source PNG files are delivered to the page as compressed WebP assets.
- Scroll motion uses transform and opacity; animated blur and drop shadow are avoided.
- Lenis response was increased from `0.085` to `0.12`; ScrollTrigger scrub lag was
  shortened to `0.18–0.28`.
- Hero assets are eager; later art assets use lazy loading.
- There is no wheel hijacking, scroll snapping or forced scroll position.

## Responsive and reduced motion

- Desktop intermissions are 108svh; mobile intermissions are 92svh.
- Mobile crops the bust and hand while keeping their gesture visible and reduces
  paper-wave columns from eight to six.
- Under `prefers-reduced-motion`, Lenis and scrub timelines are not created; art
  layers become static, pinned sections return to document flow and all content
  remains readable.
