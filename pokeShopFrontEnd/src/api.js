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
  console.log(result)
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
