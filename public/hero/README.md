# Cinematic hero video

Drop the exported video here to activate the scroll-scrubbed hero
(`src/components/sections/CinematicHero.tsx`). Until a file exists at these
paths, the section automatically renders its static poster fallback — nothing
breaks, it just isn't scrubbing yet.

## Files expected

| Path | Used when |
|---|---|
| `silverplay-cinematic.mp4` | desktop / default |
| `silverplay-cinematic-mobile.mp4` | viewport ≤ 767px, if present (optional — desktop file is used otherwise) |

## Recommended encoding

- **Container/codec:** H.264 MP4 (`.mp4`), `yuv420p` pixel format — universal
  Safari/Chrome/Firefox support for frame-accurate seeking.
- **No audio track needed** — the video is muted and never plays normally.
- **Keyframes:** encode with a short GOP / frequent keyframes
  (e.g. `-g 15` in ffmpeg, or "keyframe every 0.5s") — scrubbing seeks to
  arbitrary timestamps constantly, and long GOPs make every seek decode a
  run of prior frames first, which is what causes stutter on fast scrolling.
- **Resolution:** 1920×1080 (or match the hero's aspect) for desktop;
  a lighter 1080×1920 or 1080×1350 export for the mobile file keeps payload
  size down on cellular connections.
- **Length:** 8–15s of source footage is plenty — the visitor never presses
  play, they scrub through it via scroll, so extra runtime just adds file
  size without adding story.
- **Bitrate:** aim for the smallest file that still looks clean at 1080p;
  something in the 3–6 Mbps range is a reasonable starting point for H.264.

Example ffmpeg pass:

```bash
ffmpeg -i source.mov \
  -vf "scale=1920:-2" -an \
  -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -preset slow -crf 20 -g 15 \
  -movflags +faststart \
  silverplay-cinematic.mp4
```

## Poster

The poster frame is a real Silver Play photo already on the live CDN
(`cinematicHero.poster` in `src/data/site.ts`) — swap it for an exact first
frame of the new video once you have one, for a seamless load-in.
