import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from './store';
import { toggleTheme } from './store/themeConfigSlice';
import store from './store';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    }, [dispatch, themeConfig.theme]);

    return (
        <div
            className={`${
                (store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''
            }   collapsible-vertical ltr main-section antialiased relative font-nunito text-sm font-normal`}
        >
            {children}
        </div>
    );
}

export default App;
