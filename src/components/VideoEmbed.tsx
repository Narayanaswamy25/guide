
import React from 'react';

interface VideoEmbedProps {
  youtubeId: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ youtubeId }) => {
  return (
    <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0&showinfo=0`}
        title="Curriculum Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
