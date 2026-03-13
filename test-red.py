from PIL import Image
import numpy as np
img = Image.open('hero-debug.png').convert('RGB')
arr = np.array(img)
# check for pure red pixels (red > 200, green < 50, blue < 50)
red_pixels = np.sum((arr[:, :, 0] > 200) & (arr[:, :, 1] < 50) & (arr[:, :, 2] < 50))
print(f"Number of red pixels: {red_pixels}")
