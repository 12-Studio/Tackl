// Imports
// ------------

// Exports
// ------------
export type DatoVideoData = {
	muxPlaybackId?: string;
	streamingUrl?: string;
	mp4High?: string;
	mp4Med?: string;
	mp4Low?: string;
	width?: number;
	height?: number;
	blurUpThumb?: string;
};

export type MobileVideoProps = {
	/** DatoCMS/Mux video object for VideoPlayer (preferred) */
	data?: DatoVideoData | null;
	/** Fallback URL for native video when data is unavailable */
	src?: string;
	onReady: () => void;
	isModalOpen: boolean;
};
