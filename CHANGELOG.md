# Release Notes

## 0.3.0

- Added live caption preview in Image block Edit mode (`<figcaption className="image-caption">`) when the "Display alt text as caption" toggle is enabled.
- Volto 19 compatibility: Updated peerDependencies to support Volto 17, 18, and 19 (`>=17.0.0 || >=18.0.0-alpha.0 || >=19.0.0-alpha.0`).
- Modernized core helper imports from `@plone/volto/helpers`.
- Cleaned up build/runtime logging utilities for Node 20 / Volto 19.

## 0.2.4

- Fixed: uploading a lead/preview image when creating a News Item (or any content
  type with a `preview_image` field) no longer overwrites the item's title and
  description. The AI-generated text is now correctly applied only to the
  **Lead Image Caption** (`image_caption`) field.
- Fixed: uploading an image to a standalone `Image` content type continues to
  set the item's title and description as expected.
- Fixed: content types other than `Image` that have a direct `image` field now
  correctly receive `image_caption` from the AI description.

## 0.2.1

change model to 'gemini-1.5-flash', since previous model was deprecaded.

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/contributing/index.html?highlight=towncrier#change-log-entry
-->

<!-- towncrier release notes start -->
