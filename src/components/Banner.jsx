import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.ibb.co/wh9cst6/Untitled-design-15.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 md:text-2xl font-bold">
            <TypeAnimation
              sequence={[
                "Discover Amazing Tech Products 🚀",
                2000,
                "Share Your Innovations 🌟",
                2000,
                "Upvote Your Favorites 🔥",
                2000,
                "Join the Tech Revolution 🌐",
                2000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </h1>
          <p className="mb-5">
            Welcome to Huntify — your go-to platform for discovering, sharing, and supporting groundbreaking tech products. Be a part of a community that celebrates innovation and connects creators with enthusiasts.  
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default Banner;
