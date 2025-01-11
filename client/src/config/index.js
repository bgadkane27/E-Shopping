
export const registerFormControls = [
  {
    name: "username",
    componentType: "input",
    type: "text",
    label: "Full Name",
    placeholder: "Enter a full name",
    required: true,
    maxLength: 240

  },
  {
    name: "email",
    componentType: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter an email id",
    required: true,
    maxLength: 64
  },
  {
    name: "password",
    componentType: "input",
    type: "password",
    label: "Password",
    placeholder: "Enter a password",
    required: true,
    maxLength: 64
  }
];

export const loginFormControls = [
  {
    name: "email",
    componentType: "input",
    type: "email",
    label: "Email",
    placeholder: "Enter an email id",
    required: true,
    maxLength: 64
  },
  {
    name: "password",
    componentType: "input",
    type: "password",
    label: "Password",
    placeholder: "Enter a password",
    required: true,
    maxLength: 64
  }
];

export const addProductFormControls = [
  {
    label: "Product Name",
    name: "name",
    componentType: "input",
    type: "text",    
    placeholder: "Enter product name",
    required: true,
    maxLength: 240
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",    
    placeholder: "Enter product description",
    required: true,
    maxLength: 240
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
    placeholder: "Enter product price",
    required: true,
    pattern: "^[0-9]+(\.[0-9]{1,2})?$",
    minLength: 1,
    maxLength: 5,
  },
  {
    label: "Sales Price",
    name: "salesPrice",
    componentType: "input",
    type: "text",   
    placeholder: "Enter product sales price",
    required: true,
    pattern: "^[0-9]+(\.[0-9]{1,2})?$",
    minLength: 1,
    maxLength: 5,
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "text",     
    placeholder: "Enter product total stock",
    required: true,
    pattern: "^[0-9]+$",
    minLength: 1,
    maxLength: 5
  }
];

export const addressFormControls = [
  {
    name: "address",
    label: "Address",
    componentType: "input", 
    type: "text",   
    placeholder: "Enter address",
    required: true,
    maxLength: 240
  },
  {
    name: "landmark",
    label: "Landmark",
    componentType: "input", 
    type: "text",   
    placeholder: "E.g. Near public school",
    maxLength: 240
  },
  {
    name: "city",
    label: "Town/City",
    componentType: "input",
    type: "text",
    placeholder: "Enter Town/City",
    required: true,
    maxLength: 48
  },
  {
    name: "pincode",
    label: "Pincode",
    componentType: "input",
    type: "text",    
    placeholder: "Enter 6 digit pincode",
    required: true,
    pattern: "^[0-9]{6}$",
    maxLength: 6
  },
  {
    name: "phone",
    label: "Mobile Number",
    componentType: "input",
    type: "text",    
    placeholder: "Enter 10 digit mobile number",
    required: true,
    pattern: "^[0-9]{10,15}$",
    minLength: 10,
    maxLength: 15
  },
  {
    name: "notes",
    label: "Notes",
    componentType: "textarea",    
    placeholder: "Enter notes(Optional)",
    maxLength: 24
  },
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

export const categoryOptions = {
  men : "Men",
  women : "Women",  
  kids : "Kids",
  accessories : "Accessories",
  footwear : "Footwear",
  electronics : "Electronics",
  others : "Others"
}
export const brandOptions = {
  adidas : "Adidas",
  nike : "Nike",  
  puma : "Puma",
  reebok : "Reebok",
  converse : "Converse",
  asics : "Asics",
  others : "Others"
}

export const filterOptions = {
  category: [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'electronics', label: 'Electronics' },
    {id: 'others', label: 'Others'}
  ],
  brand: [
    { id: 'adidas', label: 'Adidas' },
    { id: 'nike', label: 'Nike' },
    { id: 'puma', label: 'Puma' },
    { id: 'converse', label: 'Converse' },
    { id: 'asics', label: 'Asics' },
    { id: 'reebok', label: 'Reebok' },
    { id: 'others', label: 'Others' },
  ],
};

export const sortOptions= [
  {
    id: "asc",
    label: "Price: Low to High"
  },
  {
    id: "desc",
    label: "Price: High to Low"
  },
  {
    id:"atoz",
    label: "Name: A to Z"
  },
  {
    id:"ztoa",
    label: "Name: Z to A"
  }
];
