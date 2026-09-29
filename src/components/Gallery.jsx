import work from "../assets/work.jpg";
import work1 from "../assets/work1.jpg";
import work2 from "../assets/work2.jpg";
import work3 from "../assets/work3.jpg";
import work4 from "../assets/work4.jpg";
import work5 from "../assets/work5.jpg";
import work6 from "../assets/work6.jpg";
import work7 from "../assets/work7.jpg";
function Gallery() {
  const works = [work, work1, work2, work3, work4, work5, work6, work7];

  return (
    <section id="gallery" className="gallery">
      <h2>Мої роботи</h2>
      <div className="gallery-grid">
        {works.map((photo, index) => (
          <div className="gallery-item" key={index}>
            <img src={photo} alt={`Манікюр ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default Gallery;
