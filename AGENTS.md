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
- Homepage and project SEO use src/lib/seo.ts with leaf-only canonicals and project shareImage renditions of the displayed cover at 1200×630, keeping metadata aligned with project data.
- Contact-page briefs are saved to the brief_requests table only through the sendBrief server function using the service-role client; the table has RLS on with no public policies, because visitors must never read other clients' briefs.
- Brief form rules live in src/lib/brief.schema.ts and are shared by the browser form and the server function, so client feedback and server checks never drift apart.
