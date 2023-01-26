import HeroImg from '../assets/hero.png'

const Hero = () => {
    return (
        <section
            className="h-max bg-hero bg-cover bg-no-repeat bg-center flex">
            <div className="container mx-auto flex justify-around h-full">
                <div className="flex py-20">
                    <div>
                        <div>Лише оригінальні речі</div>
                    </div>
                    <h1>Постійні оновення</h1>

                </div>
                <div className="ml-auto">
                    <img src={HeroImg} alt="hero"/>
                </div>
            </div>
        </section>

    );
}

export default Hero;