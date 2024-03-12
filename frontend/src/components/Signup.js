import { Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import NameInput from './inputs/NameInput'
import EmailInput from './inputs/EmailInput'
import PasswordInput from './inputs/PasswordInput'
import useAuth from '../hooks/useAuth'

export default function Example() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [authError, setAuthError] = useState([])

  const { setAuth, auth } = useAuth()


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const navigate = useNavigate() // useNavigate instead of useNavigation
  const location = useLocation()
  const path = location.pathname
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    const api = process.env.REACT_APP_API_URL

    try {
      const url = path === '/signup' ? api + '/api/v1/sign-up' : api + '/api/v1/sign-in';
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!res.ok) {
        throw new Error('Failed to sign up'); // Throw error if fetch fails
      }
  
      const data = await res.json();
  
      if (data.validationErrors) {
        console.log(data.validationErrors);
        setAuthError(data.validationErrors);
      } else if (data.message === 'Login successful' || data.message === 'account created') {
        setAuth({ isLoggedIn: true, user: data.user.email, id: data.user.id });
        navigate(from, { replace: true });
  
        // Only clear form data when successful
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (err) {
      console.log(err.message || 'An error has occurred'); // Display error message
    }
  };


  return (
    <>
    {authError.length > 0 && authError.map((error, index) => (
      <div role="alert" className="alert alert-error">
      <svg onClick={() => setAuthError([])} xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span key={index}>{error.msg}</span>    
      </div>
    ) )}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/assets/vector/default-monochrome.svg"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {path === '/login' ? "Sign In" : "Sign Up"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            {path === '/login' ? <></> : <NameInput handleChange={handleChange} value={formData.name} />}

            <EmailInput handleChange={handleChange} value={formData.email} />

            <PasswordInput handleChange={handleChange} value={formData.password} confirmValue={formData.confirmPassword} />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {path === '/signup' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            <div>
              <Link to={'/'}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

  