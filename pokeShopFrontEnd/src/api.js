export async function registerUser({username, password}) {
    try {
      let response = await fetch('https://pokefeud-backend.onrender.com/api/users/register', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password
      }
    })
  }) 
  let result = await response.json()
    return result
    } catch(err){
      console.error(err)
    }
  }