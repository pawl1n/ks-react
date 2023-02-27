import HeroImg from "../assets/hero.png";

const Hero = () => {
  return (
    <section className="h-max bg-hero bg-cover bg-no-repeat bg-center flex">
      <div className="container mx-auto flex justify-around h-full items-center">
        <div className="flex flex-col py-20">
          <h1 className="text-5xl leading-[1.1] font-light text-white">
            <span>Лише оригінальні речі</span>
          </h1>
        </div>
        <div className="ml-auto">
          <img src={HeroImg} alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
