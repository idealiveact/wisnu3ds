import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getProject, byCategory } from "@/data/projects";
import { pageHead } from "@/lib/seo";

const pad = (n: number) => String(n).padStart(2, "0");


export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Project not found — Wisnu Kesuma" }, { name: "robots", content: "noindex" }] };
    return pageHead({
      title: `${p.title} — Wisnu Kesuma | 3D Designer`,
      description: p.summary,
      path: `/projects/${p.slug}`,
      image: p.shareImage,
      imageAlt: `${p.title} (${p.year}) — ${p.gallery[0]?.title ?? p.title}`,
      type: "article",
    });
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-foreground">Project not found.</div>
  ),
});

function ProjectPage() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug);
  if (!p) throw notFound();
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
        <div className="space-y-5">
          {p.description.split("\n\n").map((para, k) => (
            <p key={k} className="text-lg leading-relaxed text-muted-foreground md:text-2xl">{para}</p>
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-14 px-6 md:px-10">
        {p.gallery.map((item, k) => (
          <figure key={item.src + k}>
            <img
              src={item.src}
              alt={`${item.title}, ${item.year}`}
              width={item.width}
              height={item.height}
              loading={k === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-auto w-full rounded-sm bg-muted"
            />
            <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border pt-4">
              <span className="font-display text-2xl font-bold leading-tight text-foreground md:text-4xl">
                <span className="mr-3 text-base font-bold text-primary md:text-xl">{pad(k + 1)}</span>
                {item.title}
              </span>
              <span className="eyebrow shrink-0 pt-1">{item.year}</span>
            </figcaption>
            {item.caption && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">{item.caption}</p>
            )}
          </figure>
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
