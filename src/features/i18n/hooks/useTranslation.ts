import { useI18n } from '../context/I18nProvider';

export function useTranslation() {
  const { t, lang, setLang } = useI18n();
  return { t, lang, setLang };
}
