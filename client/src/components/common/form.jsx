import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {
  function renderInputByComponentType(getControlitem) {
    let element = null;

    const value = formData[getControlitem.name] || ''

    function handleInputChange(event){
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
            value={value}
            onChange={handleInputChange}
          ></Textarea>
        );
        break;

      default:
        element = (
          <Input
            name={getControlitem.name}
            id={getControlitem.name}
            placeholder={getControlitem.placeholder}
            type={getControlitem.type}
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
            <Label className="text-gray-600 text-sm">{controlitem.label}</Label>
            {renderInputByComponentType(controlitem)}
          </div>
        ))}
      </div>
      <button type="submit" className="flex w-full mt-6 justify-center text-white">{ buttonText || "Submit"}</button>
    </form>
  );
}

export default CommonForm   