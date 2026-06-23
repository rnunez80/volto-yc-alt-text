class describeImage {
  /**
   * Describe an image using the Plone backend endpoint.
   * @param {File} image - The image file object.
   * @param {string} [siteTitle] - Optional site/navroot title for context.
   * @returns {Promise<{title: string, description: string}>} - A promise resolving to the description of the image.
   */
  async processImage(image, siteTitle) {
    try {
      // Resize image to ensure it is under 1MB (using max 1000px and 0.8 jpeg quality)
      const resizedImage = await this.resizeFile(image);

      const formData = new FormData();
      formData.append('context', siteTitle || '');
      formData.append('image', resizedImage);

      const response = await fetch('/++api++/@alt_text_generator', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Backend Error: ${result.error}`);
      }
      
      const data = result.data || {};
      return {
        title: data.title || '',
        description: data.description || ''
      };
    } catch (error) {
      console.error('Error processing image via webhook:', error);
      throw error;
    }
  }

  /**
   * Resize an image file using the browser Canvas API to keep it well under 1MB.
   * @param {File} file - The image file to resize.
   * @returns {Promise<File>} - A new File object with the resized image.
   */
  resizeFile(file) {
    return new Promise((resolve, reject) => {
      const maxSize = 1000;
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name || 'image.jpg', { type: 'image/jpeg' }));
          }, 'image/jpeg', 0.8);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export default describeImage;
