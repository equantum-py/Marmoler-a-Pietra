import fs from 'node:fs';

const imageDir = 'public/images/catalogo';
const output = 'docs/supabase/import-pietra-catalog.sql';

const known = {
  'cuarzo-beige': ['cuarzo-beige', 'Cuarzo Beige', 'Cuarzo', 'Beige', true],
  'cuarzo-blanco-estelar': ['cuarzo-blanco-estelar', 'Cuarzo Blanco Estelar', 'Cuarzo', 'Blanco', true],
  'cuarzo-gris': ['cuarzo-gris', 'Cuarzo Gris', 'Cuarzo', 'Gris', true],
  'cuarzo-negro': ['cuarzo-negro', 'Cuarzo Negro', 'Cuarzo', 'Negro', true],
  'cuarzo-rojo': ['cuarzo-rojo', 'Cuarzo Rojo', 'Cuarzo', 'Rojo', false],
  'cuarzo-verde-claro': ['cuarzo-verde-claro', 'Cuarzo Verde Claro', 'Cuarzo', 'Verde claro', false],
  'granito-blanco-dallas': ['blanco-dallas', 'Blanco Dallas', 'Granito', 'Blanco', true],
  'granito-blanco-di-capri': ['blanco-di-capri', 'Blanco Di Capri', 'Granito', 'Blanco', true],
  'granito-blanco-itaunas': ['blanco-itaunas', 'Blanco Itaúnas', 'Granito', 'Blanco', true],
  'granito-cafe-imperial': ['cafe-imperial', 'Café Imperial', 'Granito', 'Café', true],
  'granito-gris-corumba': ['gris-corumba', 'Gris Corumbá', 'Granito', 'Gris', true],
  'granito-negro-san-gabriel': ['negro-san-gabriel', 'Negro San Gabriel', 'Granito', 'Negro', true],
  'granito-verde-ubatuba': ['verde-ubatuba', 'Verde Ubatuba', 'Granito', 'Verde oscuro', true],
  'marmol-blanco': ['marmol-blanco', 'Mármol Blanco', 'Mármol', 'Blanco', false],
  'marmol-travertino': ['marmol-travertino', 'Mármol Travertino', 'Mármol', 'Travertino', false],
  'marron-emperador': ['marron-emperador', 'Marrón Emperador', 'Mármol', 'Marrón', false],
  'neolith-calacatta': ['neolith-calacatta', 'Neolith Calacatta', 'Sinterizado', 'Blanco con vetas', true],
  'piedra-traslucida': ['piedra-traslucida', 'Piedra Traslúcida', 'Especial', 'Traslúcido', false],
};

function sql(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function cleanBase(file) {
  return file.replace(/\.(jpg|jpeg|png|webp|svg)$/i, '');
}

const allFiles = fs
  .readdirSync(imageDir)
  .filter((file) => /\.(jpg|jpeg|png|webp|svg)$/i.test(file));

const grouped = new Map();

for (const file of allFiles) {
  const base = cleanBase(file);
  const current = grouped.get(base);

  if (!current) {
    grouped.set(base, file);
    continue;
  }

  const currentIsSvg = /\.svg$/i.test(current);
  const newIsRaster = /\.(jpg|jpeg|png|webp)$/i.test(file);

  if (currentIsSvg && newIsRaster) {
    grouped.set(base, file);
  }
}

const files = [...grouped.values()].sort();

const rows = files.map((file, index) => {
  const base = cleanBase(file);
  const mapped = known[base];

  if (!mapped) {
    throw new Error(`Material sin mapeo: ${file}`);
  }

  const [slug, name, category, color, featured] = mapped;
  const imagePath = `/images/catalogo/${file}`;

  const shortDescription = `${name} para mesadas, cocinas, baños y superficies a medida.`;
  const longDescription = `${name} es una opción de ${category.toLowerCase()} seleccionada para proyectos residenciales y comerciales que buscan buena presencia visual, resistencia y terminación profesional.`;
  const recommendedUse = 'Cocinas, baños, mesadas, barras, quinchos y revestimientos.';
  const resistance = category === 'Mármol' ? 'Uso decorativo interior con cuidado adecuado.' : 'Alta resistencia para uso residencial y comercial.';
  const maintenance = 'Limpieza con paño húmedo y productos neutros.';
  const whatsappMessage = `Hola Pietra, quiero cotizar el material ${name}. ¿Me pueden asesorar?`;
  const seoTitle = `${name} para mesadas y superficies | Marmolería Pietra`;
  const seoDescription = `Cotizá ${name} para cocinas, baños, mesadas y superficies a medida con Marmolería Pietra.`;

  return `(
  ${sql(slug)},
  ${sql(name)},
  ${sql(category)},
  'published',
  ${featured ? 'true' : 'false'},
  ${index + 1},
  ${sql(imagePath)},
  ${sql(shortDescription)},
  ${sql(longDescription)},
  ${sql(color)},
  'Pulido',
  ${sql(recommendedUse)},
  ${sql(resistance)},
  ${sql(maintenance)},
  ${sql(whatsappMessage)},
  ${sql(seoTitle)},
  ${sql(seoDescription)}
)`;
});

const content = `create unique index if not exists materials_slug_key on public.materials(slug);

insert into public.materials (
  slug,
  name,
  category,
  status,
  featured,
  sort_order,
  main_image,
  short_description,
  long_description,
  color,
  finish,
  recommended_use,
  resistance,
  maintenance,
  whatsapp_message,
  seo_title,
  seo_description
)
values
${rows.join(',\n')}
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  status = excluded.status,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  main_image = excluded.main_image,
  short_description = excluded.short_description,
  long_description = excluded.long_description,
  color = excluded.color,
  finish = excluded.finish,
  recommended_use = excluded.recommended_use,
  resistance = excluded.resistance,
  maintenance = excluded.maintenance,
  whatsapp_message = excluded.whatsapp_message,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  updated_at = now();
`;

fs.writeFileSync(output, content);

console.log(`SQL generado en ${output}`);
console.log(`Materiales detectados: ${files.length}`);
console.log(files.join('\n'));
