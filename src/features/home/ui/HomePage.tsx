import { useTranslation } from '@/features/i18n/hooks/useTranslation';

export default function HomePage() {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="p-4">
      <div className="flex justify-end">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as 'es' | 'en')}
          className="border p-1"
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
      <h1 className="text-<2xl font-bold mt-4">{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
}
