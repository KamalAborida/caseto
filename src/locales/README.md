# Internationalization (i18n) Setup

This project uses `i18next` and `react-i18next` for internationalization.

## Supported Languages

- **English (en)** - Default language
- **Italian (it)**

## Project Structure

```
src/
├── i18n.ts                          # i18n configuration
├── hooks/
│   └── useTranslation.ts            # Custom hook for translations
├── locales/
│   ├── en/
│   │   └── translation.json         # English translations
│   └── it/
│       └── translation.json         # Italian translations
└── components/
    └── LanguageSwitcher/            # Example language switcher component
```

## Usage

### 1. Using translations in components

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();

  return <div>{t('Welcome')}</div>;
};
```

### 2. Changing language

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { changeLanguage } = useTranslation();

  return (
    <button onClick={() => changeLanguage('it')}>
      Switch to Italian
    </button>
  );
};
```

### 3. Getting current language

```tsx
import { useTranslation } from '../../hooks/useTranslation';

const MyComponent = () => {
  const { i18n } = useTranslation();
  
  console.log(i18n.language); // Current language code
  
  return null;
};
```

## Adding New Translations

1. Add the key-value pair to both language files:
   - `src/locales/en/translation.json`
   - `src/locales/it/translation.json`

2. Use the translation key in your component:
   ```tsx
   {t('yourNewKey')}
   ```

## Example Component

See `src/components/LanguageSwitcher/LanguageSwitcher.tsx` for a complete example of a language switcher component.

## Current Translations

- `login` - Login / Accedi
- `Welcome` - Welcome / Benvenuto
- `Loading` - Loading / Caricamento

