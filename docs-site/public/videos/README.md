# Self-hosted videos

Drop MP4 / WebM files here. Reference them in `.mdx` content with:

```mdx
import Video from '../../../components/Video.astro';

<Video src="/videos/your-clip.mp4" title="Caption" poster="/videos/your-clip-poster.png" />
```

## Conventions

| Property | Target |
| --- | --- |
| Container | MP4 (H.264 + AAC) — broadest compatibility. WebM also OK. |
| Resolution | 1920×1080 (1080p) or 1280×720 (720p) |
| File size | ≤ 25 MB per clip. Larger → host externally (YouTube / Azure Blob). |
| Aspect | 16:9 for desktop walk-throughs; 9:16 for mobile-shaped clips. |
| Poster | Same basename + `-poster.png` (1080p still frame). |
| Bitrate | ~2.5 Mbps for 720p, ~5 Mbps for 1080p. Use `ffmpeg -crf 23` as a starting point. |

## Why we cap at 25 MB

The SWA Free tier has 500 MB total storage. Bigger videos slow git operations
and bloat every clone. For anything longer than ~60 seconds, prefer:

- **YouTube (unlisted)** — best player + accessibility + auto-captions.
- **Vimeo** — cleaner player; paid for advanced features.
- **Azure Blob Storage** (in the same canary RG):
  - *Public container* — easy sharing, no auth needed; the URL is world-readable, so treat it the same way you'd treat a public YouTube link.
  - *Private container + SAS URL* — stays internal; the SAS expires, so rotate the URL when you rotate the video.

Reference external videos with the same `<Video>` component:

```mdx
<Video src="https://www.youtube.com/watch?v=ABC123" title="Platform overview" />
```

## Optimisation cookbook

```bash
# Re-encode a screen capture to a docs-friendly MP4
ffmpeg -i source.mov \
  -vf "scale=-2:720,format=yuv420p" \
  -c:v libx264 -preset slow -crf 23 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  out.mp4

# Generate a poster from a single frame
ffmpeg -i source.mov -ss 00:00:02 -frames:v 1 -q:v 2 out-poster.png
```

`+faststart` puts the metadata at the start of the file so playback can begin
before the whole file downloads — important for the SWA experience.
