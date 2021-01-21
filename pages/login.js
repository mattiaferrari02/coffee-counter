import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router'

export default function App() {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const router = useRouter()
    const onSubmit = async (data) => {
        axios.post('http://localhost:3000/api/login', data ).then(
            r => { localStorage.setItem("token", r.data.token); console.log(r); router.push("/")}
        ).catch(e =>{console.log(e);})
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            username<input type="email" name="username" ref={register({ required: true })} /> <br />
            password<input type="password" name="password" ref={register({ required: true })} /> <br />
            {errors.password && 'Password is required.'}
            {errors.username && 'Username is required.'}
            <input type="submit" />
        </form>
    );
}