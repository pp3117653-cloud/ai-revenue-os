# Code-generated video pipeline
## Content workflow
The actual video is created from animation code, not a video-generation model.
1. Audience and Editorial Desk (Google-3) finds a useful topic, researches it, and creates the sourced, CEO-approved brief, script, timing, and call to action.
2. **Automation and Demo Builder (Manus-1)** writes deterministic HTML/CSS/JavaScript using Canvas, SVG, or DOM animation. This is the former Motion Code Lab responsibility, reassigned to Manus-1.
3. Manus-1 also tests the source with synthetic/local assets. Keep code review and render QA as explicit checklist steps.
4. GitHub Actions renders the approved animation to MP4 using the repository's browser renderer and FFmpeg workflow.
5. Thumbnail and Visual QA (MiniMax-1) creates or reviews thumbnails, cover frames, alt text, and visual packaging; it does not generate the underlying animation.
6. Distribution Analyst (Manus-4) prepares Instagram Reels and YouTube upload drafts.
7. Saksham approves the final MP4, title, caption, thumbnail, and platform settings.
8. Only then may the authorized publishing connector upload to Instagram and YouTube.

## Repository paths
- `content/video/briefs/`: approved video briefs and scripts.
- `content/video/src/`: animation source code.
- `content/video/assets/`: rights-cleared local assets.
- `content/video/renders/`: generated MP4 files and poster frames.
- `content/video/qa/`: render checks, captions, duration, aspect ratio, and approval records.

## Accepted technical formats
Use self-contained HTML/CSS/JavaScript whenever possible. Prefer SVG or Canvas for deterministic scenes. Use local fonts or system fonts. Keep external network dependencies out of render jobs unless explicitly approved. Every video must have a fixed duration, width, height, frame rate, narration/caption plan, and reproducible render command.

Recommended initial formats:
- Instagram Reel: vertical 1080×1920, 9:16, MP4/H.264, with burned-in captions when appropriate.
- YouTube Short: vertical 1080×1920, 9:16, MP4/H.264.
- YouTube landscape: 1920×1080, 16:9, MP4/H.264.

## Non-negotiable gates
No generated video is considered finished until the repository contains source code, render command, output file, poster frame, caption text, source/rights notes, QA result, and CEO approval record. Never claim a video was uploaded unless the platform returns a confirmed upload/publish result. Never upload automatically without approval.
