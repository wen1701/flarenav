# FlareNav
[FlareNav](https://flarenav.com/) is a open source tool to help you find the best tools for your needs. you can use this to make your own tool list.

## Features

- [x] i18n (ten languages)
- [x] Json data support
- [x] Markdown support
- [x] SEO friendly (use `ssr`)
- [x] google sign in (use `supabase`)
- [x] google adsense config
- [x] google analytics config
- [ ] admin dashboard
- [ ] dark theme
- [ ] ...

## Getting Started

step1: install dependencies
```shellscript
npm install
```

step2: copy `.env.example` to `.env`

```shellscript
cp .env.example .env
```

step3: config `.env`

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
GOOGLE_ANALYTICS_MEASUREMENT_ID=
GOOGLE_ADS_ACCOUNT=
ADMIN_PASSWORD=
```

step4: run the dev server

```shellscript
npm run dev
```


