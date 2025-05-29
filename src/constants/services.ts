export const BASE_URL = import.meta.env.VITE_BASE_URL ?? '';
const adminPreix = 'v1';
export const SERVICE: any = {
    //Auth
    LOGIN: `${adminPreix}/auth/login/`,

    //Dashboard
    PROFILE: `${adminPreix}/testimonials`,

    PRODUCTS: `${adminPreix}/products`,
    CLIENTS: `${adminPreix}/clients/`,
    CLIENTS_CREATE: `${adminPreix}/clients/create`,
    CLIENTS_EDIT: `${adminPreix}/clients/edit`,
    CLIENTS_UPDATE: `${adminPreix}/clients/update`,

    //Others Service
    UPLOAD: `${adminPreix}/imageUplaod`,
};
