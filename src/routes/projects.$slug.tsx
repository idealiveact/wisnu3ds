import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getProject, byCategory } from "@/data/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    const t = p ? `${p.title} — Rhea Voss 3D` : "Project not found";
    return {
      meta: [
        { title: t },
        { name: "description", content: p?.summary ?? "" },
        { property: "og:title", content: t },
        { property: "og:description", content: p?.summary ?? "" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">Project not found.</div>
  ),
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const cat = categories[p.category];
  const list = byCategory(p.category);
  const next = list[(list.findIndex((x) => x.slug === p.slug) + 1) % list.length];

  return (
    <article className="pt-28">
      <div className="px-6 md:px-10">
        <Link to={cat.path} className="eyebrow">← {cat.label}</Link>
        <h1 className="fade-up mt-4 font-display text-5xl font-bold leading-[0.95] text-foreground md:text-8xl">{p.title}</h1>
      </div>

      <div className="mt-10 grid gap-10 px-6 md:grid-cols-[1fr_2fr] md:px-10">
        <dl className="grid grid-cols-2 gap-6 self-start border-t border-border pt-6 md:grid-cols-1">
          {[["Year", p.year], ["Client", p.client], ["Role", p.role], ["Software", p.software.join(", ")]].map(([k, v]) => (
            <div key={k}><dt className="eyebrow">{k}</dt><dd className="mt-1 text-foreground">{v}</dd></div>
          ))}
        </dl>
        <p className="text-lg leading-relaxed text-muted-foreground md:text-2xl">{p.description}</p>
      </div>

      <div className="mt-16 grid gap-4 px-6 md:px-10">
        {p.gallery.map((src, k) => (
          <img key={k} src={src} alt={`${p.title} ${k + 1}`} width={1600} height={1008} loading={k === 0 ? "eager" : "lazy"} decoding="async" className="w-full rounded-sm bg-muted object-cover" />
        ))}
      </div>

      {next && next.slug !== p.slug && (
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="group mt-20 block border-t border-border px-6 py-16 md:px-10">
          <p className="eyebrow">Next project</p>
          <p className="mt-3 font-display text-4xl font-bold text-foreground transition-colors group-hover:text-primary md:text-7xl">{next.title} →</p>
        </Link>
      )}
    </article>
  );
}
