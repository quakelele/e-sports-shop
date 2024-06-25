import s from "./Slider.module.scss";
import vector2 from "@assets/Vector2.png";
import { Carousel } from "antd";

export const Slider = () => {
  const contentStyle: React.CSSProperties = {
    height: "580px",
    color: "#fff",
    lineHeight: "360px",
    textAlign: "left",
    background: "#fcfcfd",// все это в стили классы...
  };
  return (
    // <div className={s.SliderWrapper}>

    // </div>
    <div>
      {/* carousel */}
      <Carousel>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className={s.slide}>
              <img src={vector2} alt="" />
              <div className={s.slideText}>
                <h2>Digital items inspired by your shopping trends.</h2>
                <p>
                  Consumers who checked out items in your browsing history also
                  glimpsed at:
                </p>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className={s.slide}>
              <img src={vector2} alt="" />
              <div className={s.slideText}>
                <h2>Digital products influenced by your shopping patterns.</h2>
                <p>
                  Customers who viewed items in your browsing history also
                  viewed.
                </p>
              </div>
            </div>
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            {" "}
            <div className={s.slide}>
              <img src={vector2} alt="" />
              <div className={s.slideText}>
                <h2>Electronic items inspired by your purchasing behaviors.</h2>
                <p>
                  Shoppers who explored products in your browsing history also
                  took a look at:
                </p>
              </div>
            </div>
          </h3>
        </div>
      </Carousel>

      {/* informatiopnBLock */}
    </div>
  );
};

