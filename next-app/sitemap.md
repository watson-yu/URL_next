# Site Map

## Home Page
- `/` - Main landing page

## Type-based Routes (V Routes)
- `/home/v/:type` - Type listing page
  - `/home/v/hair_salon`
  - `/home/v/beauty_salon`
  - `/home/v/barbershop`
  - `/home/v/nail_salon`

### City Level
- `/home/v/:type/:city` - City listing page
  - Example: `/home/v/hair_salon/taipei`

### District Level
- `/home/v/:type/:city/:district` - District listing page
  - Example: `/home/v/hair_salon/taipei/xinyi`

## Service-based Routes (T Routes)
### City Level
- `/home/t/:service/:city` - Service in city
  - Example: `/home/t/womens_haircut/taipei`

### District Level
- `/home/t/:service/:city/:district` - Service in district
  - Example: `/home/t/womens_haircut/taipei/xinyi`

## Business Details
- `/home/:type/:city/:district/:businessId` - Individual business page
  - Example: `/home/hair_salon/taipei/xinyi/123`

## Legacy Routes (Redirects)
- `/home/:type` → `/home/v/:type`
- `/home/:type/:city` → `/home/v/:type/:city` or `/home/t/:service/:city`
- `/home/:type/:city/:district` → `/home/v/:type/:city/:district` or `/home/t/:service/:city/:district`
- `/home/t/:type/:service/:city` → `/home/t/:service/:city`
- `/home/t/:type/:service/:city/:district` → `/home/t/:service/:city/:district` 