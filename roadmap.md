# Hair Services Directory - Technical Roadmap

## 1. Project Overview
A directory website for hair and beauty services, allowing users to browse services by type, location, and specific services.

### Core Features
- Browse by business type (Hair Salon, Beauty Salon, etc.)
- Browse by location (City and District)
- Browse by specific services
- Consistent navigation with breadcrumbs
- Responsive design for all screen sizes

## 2. URL Structure

### Type-based Routes (V Routes)
- `/home/v/:type` - Business type listing
- `/home/v/:type/:city` - City-specific business type listing
- `/home/v/:type/:city/:district` - District-specific business type listing

### Service-based Routes (T Routes)
- `/home/t/:service/:city` - Service in city listing
- `/home/t/:service/:city/:district` - Service in district listing

### Business Detail Route
- `/home/:type/:city/:district/:businessId` - Individual business details

## 3. Data Structure

### Services (`services.js`)
```javascript
{
  types: {
    [typeKey]: {
      displayName: string,
      services: string[]
    }
  }
}
```

### Locations (`locations.js`)
```javascript
{
  countries: {
    [countryName]: {
      cities: {
        [cityName]: {
          districts: string[]
        }
      }
    }
  }
}
```

### Businesses (`businesses.js`)
```javascript
{
  id: number,
  name: string,
  type: string,
  services: string[],
  location: {
    country: string,
    city: string,
    district: string
  }
}
```

## 4. Page Components

### HomePage
- Components:
  - SearchBar
  - TypeButtons (Business type selection)
  - BusinessGrid
  - CitySearch (Horizontal scrolling city sections)
- Logic:
  - Display all business types
  - Display featured businesses
  - Allow search by city and service

### TypePage
- Components:
  - SearchBar
  - Breadcrumbs
  - CityButtons (Available cities for this type)
  - BusinessGrid
  - OtherTypeButtons
  - CitySearch
- Logic:
  - Display businesses of selected type
  - Allow navigation to cities
  - Show other available business types

### CityPage
- Components:
  - SearchBar
  - Breadcrumbs
  - ServiceButtons (Including type)
  - BusinessGrid
  - OtherTypeButtons
  - DistrictButtons
- Logic:
  - Display businesses in selected city
  - Allow service selection
  - Show available districts

### DistrictPage
- Components:
  - SearchBar
  - Breadcrumbs
  - ServiceButtons (Including type)
  - BusinessGrid
  - OtherTypeButtons
  - OtherDistrictButtons
- Logic:
  - Display businesses in selected district
  - Allow service selection
  - Show other districts

### ServiceCityPage
- Components:
  - SearchBar
  - Breadcrumbs
  - ServiceButtons (Current service first)
  - BusinessGrid
  - OtherTypeButtons
  - DistrictButtons
- Logic:
  - Display service-specific businesses in city
  - Allow other service selection
  - Show available districts

### ServiceDistrictPage
- Components:
  - SearchBar
  - Breadcrumbs
  - ServiceButtons (Current service first)
  - BusinessGrid
  - OtherTypeButtons
  - OtherDistrictButtons
- Logic:
  - Display service-specific businesses in district
  - Allow other service selection
  - Show other districts

## 5. Shared Components

### SearchBar
- Features:
  - Autocomplete suggestions
  - Type/service/location combinations
  - Dynamic result filtering
- Props: None
- State: Current input value

### Breadcrumbs
- Features:
  - Display current navigation path
  - Clickable navigation links
  - Display/actual path separation
- Props:
  - items: Array of breadcrumb items
  - Each item: { label, path, actualPath }

### BusinessGrid
- Features:
  - Responsive grid layout
  - Pagination ("Show More" button)
  - Empty state handling
- Props:
  - businesses: Array of business objects
- Constants:
  - PAGE_SIZE: Number of items per page

### BusinessCard
- Features:
  - Display business information
  - Click navigation to detail
  - Error handling for invalid data
- Props:
  - business: Business object

## 6. Utilities

### routes.js
- Path generation functions
- Location validation
- Route parameter handling

### format.js
- Text formatting utilities
- URL-safe string conversion
- Display text formatting

## 7. Theme System
- Mantine UI theme configuration
- Global color scheme
- Component default props
- Responsive breakpoints

## 8. Key Constants
- PAGE_SIZE: 4 (businesses per page)
- MAX_SUGGESTIONS: 5 (search suggestions)
- URL_PATTERNS: Route pattern definitions
- LEVELS: Navigation level definitions

## 9. Implementation Requirements

### Core Dependencies
- React
- React Router
- Mantine UI
- Vite (build tool)

### Browser Support
- Modern browsers
- Mobile responsive design
- Touch-friendly interface

### Performance Considerations
- Lazy loading for routes
- Efficient data structures
- Optimized search suggestions

### SEO Requirements
- Semantic HTML
- Meaningful page titles
- Clear URL structure

## 10. Extension Points
- Add new business types in services.js
- Add new locations in locations.js
- Add new services to existing types
- Customize theme in App.jsx

## 11. Development Guidelines
- Use 2 spaces for indentation
- Follow React best practices
- Maintain component modularity
- Document complex logic
- Handle all error cases
