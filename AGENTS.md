<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Portfolio projects live in src/data/projects.ts; category pages and detail pages derive from it so new projects need only a data entry.
- Gallery uses one CSS square grid with edge-anchored hover previews, preserving cell positions while previews grow; its shared dialog fills the viewport for photos and films.
- Mount LiquidCursor once in the shared root; keep its filter bounded, animation outside React state, and disabled for touch/reduced motion so the decorative trail never blocks navigation.
- Work uses native scroll-snap with vertical scrolling below 768px and horizontal scrolling otherwise; align navigation and centering to the current axis, and load only covers to avoid gallery downloads.
- Homepage and project SEO use src/lib/seo.ts with leaf-only canonicals and project shareImage renditions of the displayed cover at 1200×630, keeping metadata aligned with project data.
- Contact-page briefs are saved to the brief_requests table only through the sendBrief server function using the service-role client; the table has RLS on with no public policies, because visitors must never read other clients' briefs.
- Brief form rules live in src/lib/brief.schema.ts and are shared by the browser form and the server function, so client feedback and server checks never drift apart.
- The private /briefs page lives under the _authenticated layout; access is decided by the admin row in user_roles (granted by a trigger only to the owner's confirmed email), checked server-side with has_role, because sign-up is open and any account must otherwise see nothing.

- Serve smaller full-resolution WebP renditions from src/assets/optimized when available; retain original asset pointers and video files so photo compression stays reversible and never alters films.
- Home wayfinding uses a schematic SVG with native route links, not a geographic map SDK; this keeps the six-section navigation interactive without extra media or network requests.
