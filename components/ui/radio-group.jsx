import React from "react";

export const RadioGroup = ({ children, name, onChange, value }) => {
  return (
    <div role="radiogroup">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { name, onChange, checked: child.props.value === value })
      )}
    </div>
  );
};

export const RadioGroupItem = ({ value, name, onChange, checked, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      {label && (
        <label htmlFor={value} className="ml-2 text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};
