'use client'

import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  username: string
  password: string
}

const page = () =>{
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()


  const errorLogin = useState(true);
  
  async function fetchUsers(formData:any): Promise<any> {
    const response = await fetch(
      'http://127.0.0.1:8000/login',
      {
        method:'POST',
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ 
          username: formData.username,
          password: formData.password
        }),
      }
    );
    const data = await response.json();
    return data;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const dataReceived = await fetchUsers(data);
      console.log(dataReceived)
      // setUsers(data);
    } catch (error) {
      // setError(error.message);
    }
  } 

  return(
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  OTB Miraflores
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
                        <input 
                          {...register("username", {required:true})}
                          // type="text" 
                          // name="username" 
                          // id="email" 
                          defaultValue={"admin"}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nombre.apellido" 
                        />
                        {errors.username && <span>Debes ingresar tu nombre de usuario</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input
                          {...register("password", {required:true})}
                          type="password" 
                          // name="password" 
                          // id="password" 
                          placeholder="•••••••••••••••••••" 
                          defaultValue={"admin"}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          // required
                        />
                        {errors.password && <span>Debes ingresar la contraseña</span>}
                    </div>
                    <button type="submit" className="w-full bg-slate-500 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar Sesión</button>
                    { errorLogin?
                      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error! </span>Usuario o Contraseña inválido(s).
                      </div>:<></>
                    }
                </form>
            </div>
        </div>
    </div>
  </section>);
}

export default page;