import React from "react";

export default function RepeatingGroup({
  title,
  items,
  blank,
  onChange,
  render,
  addLabel = "Add another",
}) {
  function updateItem(index, next) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  function removeItem(index) {
    onChange(items.filter((_, idx) => idx !== index));
  }

  function addItem() {
    // Create a new object so different entries don't share references.
    const newItem = {
      ...blank,
      bullets: blank.bullets ? [...blank.bullets] : undefined,
    };

    onChange([...items, newItem]);
  }

  return (
    <div className="repeating-group">
      {title && <h3 className="repeating-group-title">{title}</h3>}

      <div className="repeating-items">
        {items.map((item, index) => (
          <div className="repeating-card" key={index}>
            <div className="repeating-card-header">
              <div>
                <span className="repeating-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="repeating-entry-title">
                  {title
                    ? `${title} ${index + 1}`
                    : `Entry ${index + 1}`}
                </span>
              </div>

              {items.length > 1 && (
                <button
                  type="button"
                  className="repeating-remove-button"
                  onClick={() => removeItem(index)}
                  aria-label={`Remove ${
                    title ? title.toLowerCase() : "entry"
                  } ${index + 1}`}
                >
                  <span>×</span>
                  Remove
                </button>
              )}
            </div>

            <div className="repeating-card-content">
              {render(item, (next) => updateItem(index, next))}
            </div>
          </div>
        ))}
      </div>

      {/* <button
        type="button"
        className="repeating-add-button"
        onClick={addItem}
      >
        <span className="add-icon">＋</span>
        {addLabel}
      </button> */}
    </div>
  );
}