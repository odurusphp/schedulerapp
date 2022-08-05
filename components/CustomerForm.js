import formData from "../resources/forms/CheckCustomer.json";
//import formData from "../resources/forms/newform.json";
import {
  getButton,
  getCheckbox,
  getText,
  getRadio,
  getTextInput,
  getDropdown,
  getSingleButton,
} from "../helpers/formhelpers";

export default function CustomerForm({ closeBox }) {
  const renderTextComponent = (
    dataType,
    label,
    type,
    id,
    key,
    values,
    text,
    disabled
  ) => {
    if (dataType === "textfield") {
      return getTextInput(label, type, id, key, disabled);
    }
    if (dataType === "number") {
      return getTextInput(label, type, id, key);
    }
    if (dataType === "checkbox") {
      return getCheckbox(label, type, id, key);
    }
    if (dataType === "select") {
      return getDropdown(label, id, key, values);
    }
    if (dataType === "radio") {
      return getRadio(label, type, values);
    }

    if (dataType === "text") {
      return getText(text);
    }
  };

  const renderButton = () => {
    const textdata = formData.components;
    const buttonData = textdata.filter((data) => data.type === "button");
    return (
      <div className="grid grid-cols-2">
        {buttonData.map((data) => (
          <div className="col-span-1">
            {getSingleButton(data.label, data.type, data.id, data.key)}
          </div>
        ))}
      </div>
    );
  };

  console.log("formdata", formData.components);

  return (
    <>
      <p className="text-end">
        <button
          className="bg-gray-200 p-1.5 rounded-lg"
          onClick={() => closeBox()}
        >
          Close
        </button>
      </p>

      {formData.components.map((data) => (
        <div>
          {renderTextComponent(
            data.type,
            data.label,
            data.type,
            data.id,
            data.key,
            data.values,
            data.text,
            data.disabled
          )}
        </div>
      ))}

      <div className="mt-4">{renderButton()}</div>
    </>
  );
}
