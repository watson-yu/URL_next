# Glow API Specification

## Base URL
All endpoints are prefixed with `/glow` and require API key authentication.

## Authentication
All requests must include a valid API key. Authentication is handled by the `apiKeyMiddleware`.

## Response Format
All endpoints return JSON responses in the following format:

```json
{
  "success": boolean,
  "data": object | array | null,
  "error": string (only present on error)
}
```

## Endpoints

### City Districts

#### Get City Districts
`GET /glow/city-districts`

Retrieves a list of city districts, optionally filtered by country and city.

**Query Parameters:**
- `country` (optional): Country slug to filter districts
- `city` (optional): City slug to filter districts

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "country": "string",
      "city": "string",
      "district": "string",
      "country_slug": "string",
      "city_slug": "string",
      "district_slug": "string"
    }
  ]
}
```

#### Get Specific District
`GET /glow/city-districts/:country/:city/:district`

Retrieves details for a specific district.

**Path Parameters:**
- `country`: Country slug
- `city`: City slug
- `district`: District slug

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "country": "string",
    "city": "string",
    "district": "string",
    "country_slug": "string",
    "city_slug": "string",
    "district_slug": "string"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "District not found"
}
```

### Categories

#### List Categories
`GET /glow/categories`

Retrieves a list of all categories, with optional search filtering.

**Query Parameters:**
- `search` (optional): Search term to filter categories by name or slug

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "slug": "string",
      "display_name": "string"
    }
  ]
}
```

#### Get Category Details
`GET /glow/categories/:slug`

Retrieves details for a specific category, including associated treatments.

**Path Parameters:**
- `slug`: Category slug

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "number",
    "slug": "string",
    "display_name": "string",
    "treatments": [
      {
        "id": "number",
        "category_id": "number",
        "treatment": "string",
        "slug": "string",
        "description": "string",
        "category_name": "string",
        "category_slug": "string"
      }
    ]
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Category not found"
}
```

#### Create Category
`POST /glow/categories`

Creates a new category.

**Request Body:**
```json
{
  "slug": "string",
  "display_name": "string"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "number",
    "slug": "string",
    "display_name": "string"
  }
}
```

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### Treatments

#### List Treatments by Category
`GET /glow/categories/:categorySlug/treatments`

Retrieves all treatments for a specific category.

**Path Parameters:**
- `categorySlug`: Category slug

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "category_id": "number",
      "treatment": "string",
      "slug": "string",
      "description": "string",
      "category_name": "string",
      "category_slug": "string"
    }
  ]
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Category not found"
}
```

#### Get Treatment Details
`GET /glow/categories/:categorySlug/treatments/:slug`

Retrieves details for a specific treatment within a category.

**Path Parameters:**
- `categorySlug`: Category slug
- `slug`: Treatment slug

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "number",
    "category_id": "number",
    "treatment": "string",
    "slug": "string",
    "description": "string",
    "category_name": "string",
    "category_slug": "string"
  }
}
```

**Error Responses:**
- `404 Not Found` (Category not found)
- `404 Not Found` (Treatment not found)

#### Create Treatment
`POST /glow/categories/:categorySlug/treatments`

Creates a new treatment within a category.

**Path Parameters:**
- `categorySlug`: Category slug

**Request Body:**
```json
{
  "treatment": "string",
  "slug": "string",
  "description": "string"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "number",
    "category_id": "number",
    "treatment": "string",
    "slug": "string",
    "description": "string"
  }
}
```

**Error Responses:**
- `404 Not Found` (Category not found)
- `400 Bad Request` (Missing required fields)