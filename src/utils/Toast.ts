import toast from 'react-hot-toast';



const Toast = {
    HotTost(type = "success", message = "message") {
        switch (type) {
            case 'success':
                return toast.success(message)
            case 'success-right':
                return toast.success(message, {
                    position: "top-right"
                })
            case 'error':
                return toast.error(message)
            case 'error-right':
                return toast.error(message, {
                    position: "top-right"
                })
            default:
                return toast.success(message)

        }
    }
}

export default Toast;