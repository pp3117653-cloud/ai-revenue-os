# Code-generated video pipeline

## New content workflow

The content team will no longer use a video-generation model for the actual video. The video is created as code.

1. Audience Miner finds a useful topic.
2. Editorial Pilot creates the approved brief, script, timing, and call to action.
3. **Motion Code Lab — Claude-4** writes HTML/CSS/JavaScript using Canvas, SVG, or DOM animation.
4. Manus-1 reviews the code and runs the animation with synthetic/local assets.
5. GitHub Actions renders the approved animation to MP4 using a browser renderer and FFmpeg.
6. Visual QA — MiniMax-1 creates or reviews thumbnails, cover frames, alt text, and visual packaging only; it does not generate the video.
7. Distribution Analyst prepares Instagram Reels and YouTube upload drafts.
8. Saksham approves the final MP4, title, caption, thumbnail, and platform settings.
9. Only then may the authorized publishing connector upload to Instagram and YouTube.

## Repository paths

- `content/video/briefs/`: approved video briefs and scripts.
- `content/video/src/`: animation source code.
- `content/video/assets/`: rights-cleared local assets.
- `content/video/renders/`: generated MP4 files and poster frames.
- `content/video/qa/`: render checks, captions, duration, aspect ratio, and approval records.

## Accepted technical formats

Use self-contained HTML/CSS/JavaScript whenever possible. Prefer SVG or Canvas for deterministic scenes. Use local fonts or system fonts. Keep external network dependencies out of render jobs unless explicitly approved. Every video must have a fixed duration, width, height, frame rate, narration/caption plan, and a reproducible render command.

Recommended initial formats:

- Instagram Reel: vertical 1080×1920, 9:16, MP4/H.264, with burned-in captions when appropriate.
- YouTube Short: vertical 1080×1920, 9:16, MP4/H.264.
- YouTube landscape: 1920×1080, 16:9, MP4/H.264.

## Non-negotiable gates

No generated video is considered finished until the repository contains the source code, render command, output file, poster frame, caption text, source/rights notes, QA result, and CEO approval record. Never claim a video was uploaded unless the platform returns a confirmed upload/publish result. Never upload automatically without approval.
