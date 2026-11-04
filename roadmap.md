# Roadmap

## Done
- [x] Homepage and project-specific SEO: titles, descriptions, self-referencing URLs and optimized cover previews.
- [x] Identity swap: name "Wisnu Kesuma", email wisnu3ds@gmail.com across nav, hero, titles, Contact.
- [x] Project Pertamina (2021–2026) in Work: umbrella entry with expanded English write-up, ten labelled gallery renders in year order (HUT ke-64 x3 2021, TSS Virtual 2022, PIS Independence Day display 2023, Java Jazz Festival booth 2024, Keroncong pavilion + Ecorun Fest booth + Kartini stage 2025, Pasar Rakyat main stage 2026).
- [x] SAMSUNG Project (2015–2020) in Work: umbrella entry renamed from "Samsung Galaxy Note20 Virtual Booth", now holding nine labelled renders in year order (Jember Fashion Carnaval booth 2015, digital-dealer mini booth 2017, Galaxy Note8 "Do bigger things" photo experience 2017, House of Screens showroom building 2018, Note20 virtual booth x3 2020, TV & AV lifestyle interiors x2 2020). Old /projects/samsung-note20-virtual-booth URL redirects to /projects/samsung.
- [x] Slideshow text made readable over bright renders (stronger top/bottom overlay, accent label, soft text shadow).
- [x] Contact links: LinkedIn, Gmail, Instagram, Behance and YouTube @wisnu3ds.
- [x] Menu restructured: Work, Gallery Photo, Personal, About, Contact. Technical Art removed (old /technical-art URL redirects to /work); its two example projects deleted.
- [x] Gallery Photo page created, empty until Wisnu's own photos are added (data in src/data/gallery.ts).
- [x] Personal page emptied with a "coming soon" message; its two example projects deleted.
- [x] Homepage opening picture: Wisnu's Samsung Galaxy activation render (with costumed performers), plus a matching 1200×630 share preview; overlay strengthened so the wording stays readable on phone and desktop.
- [x] About picture removed; the page now reads as one centered column until Wisnu picks a new image.
- [x] About bio, two-group toolset (Software / AI) and profile header.
- [x] Contact: AI project-brief assistant (client notes → structured brief).
- [x] "Send to Wisnu" sends the brief straight to Wisnu without opening a mail app: asks the client's reply email (+ optional WhatsApp), saves every brief in the site's backend, shows sending / sent / error states, limits each address to 3 briefs an hour and quietly ignores spam bots.
- [x] Private Briefs page (/briefs, Wisnu's account only) listing every brief with status and project-type filters and a status changer; clients now pick a project type when sending.
- [x] Brief assistant given its own menu item "Start a Project" and its own page (/start-a-project); Contact keeps the email and social links plus a button pointing there.

- [x] Gallery Photo opened with its first photo: the Pertamina International Shipping Independence Day lobby display, labelled with name, date (August 2023) and a short note. Entries live in src/data/gallery.ts; every entry must carry a name, a date and a note (checked by src/test/gallery.test.ts).

## Open
- [ ] Wisnu must create his account at /auth with wisnu3ds@gmail.com and confirm it before /briefs shows anything.
- [ ] Inbox email to wisnu3ds@gmail.com for each new brief — blocked until Wisnu sets up an email sender domain he owns (or picks a forwarding service instead).
- [ ] About picture: Wisnu is choosing a replacement render — blocked until he sends it.
- [ ] Video from Wisnu: no video file arrived in the chat uploads, so the requested video review is blocked until he attaches it.

- [ ] Fill Personal with real projects once they exist.
- [ ] Confirm Pertamina Kartini is 2025 — the year was read from the "68" Pertamina anniversary emblem on its screen, not from Wisnu.
- [ ] Confirm the SAMSUNG Project write-up: the two 2020 TV & AV interiors carry no visible branding, so their campaign name and year come only from Wisnu's file names; the foyer render shows no screen at all. Also confirm House of Screens is 2018 — the render shows The Frame TVs but no printed year, so 2018 was inferred.
- [ ] Confirm the Pertamina write-up is accurate: role "3D Artist" and the paragraph text.

## Ideas (ready)
- [ ] Hourly limit on "Generate brief" too, so nobody can burn AI credits by spamming the button.
