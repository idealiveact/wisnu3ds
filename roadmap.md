# Roadmap

## Done
- [x] Homepage and project-specific SEO: titles, descriptions, self-referencing URLs and optimized cover previews.
- [x] Identity swap: name "Wisnu Kesuma", email wisnu3ds@gmail.com across nav, hero, titles, Contact.
- [x] Project Pertamina (2021–2026) in Work: umbrella entry with expanded English write-up, ten labelled gallery renders in year order (HUT ke-64 x3 2021, TSS Virtual 2022, PIS Independence Day display 2023, Java Jazz Festival booth 2024, Keroncong pavilion + Ecorun Fest booth + Kartini stage 2025, Pasar Rakyat main stage 2026).
- [x] SAMSUNG Project (2015–2020) in Work: umbrella entry renamed from "Samsung Galaxy Note20 Virtual Booth", now holding nine labelled renders in year order (Jember Fashion Carnaval booth 2015, digital-dealer mini booth 2017, Galaxy Note8 "Do bigger things" photo experience 2017, Note20 virtual booth x3 2020, TV & AV campaign: House of Screens showroom 2020, TV & AV lifestyle interiors x2 2020). Old /projects/samsung-note20-virtual-booth URL redirects to /projects/samsung.
- [x] Slideshow text made readable over bright renders (stronger top/bottom overlay, accent label, soft text shadow).
- [x] Contact links: LinkedIn, Gmail, Instagram, Behance and YouTube @wisnu3ds.
- [x] Menu restructured: Work, Gallery, Personal, About, Start a Project, Contact. Technical Art removed (old /technical-art URL redirects to /work); its two example projects deleted.
- [x] Gallery page created (renamed from "Gallery Photo"; old /gallery-photo URL redirects to /gallery), data in src/data/gallery.ts.
- [x] Personal page emptied with a "coming soon" message; its two example projects deleted.
- [x] Homepage opening picture: Wisnu's Samsung Galaxy activation render (with costumed performers), plus a matching 1200×630 share preview; overlay strengthened so the wording stays readable on phone and desktop.
- [x] About picture removed; the page now reads as one centered column until Wisnu picks a new image.
- [x] About bio, two-group toolset (Software / AI) and profile header.
- [x] Contact: AI project-brief assistant (client notes → structured brief).
- [x] "Send to Wisnu" sends the brief straight to Wisnu without opening a mail app: asks the client's reply email (+ optional WhatsApp), saves every brief in the site's backend, shows sending / sent / error states, limits each address to 3 briefs an hour and quietly ignores spam bots.
- [x] Private Briefs page (/briefs, Wisnu's account only) listing every brief with status and project-type filters and a status changer; clients now pick a project type when sending.
- [x] Brief assistant given its own menu item "Start a Project" and its own page (/start-a-project); Contact keeps the email and social links plus a button pointing there.
- [x] Gallery opened with two labelled entries: the Galaxy Note20 virtual booth walkthrough film (September 2020, re-encoded to ~19 MB with a cover still so it streams instead of downloading) and the Pertamina International Shipping Independence Day lobby display (August 2023). Entries live in src/data/gallery.ts; every entry must carry a name, a date and a note, and every film a cover still (checked by src/test/gallery.test.ts).
- [x] Gallery cards are clickable: clicking a picture or the film's expand button opens a full-size viewer with the name, date, note and a position counter; arrows, keyboard arrows and swipes move between entries and wrap around, Escape / the X / a backdrop click closes it.
- [x] Work now shows a horizontally sliding project-cover collection matching Wisnu's reference; each cover opens its project. Desktop/mobile navigation and image loading verified.
- [x] Indofood Project (2018) added to Work: a 20 x 20 metre Rumah Indofood noodle pavilion at the Jakarta Fair (PRJ), with two labelled renders (main pavilion front view, scoreboard corner) and a 699-character opening paragraph; the Work cover row now holds three projects.
- [x] Gallery now holds five on-site photos: the 2015 Palmia temple-roof pavilion at SIAL Interfood (wide hall view and crowded floor), the Rumah Indofood pavilion at the Jakarta Fair after dark, the 2017 Bogasari island booth, and the three Best Booth plaques labelled as three consecutive years.
- [x] Injourney added to Work: Booth Exhibition Sub Holding 2024 — five numbered renders, number one the Pola timber-arch pattern study, then InJourney Retail, Hospitality, Aviation Service and Destination Management booths — plus the four Sahakarya 2025 festival renders (food court, entrance, main stage, aerial layout); 699-character opening paragraph; the Work cover row now holds four projects.
- [x] Injourney extended with the Gandrung Sewu 2026 UMKM market: four labelled renders numbered 10–13 (craft market, market lane, night harvest, coastal pavilion), folder year now 2024–2026, opening paragraph rewritten to exactly 699 characters. The stray 3D viewport axis marker in the craft-market render was trimmed out before publishing.

- [x] Injourney picture names restyled: each title starts with its event name, the number restarts at 1 per event (Booth Exhibition Sub Holding 2024 — 1 pola … — 5 destination management, Sahakarya 2025 — 1 food court … — 4 aerial layout, Gandrung Sewu 2026 — 1 umkm craft market … — 4 umkm coastal pavilion) and the picture name is in lower case.

## Open
- [ ] Wisnu must create his account at /auth with wisnu3ds@gmail.com and confirm it before /briefs shows anything.
- [ ] Inbox email to wisnu3ds@gmail.com for each new brief — blocked until Wisnu sets up an email sender domain he owns (or picks a forwarding service instead).
- [ ] About picture: Wisnu is choosing a replacement render — blocked until he sends it.
- [ ] Fill Personal with real projects once they exist.
- [ ] Confirm Pertamina Kartini is 2025 — the year was read from the "68" Pertamina anniversary emblem on its screen, not from Wisnu.
- [ ] Confirm the SAMSUNG Project write-up: the two 2020 TV & AV interiors carry no visible branding, so their campaign name and year come only from Wisnu's file names; the foyer render shows no screen at all.
- [ ] Confirm the Pertamina write-up is accurate: role "3D Artist" and the paragraph text.
- [ ] Confirm the Indofood write-up: software list (3ds Max 2018, V-Ray, Photoshop, CorelDRAW) and role "3D Artist" were copied from the Pertamina entry, not told by Wisnu; the "20 x 20 m" size and PRJ 2018 date come from his message.
- [ ] Confirm the Injourney write-up: years 2024–2026 and the "Booth Exhibition Sub Holding", "Sahakarya" and "Gandrung Sewu / UMKM" names come from Wisnu's messages and file names — none of the 2026 renders show a logo; software list and role "3D Artist" were copied from the Pertamina entry, not told by Wisnu.

## Ideas (ready)
- [ ] Hourly limit on "Generate brief" too, so nobody can burn AI credits by spamming the button.
