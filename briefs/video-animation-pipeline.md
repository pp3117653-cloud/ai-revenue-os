# Code-generated video pipeline
The actual video is created as animation code, not by a video-generation model. **Google-3 / GA-03 is the exclusive code author.** No other AI account may author or modify the animation source.

## Workflow
1. GA-02 (Google-2) researches audience demand and provides cited evidence.
2. MN-03 (Manus-3) drafts a script and a complete video brief. Saksham approves the brief before coding begins.
3. **GA-03 (Google-3 Gemini Argon Motion Code Lab) writes and owns all animation source code** in HTML/CSS/JavaScript using Canvas, SVG, or DOM animation. It creates captions, metadata, source/rights notes, and render instructions.
4. MN-01 (Manus-1) may read-only review/test the source and run the render workflow. It must not edit or author animation source. GitHub Actions renders the approved code to MP4 using a browser renderer and FFmpeg.
5. MM-01 (MiniMax-1) creates/reviews thumbnails, poster frames, alt text, and visual packaging only.
6. MN-04 (Manus-4) prepares Instagram and YouTube upload drafts.
7. Saksham approves the final MP4, title, caption, thumbnail, and platform settings before any upload.

## Repository paths
- `content/video/briefs/`: approved video briefs and scripts.
- `content/video/src/`: source written only by GA-03.
- `content/video/assets/`: rights-cleared local assets.
- `content/video/renders/`: generated MP4 files and poster frames.
- `content/video/qa/`: render checks, captions, duration, aspect ratio, and approval records.

## Accepted technical formats
Use self-contained HTML/CSS/JavaScript whenever possible. Prefer SVG or Canvas for deterministic scenes. Use local/system fonts and avoid unapproved network dependencies. Every video needs fixed duration, dimensions, frame rate, narration/caption plan, and reproducible render command.

Recommended formats: Instagram Reel and YouTube Short at vertical 1080×1920, 9:16, MP4/H.264; YouTube landscape at 1920×1080, 16:9, MP4/H.264.

## Gates
A video is not finished until the source, render command, MP4, poster frame, caption text, source/rights notes, QA result, and CEO approval record exist. Do not claim upload without platform confirmation. Never upload automatically.
