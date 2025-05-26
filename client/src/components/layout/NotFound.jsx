import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col items-center justify-center h-[90dvh]'>
            <h1 className='text-4xl'>404 - Page Not Found</h1>
            <button className='text-2xl' onClick={() => navigate('/home')}>Go to Home</button>
        </div>
    );
};

export default NotFound;
