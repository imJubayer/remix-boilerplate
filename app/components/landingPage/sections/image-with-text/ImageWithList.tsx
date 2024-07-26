import { useState } from "react";
import "./imagewithlist.css";

export default function ImageWithList() {
  const [activeItem, setActiveItem] = useState(1);
  const [image, setImage] = useState('image/shop-image.png')
  const [isAnimate, setisAnimate] = useState(false);

  function selecItem(listIndex : number, imgSrc : string){
    setActiveItem(listIndex);
    setImage(imgSrc);
    setisAnimate(true);
    setTimeout(()=>setisAnimate(false), 1000);
  }

  return (
    <section className="image_with_list_section">
      <div className="container">
        <h2 className="heading">
          Streamline Ordering from Search to Fulfillment, All in One Place
        </h2>
        <div className="row align-itmes-center">
          <div className="col-12 col-lg-6">
            <ul className="list">
              <li className={activeItem == 1 ? "main_item" : "item"} onClick={()=>selecItem(1, 'image/shop-image.png')}>
                <div className="imgbox">
                  <img src="image/search.png" alt="" />
                </div>

                <div className="text_box">
                  <h2 className="title">Find the Perfect Match</h2>
                  <p className="pera">
                    Easily find products that match your needs using powerful
                    search tools.
                  </p>
                </div>
              </li>

              <li className={activeItem == 2 ? "main_item" : "item"} onClick={()=>selecItem(2, 'image/shop-image-1.png')}>
                <div className="imgbox">
                  <img src="image/icon-2.png" alt="" />
                </div>
                <h2 className="title">Choose the Right One</h2>
              </li>

              <li className={activeItem == 3 ? "main_item" : "item"} onClick={()=>selecItem(3, 'image/shop-image.png')}>
                <div className="imgbox">
                  <img src="image/icon-2.png" alt="" />
                </div>
                <h2 className="title">Choose the Right One</h2>
              </li>

              <li className={activeItem == 4 ? "main_item" : "item"} onClick={()=>selecItem(4, 'image/shop-image-1.png')}>
                <div className="imgbox">
                  <img src="image/icon-2.png" alt="" />
                </div>
                <h2 className="title">Choose the Right One</h2>
              </li>

              <li className={activeItem == 5 ? "main_item" : "item"} onClick={()=>selecItem(5, 'image/shop-image.png')}>
                <div className="imgbox">
                  <img src="image/icon-2.png" alt="" />
                </div>
                <h2 className="title">Choose the Right One</h2>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-6">
            <div className={`imgbox image_content ${isAnimate && 'animate'}`}>
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
