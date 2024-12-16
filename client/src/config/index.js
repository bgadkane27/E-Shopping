
export const registerFormControls = [
  {
    name: "username",
    componentType: "input",
    type: "text",
    label: "Username",
    placeholder: "Enter a username "
  },
  {
    name: "email",
    componentType: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter an email id ",
  },
  {
    name: "password",
    componentType: "input",
    type: "password",
    label: "Password",
    placeholder: "Enter a password ",
  }
];

export const loginFormControls = [
  {
    name: "email",
    componentType: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter an email id ",
  },
  {
    name: "password",
    componentType: "input",
    type: "password",
    label: "Password",
    placeholder: "Enter a password ",
  }
];

export const addProductFormControls = [
  {
    label: "Product Name",
    name: "name",
    componentType: "input",
    type: "text",    
    placeholder: "Enter product name"
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",    
    placeholder: "Enter product description"
  },
  {
    label: "Category",
    name: "category",
    componentType:"select",
    placeholder: "Select a category",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "electronics", label: "Electronics" },
      {id: "others", label: "Others"}
    ]
  },
  {
    label: "Brand",
    name: "brand",
    componentType:"select",
    placeholder: "Select a brand",
    options: [
      { id: "adidas", label: "Adidas" },
      { id: "nike", label: "Nike" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" },
      { id: "converse", label: "Converse" },
      { id: "asics", label: "Asics" },
      { id: "others", label: "Others" }
    ]
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "text",    
    placeholder: "Enter product price"
  },
  {
    label: "Sales Price",
    name: "salesPrice",
    componentType: "input",
    type: "text",   
    placeholder: "Enter product sales price"
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "text",     
    placeholder: "Enter product total stock"
  }
];

export const headermenuItems = [
  {
    id: "home",
    label: "Home",
    path: '/shop/home'
  },
  {
    id: "men",
    label: "Men",
    path: '/shop/listing'
  },
  {
    id: "women",
    label: "Women",
    path: '/shop/listing'
  },
  {
    id: "kids",
    label: "Kids",
    path: '/shop/listing'
  },
  {
    id: "accessories",
    label: "Accessories",
    path: '/shop/listing'
  },
  {
    id: "footwear",
    label: "Footwear",
    path: '/shop/listing'
  },
  {
    id: "electronics",
    label: "Electronics",
    path: '/shop/listing'
  }
];