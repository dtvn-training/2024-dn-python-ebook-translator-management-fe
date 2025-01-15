import { get } from '~/db';
import { toastError } from '~/utils/toastConfig';
import { renderToken } from '~/utils/urlApi';

function Home() {
    const handleAutoRenderToken = async () => {
        try {
            const res = await get(renderToken);
            if (res.status === 200 && res.statusText === 'OK') {
                localStorage.setItem('accessToken', res.data.access_token);
            }
        } catch (error) {
            toastError('Failed to get access token');
        }
    };
    return (
        <h1 className="text-center">
            <button onClick={handleAutoRenderToken}>render token</button>
        </h1>
    );
}

export default Home;
