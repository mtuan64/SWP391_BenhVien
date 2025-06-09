export const generateImgPath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

export const clientData =  [
    {
        "clientImage": generateImgPath("assets/images/client/client-1.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-2.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-3.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-4.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-5.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-1.webp")
    },
    {
        "clientImage": generateImgPath("assets/images/client/client-2.webp")
    },
    {
        "clientImage": "assets/images/client/client-3.webp"
    }
]