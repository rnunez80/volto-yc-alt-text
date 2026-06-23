# volto-yc-alt-text

## Introduction

This addon was created to improve website accessibility and save content editors time by automatically generating descriptive alt texts for images upon upload.

Originally based on `volto-gemini-alt-text` (which made direct frontend calls to the Gemini API), `volto-yc-alt-text` was created to offload the AI integration to the Plone backend. By sending the image to the `@alt_text_generator` backend endpoint, we keep API keys secure, centralize authentication, and allow the backend to orchestrate the AI generation via an n8n webhook. 

The addon automatically shrinks images client-side before sending them to the backend, retrieves an AI-generated title and description, and saves the detailed description to the image's `alt` attribute.

## Usage

This addon uses the `@alt_text_generator` endpoint on your Plone Backend, which in turn forwards the request to an n8n webhook. 
The backend is responsible for all token authorization, so no frontend environment variables are needed for authentication.

## Requirements

For this addon to function properly, your Plone backend **must** implement the `@alt_text_generator` endpoint.

### Backend Endpoint Specification:
- **Path:** `/++api++/@alt_text_generator` (relative to the context or site root)
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Payload:**
  - `context` (string): The title of the page/context where the image is being uploaded.
  - `image` (file): The binary image file, resized by the frontend to be < 1MB.

### Expected Backend JSON Responses:
- **Success:**
  ```json
  {
    "@id": "...",
    "data": {
      "title": "A short 30-60 character alt text",
      "description": "A longer 50-160 character description"
    }
  }
  ```
- **Error:**
  ```json
  {
    "@id": "...",
    "error": "Authentication required / context not provided / etc."
  }
  ```

## Installation

To install your project, you must choose the method appropriate to your version of Volto.

### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon volto-yc-alt-text
cd my-volto-project
```

Add `volto-yc-alt-text`to your package.json:

```JSON
"addons": [
    "volto-yc-alt-text"
],

"dependencies": {
    "volto-yc-alt-text": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start Volto with:

```
yarn start
```
