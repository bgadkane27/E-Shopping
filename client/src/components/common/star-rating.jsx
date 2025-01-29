import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";


function StarRatingComponent({rating, handleRatingChange}) {
    return (
        [1,2,3,4,5].map(star=> <Button 
        variant="outline" size="icon" 
        onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        className={`transition-colors ${star <= rating ? "text-blue-400 hover:bg-pink-400" 
        : "text-black hover:bg-primary hover:text-primary-foreground"}`}>
            <StarIcon className={`${star <= rating ? "fill-blue-500" : ""}`} />
        </Button>)
    )
}

export default StarRatingComponent;