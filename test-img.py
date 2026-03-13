from PIL import Image
import numpy as np
img = Image.open('hero-debug.png').convert('RGB')
arr = np.array(img)[:500, :, :]
# check how many pixels are dark (sum < 100)
dark_pixels = np.sum(np.sum(arr, axis=2) < 100)
print(f"Top 500 rows have {dark_pixels} dark pixels out of {500 * 1200} total")
