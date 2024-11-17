import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

function CommonForm({formControls, formData, setFormData, onSubmit, buttonText}) {
  function renderInputByComponentType(getControlitem) {
    const element = null;

    const value = formData[getControlitem.name] || ''

    function handleInputChange(event){
        event.preventDefault();
        setFormData({
            ...formData,
            [getControlitem.name]: event.target.value,
          });
    }

    switch (getControlitem.contentType) {
      case "input":
        element = (
          <Input
            name={getControlitem.name}
            id={getControlitem.id}
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
          ></Input>
        );
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlitem) => (
          <div className="grid w-full gap-1.5" key={controlitem.name}>
            <Label className="mb-0.5">{controlitem.label}</Label>
            {renderInputByComponentType(controlitem)}
          </div>
        ))}
      </div>
      <button type="submit" className="flex w-full">{ buttonText || "Submit"}</button>
    </form>
  );
}

export default CommonForm   