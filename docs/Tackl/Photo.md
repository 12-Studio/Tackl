# Photo Component

A flexible image component for optimized and responsive images, supporting fixed sizing (`fixed`), fill mode (`fill`), custom aspect ratios, SEO attributes, and seamless integration with sources like Craft CMS GraphQL.

---

## Props

| Prop          | Type                  | Required                 | Description                                                                         |
| ------------- | --------------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `data`        | `PhotoDataProps`      | Yes                      | Image data object. See [PhotoDataProps structure](#photodataprops-structure) below. |
| `fixed`       | `boolean`             | No (req. for fixed size) | If `true`, displays image at `width` × `height` (in px).                            |
| `fill`        | `boolean`             | No                       | If `true`, image fills the container responsively in both width & height.           |
| `width`       | `number`              | Required if `fixed`      | Width in pixels (only applies when `fixed` is true).                                |
| `height`      | `number`              | Required if `fixed`      | Height in pixels (only applies when `fixed` is true).                               |
| `aspectRatio` | `number`              | No (default responsive)  | Manually override the aspect ratio for responsive images (width / height).          |
| `priority`    | `boolean`             | No                       | If `true`, loads the image eagerly (`loading="eager"`); else, lazy-loads.           |
| `className`   | `string`              | No                       | Custom class name.                                                                  |
| `style`       | `React.CSSProperties` | No                       | Custom styles.                                                                      |

---

## `PhotoDataProps` Structure

```ts
{
    id?: string;
    alt?: string;
    title?: string;
    url?: string;
    width?: number;
    height?: number;
    optimizedImages?: {
        src?: string;
        srcWebp?: string;
        srcset?: string;
        srcsetWebp?: string;
        maxSrcsetWidth?: number;
        placeholderBox?: string;
        placeholderImage?: string;
        placeholderSilhouette?: string;
    };
}
```

**Notes:**

- The component falls back to `data.url` if `optimizedImages.src` is missing.
- For SVGs, optimization is skipped and `url` is used directly.
- The `alt` prop is prioritized as: `data.alt` → `data.title` → `"Missing Alt Text"`.
- The `fill` prop makes the image fill its container, using 100% width and height.
- The `aspectRatio` prop allows manual override of the image aspect ratio (as `width / height`) for the responsive layout.
    - If not provided, the component infers aspect ratio from the image data (if possible).
    - Only applies when neither `fixed` nor `fill` are set.

---

## Usage

### Fixed Size Image

```tsx
<Photo data={photoData} fixed width={300} height={200} />
```

### Fill Mode

```tsx
<Photo data={photoData} fill />
```

### Responsive Image (default: aspect ratio inferred)

```tsx
<Photo
	data={photoData}
	// neither fixed nor fill set
	// aspect ratio will be inferred from data.width / data.height if available
/>
```

### Responsive Image with custom aspect ratio override

```tsx
<Photo
	data={photoData}
	aspectRatio={16 / 9} // Forces 16:9 aspect ratio
/>
```

### Lazy vs. Eager Loading

```tsx
<Photo data={photoData} priority />      // eager load (good for above-the-fold)
<Photo data={photoData} />               // lazy load (default)
```

---

## Example with Craft CMS Data

Suppose your GraphQL/custom API returns an image object under `.heroImage`, you can use it directly:

```tsx
const photoData = data.industries?.[0].heroImage?.[0];

<Photo data={photoData} fixed width={50} height={50} />;
```

Or using fill for full cover:

```tsx
<Photo data={photoData} fill />
```

Or using a custom aspect ratio for a responsive image:

```tsx
<Photo data={photoData} aspectRatio={4 / 3} />
```

Or use the default settings for an aspect-ratio based responsive image:

```tsx
<Photo data={photoData} />
```

---

## Styling

- When `fixed` is set: the container has explicit `width` and `height` in pixels.
- When `fill` is set: the container will take up 100% width and height of its parent.
- Otherwise (default/responsive), the container uses the aspect ratio determined by `aspectRatio` prop (if provided) or falls back to the intrinsic aspect ratio from image data.
- The internal `img` is styled with `object-fit: cover` and absolutely positioned within its container.

---

## Accessibility

- Always supply descriptive `alt` text via `photoData.alt` or `photoData.title`.
- The component emits a warning if required props are missing.

---
