const Home = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-5xl aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/3-iaAxBH3_E?autoplay=1&rel=0"
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default Home;
