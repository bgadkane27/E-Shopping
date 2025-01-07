import { ChevronLeftIcon, ChevronRightIcon, ShirtIcon } from "lucide-react";
import bannerOne from "../../assets/slide1.webp"
import bannerTwo from "../../assets/slide2.webp"
import bannerThree from "../../assets/slide3.webp"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
function ShopHome() {

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 5000);
        return () => clearInterval(interval);
    })

    const slides = [bannerOne, bannerTwo, bannerThree];
    const categoriesWithIcon = [
        { id: "men", label: "Men", icon: ShirtIcon },
        { id: "women", label: "Women", icon: ShirtIcon },
        { id: "kids", label: "Kids", icon: ShirtIcon },
        { id: "footwear", label: "Footwear", icon: ShirtIcon },
        { id: "electronics", label: "Electronics", icon: ShirtIcon },
    ]

    const brandWithIcon = [
        { id: "adidas", label: "Adidas", icon: ShirtIcon },
        { id: "nike", label: "Nike", icon: ShirtIcon },
        { id: "puma", label: "Puma", icon: ShirtIcon },
        { id: "asics", label: "Asics", icon: ShirtIcon },
        { id: "reebok", label: "Reebok", icon: ShirtIcon }
    ]

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[500px] overflow-hidden">
                {
                    slides.map((slide, index) => (
                        <img
                            key={index}
                            src={slide}
                            alt={`Slide ${index + 1}`}
                            className={`${index === currentSlide ? "opacity-100" : "opacity-0"} w-full h-full rounded-md object-cover top-0 left-0 absolute transition-opacity duration-1000`}
                        />
                    ))
                }
                <Button varient="outline" 
                size="icon" 
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </Button>
                <Button varient="outline" 
                size="icon" 
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </Button>
            </div>
            <section className="py-2 px-4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Shop By Category</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        categoriesWithIcon.map((category) => (
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-500">
                                <CardContent className="flex flex-col items-center justify-evenly p-6 gap-2">
                                    <category.icon className="w-6 h-6 text-pink-500" />
                                    <span className="text-lg font-semibold">{category.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>
            <section className="py-2 px-4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Shop By Brand</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        brandWithIcon.map((brand) => (
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-500">
                                <CardContent className="flex flex-col items-center justify-evenly p-6 gap-2">
                                    <brand.icon className="w-6 h-6 text-pink-500" />
                                    <span className="text-lg font-semibold">{brand.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ShopHome;