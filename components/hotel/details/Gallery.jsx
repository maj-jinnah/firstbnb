const Gallery = () => {
  return (
    <section className="max-w-7xl mx-auto w-full px-4">
      <div className="grid grid-cols-2 h-[400px]">
        <img src="./assets/images/1.png" className="h-[400px] h-full min-h-full w-full min-w-full object-cover" alt="" />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          <img className="h-full min-h-full w-full min-w-full object-cover" src="./assets/images/2.png" alt="" />
          <img className="h-full min-h-full w-full min-w-full object-cover" src="./assets/images/3.png" alt="" />
          <img className="h-full min-h-full w-full min-w-full object-cover" src="./assets/images/4.png" alt="" />
          <img className="h-full min-h-full w-full min-w-full object-cover" src="./assets/images/5.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
