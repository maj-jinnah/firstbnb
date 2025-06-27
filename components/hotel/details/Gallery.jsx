import Image from "next/image";

const Gallery = ({ gallery }) => {
    const galleryImages = [...gallery];
    galleryImages.shift();

    console.log(galleryImages);

    return (
        <section className="max-w-7xl mx-auto w-full px-4">
            <div className="grid grid-cols-2 h-[400px] gap-1">
                <Image
                    src={`${gallery[0]}`}
                    width={400}
                    height={400}
                    className="h-[400px] h-full min-h-full w-full min-w-full object-cover rounded-l-md"
                    alt="Hotels images"
                />

                <div className="grid grid-cols-2 grid-rows-2 gap-1 h-[400px]">
                    {galleryImages.map((image, index) => (
                        <Image
                            key={index}
                            src={`${image}`}
                            width={200}
                            height={200}
                            className={`h-full min-h-full w-full min-w-full object-cover ${
                                index % 2 === 0 ? "" : "rounded-r-md"
                            } `}
                            alt="Hotels images"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
