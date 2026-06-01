/**
 * Studio root layout — separate from the website. No theme, header, or global site CSS.
 */
const StudioRootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body style={{ margin: 0 }} suppressHydrationWarning>
				{children}
			</body>
		</html>
	);
};

StudioRootLayout.displayName = 'StudioRootLayout';
export default StudioRootLayout;
