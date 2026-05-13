import { AdminPageHeader } from '@/components/admin';

const settingsSections = [
  { title: 'Empresa', items: ['Nombre', 'Logo', 'Email', 'Teléfono', 'Dirección', 'Horario'] },
  {
    title: 'WhatsApp',
    items: [
      'Número principal',
      'Mensaje general',
      'Mensaje por material',
      'Mensaje por ambiente',
      'Mensaje de cotización rápida',
    ],
  },
  { title: 'Redes', items: ['Instagram', 'Facebook', 'TikTok opcional'] },
  { title: 'Footer', items: ['Texto descriptivo', 'Servicios', 'Links rápidos'] },
  { title: 'Marca', items: ['Colores principales', 'Logo actual', 'Acentos visuales'] },
];

export default function AdminSettingsPage() {
  return (
    <>
      <AdminPageHeader
        eyebrow="Sistema"
        title="Configuración"
        description="Centro de parámetros generales para empresa, WhatsApp, redes, footer e identidad visual. En Fase 2 estos campos se persistirán con base de datos y permisos."
      />
      <section className="grid gap-4 lg:grid-cols-2">
        {settingsSections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.5rem] border border-pietra-border bg-white p-6 shadow-card"
          >
            <h2 className="font-display text-3xl font-semibold text-pietra-ink">{section.title}</h2>
            <div className="mt-5 grid gap-3">
              {section.items.map((item) => (
                <label key={item} className="block">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-pietra-muted">
                    {item}
                  </span>
                  <div className="mt-2 rounded-2xl border border-pietra-border bg-pietra-cream px-4 py-3 text-sm text-pietra-muted">
                    Campo editable preparado
                  </div>
                </label>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
