# MISSING INPUTS & ASSETS NEEDING REPLACEMENT

**Project:** Modern Audio Company Private Limited (Modern Audio Co.)  
**Date:** October 2026  
**Status:** Temporary Stock Photos Assigned; Dedicated Photos Needed  

As per project guidelines, no images were generated or downloaded externally. For each of the four newly added venues, the closest high-resolution architectural image from `/public/images` has been temporarily assigned in `src/lib/site-config.ts`. Each image path is stored cleanly within the central venue configuration and can be swapped immediately by updating that single value.

The following venues require permanent, dedicated client photographs:

| Venue Number | Venue Name | Slug | Currently Assigned Image | Status | Recommended Photo Subject |
|---|---|---|---|---|---|
| **11** | **Residential Societies** | `residential-societies` | `/images/space-community.jpg` | **Needs a dedicated photo** | High-end residential society clubhouse, community hall, or landscaped podium lawn with discreet column/ceiling/outdoor speakers. |
| **12** | **Social Clubs** | `social-clubs` | `/images/hotel-conference.jpg` | **Needs a dedicated photo** | Heritage or modern social club ballroom, member lounge, or dining hall with stage/DJ equipment and ambient sound distribution. |
| **13** | **Theme Parks** | `theme-parks` | `/images/shopping-mall-atrium.jpg` | **Needs a dedicated photo** | Outdoor amusement or theme park attraction area showing weatherproof horn/column/cluster speakers and zoned public address points. |
| **14** | **Outdoor Stadiums** | `outdoor-stadiums` | `/images/event-public-space.jpg` | **Needs a dedicated photo** | Open-air sports stadium, arena, or pavilion grounds featuring long-throw line array loudspeaker clusters or tower setups. |

---

### How to Update Once Photos Are Received:
1. Place the new high-resolution optimized `.jpg` or `.webp` image into `/public/images/`.
2. Open `src/lib/site-config.ts`.
3. Locate the corresponding venue under `SITE_CONFIG.spaces` (`residential-societies`, `social-clubs`, `theme-parks`, or `outdoor-stadiums`).
4. Update the `image` field to the new file path (e.g. `/images/residential-societies.jpg`).
5. All site locations (homepage gallery, spatial HUD, /solutions anchors, /solutions/[slug] headers, OpenGraph cards) will update automatically.
