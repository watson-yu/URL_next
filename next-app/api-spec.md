# Glow API Documentation

## Base URL
```
/glow
```

## Authentication
All endpoints require an API key to be passed in the request headers.

## Response Format
All endpoints return responses in the following JSON format:

```json
{
  "success": true|false,
  "data": {...} | [...] | null,
  "error": "Error message" (only if success: false)
}
```

## Endpoints

### Health Check
```
GET /health
```
Returns the API health status.

#### Response
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-18T12:00:00Z"
  }
}
```

### City Districts

#### List City Districts
```
GET /city-districts
```

Query Parameters:
- `country` (optional): Filter by country slug
- `city` (optional): Filter by city slug

#### Get District Details
```
GET /city-districts/:country/:city/:district
```

### Categories

#### List Categories
```
GET /categories
```

Query Parameters:
- `search` (optional): Search categories by name or slug

#### Get Category Details
```
GET /categories/:slug
```
Returns category details including associated treatments.

#### Create Category
```
POST /categories
```

Request Body:
```json
{
  "slug": "string",
  "display_name": "string"
}
```

### Treatments

#### List Treatments by Category
```
GET /categories/:categorySlug/treatments
```

#### Get Treatment Details
```
GET /categories/:categorySlug/treatments/:slug
```

#### Create Treatment
```
POST /categories/:categorySlug/treatments
```

Request Body:
```json
{
  "treatment": "string",
  "slug": "string",
  "description": "string"
}
```

### Businesses

#### List Businesses
```
GET /businesses
```

Query Parameters:
- `type` (optional): Filter by category slug
- `country` (optional): Filter by country slug
- `city` (optional): Filter by city slug
- `district` (optional): Filter by district slug
- `service` (optional): Filter by treatment slug
- `limit` (optional, default: 20): Number of results to return
- `offset` (optional, default: 0): Number of results to skip

#### Get Business Details
```
GET /businesses/:id
```

#### Create Business
```
POST /businesses
```

Request Body:
```json
{
  "name": "string",
  "type": "string (category slug)",
  "location": {
    "country_slug": "string",
    "city_slug": "string",
    "district_slug": "string"
  },
  "services": ["treatment_slug"]
}
```

#### Update Business
```
PUT /businesses/:id
```

Request Body:
```json
{
  "name": "string (optional)",
  "location": {
    "country_slug": "string",
    "city_slug": "string",
    "district_slug": "string"
  } (optional),
  "services": ["treatment_slug"] (optional)
}
```

#### List Featured Businesses
```
GET /businesses/featured
```

Query Parameters:
- `limit` (optional): Number of featured businesses to return

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses include an error message in the response body:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Data Models

### Business
```json
{
  "id": "number",
  "name": "string",
  "type": "string (category slug)",
  "country": "string",
  "city": "string",
  "district": "string",
  "country_slug": "string",
  "city_slug": "string",
  "district_slug": "string",
  "created_at": "string (ISO date)",
  "updated_at": "string (ISO date)",
  "services": ["string (treatment slug)"]
}
```

### Category
```json
{
  "id": "number",
  "slug": "string",
  "display_name": "string",
  "treatments": [
    {
      "id": "number",
      "treatment": "string",
      "slug": "string",
      "description": "string"
    }
  ]
}
```

### Treatment
```json
{
  "id": "number",
  "treatment": "string",
  "slug": "string",
  "description": "string",
  "category_name": "string",
  "category_slug": "string"
}
```

### City District
```json
{
  "id": "number",
  "country": "string",
  "city": "string",
  "district": "string",
  "country_slug": "string",
  "city_slug": "string",
  "district_slug": "string"
}
```
