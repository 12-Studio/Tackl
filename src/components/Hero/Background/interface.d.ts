// Imports
// ------------

// Exports
// ------------
export type BackgroundProps = {
	sceneId: string;
	video?:
		| {
				muxPlaybackId?: string;
				streamingUrl?: string;
				mp4High?: string;
				mp4Med?: string;
				mp4Low?: string;
				width?: number;
				height?: number;
		  }
		| null;
};
