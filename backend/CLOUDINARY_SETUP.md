# Cloudinary Image Upload Setup Guide

This guide will help you set up Cloudinary for image uploads in the PowerMed backend.

## Prerequisites

1. A Cloudinary account (free tier available at [cloudinary.com](https://cloudinary.com))
2. Node.js backend with dependencies installed

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (no credit card required)
3. After signing up, you'll be taken to your dashboard

## Step 2: Get Your Cloudinary Credentials

1. In your Cloudinary dashboard, you'll see your account details
2. Copy the following information:
   - **Cloud Name** (e.g., `your-cloud-name`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

   These are visible in the dashboard under "Account Details" or "API Environment Variable" section.

## Step 3: Add Credentials to Environment Variables

Add the following to your `.env` file in the `backend/` directory:

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

**Important:** 
- Replace the placeholder values with your actual Cloudinary credentials
- Never commit your `.env` file to version control
- The `.env` file should already be in `.gitignore`

## Step 4: Verify Installation

The Cloudinary packages should already be installed. If not, run:

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

## How It Works

### Image Upload Flow

1. **Client Upload**: The client sends a POST/PUT request with `multipart/form-data` containing the image file
2. **Middleware Processing**: The `uploadSingle` middleware processes the file using Multer and Cloudinary
3. **Cloudinary Upload**: The image is automatically uploaded to Cloudinary with:
   - Folder: `powermed`
   - Max dimensions: 1200x1200px (with auto-cropping)
   - Auto quality optimization
   - Max file size: 5MB
4. **URL Storage**: The Cloudinary URL is stored in the database

### Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### API Endpoints

#### Products

**Create Product with Image:**
```bash
POST /api/products
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
- name: string (required)
- price: number (required)
- category: ObjectId (required)
- details: string (optional)
- image: file (optional - image file)
```

**Update Product Image:**
```bash
PUT /api/products/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
- name: string (optional)
- price: number (optional)
- category: ObjectId (optional)
- details: string (optional)
- image: file (optional - new image file)
```

**Note:** When updating, if a new image is uploaded, the old image is automatically deleted from Cloudinary.

#### Categories

**Create Category with Image:**
```bash
POST /api/categories
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
- name: string (required)
- type: string (optional)
- description: string (optional)
- slug: string (optional)
- image: file (optional - image file)
- order: number (optional)
- isActive: boolean (optional)
```

**Update Category Image:**
```bash
PUT /api/categories/:id
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
- name: string (optional)
- type: string (optional)
- description: string (optional)
- slug: string (optional)
- image: file (optional - new image file)
- order: number (optional)
- isActive: boolean (optional)
```

### Frontend Example (Using FormData)

```javascript
// Example: Create product with image
const formData = new FormData();
formData.append('name', 'Product Name');
formData.append('price', '99.99');
formData.append('category', categoryId);
formData.append('details', 'Product details');
formData.append('image', imageFile); // File object from input

const response = await fetch('http://localhost:5001/api/products', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
    // Don't set Content-Type header - browser will set it with boundary
  },
  body: formData
});
```

### Image Deletion

When you delete a product or category:
- The associated image is automatically deleted from Cloudinary
- This prevents orphaned images and saves storage space

## Error Handling

### Common Errors

1. **File too large**: Maximum file size is 5MB
   - Error: `File too large. Maximum size is 5MB.`
   - Solution: Compress or resize the image before uploading

2. **Invalid file type**: Only image files are allowed
   - Error: `Only image files are allowed!`
   - Solution: Use JPEG, PNG, GIF, or WebP formats

3. **Missing Cloudinary credentials**: Environment variables not set
   - Error: Cloudinary configuration error
   - Solution: Check your `.env` file has all three Cloudinary variables

4. **Upload validation failure**: Required fields missing
   - Error: Validation error message
   - Solution: The uploaded file is automatically cleaned up from Cloudinary

## Testing

### Using cURL

```bash
# Create a product with image
curl -X POST http://localhost:5001/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "name=Test Product" \
  -F "price=29.99" \
  -F "category=CATEGORY_ID" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman

1. Set method to POST/PUT
2. Go to "Body" tab
3. Select "form-data"
4. Add text fields (name, price, etc.)
5. Add file field with key "image"
6. Select your image file
7. Set Authorization header with Bearer token
8. Send request

## Cloudinary Dashboard

You can view all uploaded images in your Cloudinary dashboard:
- Go to [https://cloudinary.com/console](https://cloudinary.com/console)
- Navigate to "Media Library"
- All images will be in the `powermed` folder

## Best Practices

1. **Image Optimization**: Images are automatically optimized by Cloudinary
2. **Responsive Images**: Use Cloudinary's transformation URLs for different sizes
3. **Error Handling**: Always handle upload errors in your frontend
4. **Validation**: Validate file size and type on the frontend before upload
5. **Storage Management**: Old images are automatically deleted when updating/deleting items

## Troubleshooting

### Images not uploading

1. Check Cloudinary credentials in `.env`
2. Verify the file size is under 5MB
3. Check file format is supported
4. Ensure the request uses `multipart/form-data`
5. Check server logs for error messages

### Images uploading but URL not saved

1. Check database connection
2. Verify the route handler is receiving the file (`req.file`)
3. Check server logs for validation errors

### Old images not being deleted

1. Check if the image URL contains `cloudinary.com`
2. Verify the deleteImage function is being called
3. Check Cloudinary API credentials have delete permissions

## Security Notes

- Never expose your `CLOUDINARY_API_SECRET` in client-side code
- Use environment variables for all sensitive credentials
- The API secret is only used server-side
- Free tier includes basic security features

## Support

For more information:
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Multer Documentation](https://github.com/expressjs/multer)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)

