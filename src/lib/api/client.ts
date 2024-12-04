import axios from "axios"

/*


{
  "first_name": "Alaa",
  "last_name": "Barka",
  "email": "mralaabarka@gmail.com",
  "password": "helloworld!",
  "phone": "54324884"
}
*/
interface REGISTER {
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string
}
interface LOGIN {
  email: string
  password: string
}

interface CODE {
  code: string
}
const register = async (data: REGISTER) => {
  if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.phone
  ) {
    throw new Error("All fields are required")
  }

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/client/register`,
    data
  )
}

const login = async (data: LOGIN) => {
  if (!data.email || !data.password) {
    throw new Error("All fields are required")
  }
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/client/login`,
    data
  )
}

const verify = async (data: CODE, token: string) => {
  if (!token) {
    throw new Error("Token is required")
  }
  if (!data.code) {
    throw new Error("Code is required")
  }

  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND}/client/verify`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export { register, login, verify }
