import { ChevronLeftIcon, ChevronRightIcon, ComponentIcon, DrumIcon, FootprintsIcon, RadiationIcon, ShirtIcon, UserRound, UsersRound } from "lucide-react";
import bannerOne from "../../assets/slide1.webp"
import bannerTwo from "../../assets/slide2.webp"
import bannerThree from "../../assets/slide3.webp"
import bannerFour from "../../assets/slide4.webp"
import bannerFive from "../../assets/slide5.webp"
import bannerSix from "../../assets/slide6.webp"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { getAllShopProducts, getProductDetails } from "@/store/shop/Product-slice";
import ShopProductTile from "@/components/shop-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/Cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shop-view/product-details";

const slides = [bannerOne, bannerTwo, bannerThree, bannerFour, bannerFive, bannerSix];
const categoriesWithIcon = [
    { id: "men", label: "Men", icon: UsersRound },
    { id: "women", label: "Women", icon: ShirtIcon },
    { id: "kids", label: "Kids", icon: DrumIcon },
    { id: "footwear", label: "Footwear", icon: FootprintsIcon },
    { id: "electronics", label: "Electronics", icon: RadiationIcon },
]

const brandWithIcon = [
    { id: "adidas", label: "Adidas", icon: ComponentIcon },
    { id: "nike", label: "Nike", icon: ComponentIcon },
    { id: "puma", label: "Puma", icon: ComponentIcon },
    { id: "asics", label: "Asics", icon: ComponentIcon },
    { id: "reebok", label: "Reebok", icon: ComponentIcon }
]


function ShopHome() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const { productList, productDetails } = useSelector((state) => state.shopProduct);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();

    function handlegetProductDetails(getProductDeatil) {
        dispatch(getProductDetails(getProductDeatil));
      }

    function handleAddtoCart(getCurrentProductID){
        // console.log(getCurrentProductID);
        dispatch(addToCart({userId: user?.id, productId : getCurrentProductID, quantity: 1})).then(data=>{
          if(data?.payload?.sucess){
            dispatch(fetchCartItems(user?.id));
            toast({
              variant: "success",
              duration: 2000,
              title: "Product added to cart successfully.",
            });
          }
        });
      }

    function handleNaviateToListing(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter= {
            [section]: [getCurrentItem.id]
        }
        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    useEffect(() => {
        if (productDetails) {
          setOpenDetailsDialog(true);
        }
      }, [productDetails]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    })

    useEffect(() => {
        dispatch(getAllShopProducts({ filterParams: {}, sortParams: 'asc' }))
    }, [dispatch])

    // console.log("Productlist", productList);

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
            <section className="py-4 px-4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Shop By Category</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        categoriesWithIcon.map((category) => (
                            <Card onClick={() => {handleNaviateToListing(category, "category") }}
                            key={category.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-500">
                                <CardContent className="flex flex-col items-center justify-evenly p-6 gap-2">
                                    <category.icon className="w-6 h-6 text-pink-500" />
                                    <span className="text-lg font-semibold">{category.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>
            <Separator className="bg-pink-300" />
            <section className="py-4 px-4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Shop By Brand</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {
                        brandWithIcon.map((brand) => (
                            <Card onClick={() => {handleNaviateToListing(brand, "brand") }}
                            key={brand.id}
                            className="cursor-pointer hover:shadow-lg transition-shadow duration-500">
                                <CardContent className="flex flex-col items-center justify-evenly p-6 gap-2">
                                    <brand.icon className="w-6 h-6 text-pink-500" />
                                    <span className="text-lg font-semibold">{brand.label}</span>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </section>
            <Separator className="bg-pink-300" />
            <section className="px-4 py-4 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Featured Products</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        productList && productList.length > 0
                            ? productList.slice(0, 4).map((productItem) => (
                                <ShopProductTile 
                                key={productItem.id}
                                product={productItem}
                                handlegetProductDetails={handlegetProductDetails}
                                handleAddtoCart={handleAddtoCart}
                                />
                            ))
                            : null
                    }
                </div>
            </section>
            <ProductDetailsDialog  open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetail={productDetails}/>
        </div>
    )
}

export default ShopHome;