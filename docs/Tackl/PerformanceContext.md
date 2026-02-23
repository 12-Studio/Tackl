# Performance Context

The Performance Context provides performance-related information and user preferences that can be used to optimize the user experience across the application.

## Provider

The `PerformanceProvider` component wraps the application and provides access to performance-related values through the `PerformanceContext`.

## Available Values

The context provides the following values:

### isReducedMotion

- Type: `boolean`
- Description: Indicates if the user has requested reduced motion through their system preferences
- Use case: Disable or reduce animations for accessibility

### isLowPowerMode

- Type: `boolean`
- Description: Detects if the device is in low-power mode
- Use case: Disable resource-intensive animations and effects when battery preservation is important

### devicePixelRatio

- Type: `number`
- Description: The pixel density ratio of the device's screen
- Use case: Serve appropriate image resolutions based on screen density

## Usage Example

```jsx
import { useContext } from 'react';
import { PerformanceContext } from '@parts/Contexts/PerformanceContext';

const MyComponent = () => {
	const { isReducedMotion, isLowPowerMode, devicePixelRatio } =
		useContext(PerformanceContext);

	// Example: Adjust animation based on user preferences
	const animationDuration = isReducedMotion ? '0s' : '0.3s';

	// Example: Disable heavy effects in low-power mode
	const particleCount = isLowPowerMode ? 0 : 100;

	// Example: Choose appropriate image resolution
	const imageQuality = devicePixelRatio > 1 ? 'high' : 'normal';

	return (
		<div style={{ transition: `all ${animationDuration}` }}>
			{/* Component content */}
		</div>
	);
};
```
