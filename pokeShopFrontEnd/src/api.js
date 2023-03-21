const API_URL = "https://pokefeud-backend.onrender.com/api/"
export async function registerUser({username, password, email}) {
  try {
    let response = await fetch(`${API_URL}users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password,
          email: email
      })
    }) 
  let result = await response.json()
    return result
    } catch(err){
      console.error(err)
    }
}

export async function loginUser({username, password}) {
  try {
    let response = await fetch(`${API_URL}users/login`, {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
    },
  body: JSON.stringify({
      username: username,
      password: password
  }
  )}) 
let result = await response.json()
  return result
  } catch(err){
    console.error(err)
  }
}

export async function fetchAllProducts(){
  try{
    let response = await fetch(`${API_URL}products`)
    let result = await response.json()

    return result
  } catch(e) {
    console.error(e)
  }
}

export async function createCheckout(products = []){
  try {
    if(!products){
      return ""
    }
    let response = await fetch(`${API_URL}stripe/checkout/`, {
      method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        products
    })
    })
    let result = await response.json()
    return result
  } catch(e) {
    console.error(e)
  }
}

export async function getUserInfo(token){
  try{
    if(!token){
      return ""
    }

    let response = await fetch(`${API_URL}users/me`,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
    let result = await response.json()

    return result
  } catch(e) {
    console.error(e)
  }
}
export async function fetchAllUsers(token) {
  try {
    let response = await fetch(`${API_URL}admin/users`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    let result = await response.json();
    console.log(result)
    return result;
  } catch (error) {
    console.error(error)
  }
}
export async function fetchProductById(productId){
  const response = await fetch(`${API_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};