import React, { useEffect, useState } from "react";

export default function Form() {
  // states of the form
  // 1. init - empty, nothing filled in or selected
  //         - display a selection of categories
  // 2. category was selected
  //         - display a selection of activity types
  // 3. type was selected
  //         - display a form fitting for the current type
  //         - date
  //         - description
  //         - name
  //         - distance, calories
  // 4. form has been submitted
  //         - display a 'loading...' while it is being processed
  //         - display errors if validation fails
  //         - reset form to stage 1 after success

  const [formData, setFormData] = useState({
    category_id: undefined,
    type_id: undefined,
    date: false,
  });

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const loadCategories = async () => {
    const res = await fetch(
      "https://test-api.codingbootcamp.cz/api/f01429a7/health/categories"
    );
    const categoriesData = await res.json();
    setCategories(categoriesData);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // reload the types when the data changes
  useEffect(() => {
    if (formData.category_id) {
      // find the category in categories
      const category = categories.find(
        (category) => category.id == formData.category_id
      );
      // use its types
      setTypes(category.types);
      setFormData({ ...formData, type_id: category.types[0].id });
    } else {
      // if no category is selected, reset types to empty array
      setTypes([]);
      setFormData({ ...formData, type_id: undefined });
    }
  }, [formData.category_id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const url =
      "https://test-api.codingbootcamp.cz/api/f01429a7/health/activities";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const categorySelected = (e) => {
    setFormData({
      ...formData,
      category_id: e.target.value,
    });
  };

  const typeSelected = (e) => {
    setFormData({
      ...formData,
      type_id: e.target.value,
    });
  };

  const dateSelected = (e) => {
    setFormData({
      ...formData,
      date: e.target.value,
    });
  };

  return (
    <>
      <form className="activity-form" onSubmit={submitForm}>
        <label htmlFor="categories">Choose a category</label>
        <select
          name="category_id"
          value={formData.category_id}
          id="categories"
          onChange={categorySelected}
        >
          <option value="">-- Choose a category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {formData.category_id ? (
          <div>
            <label htmlFor="types">Choose activity type</label>
            <select
              name="type_id"
              id="types"
              onChange={typeSelected}
              value={formData.type_id}
            >
              <option value="">-- Choose a type --</option>
              {/* {console.log(categories[formData.category_id - 1].types)} */}
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            type selected is: {formData.type_id}
          </div>
        ) : (
          ""
        )}

        {formData.category_id && formData.type_id ? (
          <>
            <label htmlFor="date">Choose date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={dateSelected}
              value={formData.date}
            />
          </>
        ) : (
          ""
        )}

        {formData.category_id && formData.type_id && formData.date ? (
          <button type="submit">Submit</button>
        ) : (
          ""
        )}
      </form>
    </>
  );
}
