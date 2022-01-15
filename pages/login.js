import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router'
import e from 'cors';

export default function App() {
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const router = useRouter()
    const onSubmit = async (data) => {
        axios.post('/api/login', data ).then(
            r => { localStorage.setItem("token", r.data.token); console.log(r); router.push("/")}
        ).catch(e =>{console.log(e);})
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            password<input type="password" name="password" ref={register({ required: true })} /> <br />
            {errors.password && 'Password is required.'}
            <input type="submit" />
        </form>
    );
}