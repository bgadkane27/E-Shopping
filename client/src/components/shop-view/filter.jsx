import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filters, handleFilter}) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-md font-semibold">Filters</h2>
            </div>
            <div className="p-4 space-y-2">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-sm font-medium">{keyItem}</h3>
                            <Separator/>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option)=> <Label className="flex items-center gap-2 font-normal" key={option.id}>
                                    <Checkbox onCheckedChange={() => handleFilter(keyItem, option.id) }/>{option.label}
                                </Label>)}
                            </div>
                        </div>
                        <Separator/>    
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
