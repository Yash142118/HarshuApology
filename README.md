# For Harshu

A cinematic, interactive apology site built with Next.js 16, TypeScript,
Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

The PIN is `2830` (edit `CORRECT_PIN` in `components/LockScreen.tsx` if you
want to change it).

## Adding your own content

- **Music** — drop a file at `public/music/our-song.mp3` (see the README in
  that folder). Update `TRACK_SRC` in `components/MusicPlayer.tsx` if you use
  a different filename.
- **Photos** — drop images into `public/photos/` and list them in the
  `photos` array at the top of `components/PhotoGallery.tsx`.
- **Text** — every line of copy for the story cards and the letter lives in
  `data/cards.ts`, so you can edit wording without touching any component.

## Collecting her response

Her "Yes"/"I Need Time" answer, plus whatever she checks off on the "when
we meet" list, can be emailed to you automatically. It uses
[Formspree](https://formspree.io) (free for this — up to 50 submissions/month)
and needs no backend code:

1. Go to formspree.io, sign up free, and create a new form. It'll give you
   an endpoint that looks like `https://formspree.io/f/xxxxxxx`.
2. Copy `.env.local.example` to `.env.local` and paste your endpoint in:
   ```
   NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```
3. If you're deploying on Vercel, add the same variable under
   Project Settings → Environment Variables, using the same name and value.
4. Redeploy. She'll see a "Send my answer 💌" button on the last screen —
   tapping it emails you her forgiveness answer and her food picks.

Until you set this up, that button still works and shows a confirmation on
her screen, it just won't reach you yet — nothing breaks either way, so you
can add this step whenever you're ready.



## Deploying it

The easiest option is Vercel (it's made by the Next.js team, free for a
personal project like this):

1. Push this folder to a GitHub repo (can be private).
2. Go to https://vercel.com, sign in, click "Add New Project," and import
   that repo. It auto-detects Next.js — just click Deploy.
3. You'll get a live `https://your-project.vercel.app` link a minute or two
   later, ready to send.

No GitHub account? You can also deploy straight from your computer:

```bash
npm install -g vercel
vercel
```

Follow the prompts (log in, confirm the project settings, deploy) and it'll
give you the same kind of live link.

### Adding photos/music after deploying

Yes — just drop files into `public/photos/` and `public/music/` (see the
READMEs in those folders), commit, and push. Vercel automatically rebuilds
and updates the live site within a minute or two of every push. No need to
redo anything else.

## Folder structure

```
app/                 Next.js App Router entry points (layout, page, global CSS, loading state)
components/          All UI building blocks (lock screen, story deck, letter, gallery, final page, effects)
data/                Copy/content, kept separate from presentation
hooks/               Small reusable hooks (typed-word listener, viewport size)
lib/                 Generic utility helpers
public/music/        Drop your song file here
public/photos/       Drop your photos here
```

## Flow

`Lock screen (PIN 2830)` → `Welcome` → `Story cards (1 per screen, swipeable)`
→ `Handwritten letter` → `Photo gallery` → `Will you forgive me? (with confetti)`

## Hidden easter eggs

- Tap any glowing heart 10 times → "I Love You ❤️"
- Long-press any glowing heart → "Forever."
- Type `HARSHU` anywhere on the page → a burst of floating hearts

## Notes

- Dark theme, glassmorphism, and the rose/gold palette are defined as design
  tokens in `tailwind.config.ts` — change them there to re-theme the whole
  site at once.
- Reduced-motion preferences are respected globally (see `app/globals.css`).
- The custom sparkle cursor only activates on devices with a fine pointer
  (desktop); touch devices get the normal system cursor.
