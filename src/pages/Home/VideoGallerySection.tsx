import React from "react";
import Container from "../../components/shared/Container";

const VideoGallery: React.FC = () => {
  return (
    <Container className="py-12">
      <div className="flex items-center mb-8">
        <span className="inline-block w-1 h-8 bg-primary rounded mr-4"></span>
        <h2 className="text-3xl font-bold ">
          Videogalereya
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Video Card 1 */}
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg border-t-4 border-blue-600 transition-all duration-300">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/ScMzIvxBSi4"
              title="Video 1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48"
            ></iframe>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Universitet tanishtiruvi</h3>
            <p className="text-gray-500 text-sm">Qisqacha tanishtiruv videosi.</p>
          </div>
        </div>
        {/* Video Card 2 */}
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg border-t-4 border-green-600 transition-all duration-300">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video 2"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48"
            ></iframe>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Talabalar hayoti</h3>
            <p className="text-gray-500 text-sm">Talabalar kundalik hayotidan lavhalar.</p>
          </div>
        </div>
        {/* Video Card 3 */}
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg border-t-4 border-purple-600 transition-all duration-300">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/9bZkp7q19f0"
              title="Video 3"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48"
            ></iframe>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Tadbirlar va marosimlar</h3>
            <p className="text-gray-500 text-sm">Universitetda o‘tkazilgan tadbirlar.</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VideoGallery;