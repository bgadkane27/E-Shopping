import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
  function renderInputByComponentType(getControlitem) {
    let element = null;

    const value = formData[getControlitem.name] || ''

    function handleInputChange(event) {
      event.preventDefault();
      setFormData({
        ...formData,
        [getControlitem.name]: event.target.value,
      });
    }

    switch (getControlitem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlitem.name}
            id={getControlitem.name}
            placeholder={getControlitem.placeholder}
            type={getControlitem.type}
            required={getControlitem.required || false}
            minLength={getControlitem.minLength || undefined}
            maxLength={getControlitem.maxLength || undefined}
            pattern={getControlitem.pattern || undefined}
            value={value}
            onChange={handleInputChange}
          ></Input>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlitem.name}
            id={getControlitem.name}
            placeholder={getControlitem.placeholder}
            type={getControlitem.type}
            required={getControlitem.required || false}
            maxLength={getControlitem.maxLength || undefined}
            value={value}
            onChange={handleInputChange}
          ></Textarea>
        );
        break;

      case "select":
        element = (
          <Select value={value} onValueChange={(value) => setFormData({
            ...formData, [getControlitem.name]: value,
          })}>
            <SelectTrigger className="w-full text-gray-600">
              <SelectValue placeholder={getControlitem.placeholder}/>
            </SelectTrigger>
            <SelectContent>
              {getControlitem.options && getControlitem.options.length > 0
                ? getControlitem.options.map((optionitem) =>
                  <SelectItem key={optionitem.id} value={optionitem.id}>{optionitem.label}</SelectItem>
                ) : null}
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Input
            name={getControlitem.name}
            id={getControlitem.name}
            placeholder={getControlitem.placeholder}
            type={getControlitem.type}
            required={getControlitem.required || false}
            minLength={getControlitem.minLength || undefined} 
            maxLength={getControlitem.maxLength || undefined}
            pattern={getControlitem.pattern || undefined}
            value={value}
            onChange={handleInputChange}
          ></Input>
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlitem) => (
          <div className="grid w-full gap-0.5" key={controlitem.name}>
            <Label className="text-gray-600 text-sm">
              {controlitem.label}{" "}
              {controlitem.required && <span className="text-red-500">*</span>}
            </Label>
            {renderInputByComponentType(controlitem)}
          </div>
        ))}
      </div>
      <button disabled={isBtnDisabled} type="submit" className={`flex w-full mt-6 justify-center text-white ${
    isBtnDisabled
      ? "bg-gray-700 cursor-not-allowed"
      : "bg-blue-800 hover:bg-blue-700 focus:bg-blue-700 focus-visible:bg-blue-700"
  }`}>{buttonText || "Submit"}</button>
    </form>
  );
}

export default CommonForm   