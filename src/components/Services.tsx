import { services, stack } from "#/content/site";
import { SectionHead } from "./SectionHead";

export function Services() {
  return (
    <section id="services" className="gutter pb-[clamp(6rem,14vw,12rem)]">
      <SectionHead index="03" label="Services" aside={`${services.length} disciplines`} />

      <ol className="mt-10 md:mt-16">
        {services.map((service, i) => (
          <li key={service.title} className="group relative border-b border-line first:border-t">
            {/* Ink panel that rises behind the row on hover. */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
            />
            <div className="relative grid gap-y-5 py-8 transition-colors duration-500 group-hover:text-paper md:grid-cols-12 md:items-end md:gap-x-6 md:py-12">
              <span className="label text-mute transition-colors group-hover:text-mute-dark md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display text-[clamp(3rem,7.2vw,7.5rem)] transition-transform duration-700 ease-out-expo md:col-span-7 md:group-hover:translate-x-4">
                {service.title}
              </h3>
              <div className="md:col-span-4">
                <p className="label mb-3 text-signal">{service.platforms}</p>
                <p className="max-w-[44ch] font-mono text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="label mt-5 flex flex-wrap gap-x-4 gap-y-1 text-mute transition-colors group-hover:text-mute-dark">
                  {service.tools.map((tool) => (
                    <li key={tool}>/{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Toolchain index */}
      <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
        <div className="md:col-span-4">
          <h3 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none font-[560] tracking-[-0.04em]">
            The <em className="font-serif font-normal italic">toolchain</em>
          </h3>
          <p className="mt-4 max-w-[34ch] font-mono text-sm leading-relaxed text-mute">
            The languages, frameworks and services I reach for to ship products end to end.
          </p>
        </div>
        <table className="w-full min-w-0 border-collapse md:col-span-8">
          <tbody>
            {stack.map((row) => (
              <tr key={row.group} className="border-t border-line align-baseline last:border-b">
                <th scope="row" className="label w-[26%] py-4 pr-4 text-left font-normal text-mute">
                  {row.group}
                </th>
                <td className="py-4 text-[clamp(1.05rem,1.6vw,1.35rem)] tracking-tight">
                  {row.items.map((item, i) => (
                    <span key={item}>
                      {item}
                      {i < row.items.length - 1 && <span className="px-2 text-mute">/</span>}{" "}
                    </span>
                  ))}
                </td>
                <td className="label hidden py-4 text-right text-mute sm:table-cell">
                  {String(row.items.length).padStart(2, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
