import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";


function StarRatingComponent({rating, handleRatingChange}) {
    return (
        [1,2,3,4,5].map(star=> <div key={star} className="mr-2"
        // variant="outline" size="icon" 
        // onClick={handleRatingChange ? () => handleRatingChange(star) : null}
        // className={`transition-colors ${star <= rating ? "text-blue-400 hover:bg-pink-400" 
        // : "text-black hover:bg-primary hover:text-primary-foreground"}`}>
        >
            <StarIcon color="orange" size={20} className={`hover:cursor-pointer transition-colors ${star <= rating ? "text-orange-500 fill-orange-500" : ""}`} 
            onClick={handleRatingChange ? () => handleRatingChange(star) : null}/>
        </div>)
    )
}

export default StarRatingComponent;