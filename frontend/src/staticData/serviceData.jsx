export const generateImgPath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

export const serviceData = [
    {
        "serviceImage": generateImgPath("assets/images/service/relationship-issue.webp"),
        "serviceIcon": generateImgPath("assets/images/service/knee-replacement.png"),
        "serviceIconAlternate": generateImgPath("assets/images/service/relatioship-issue.svg"),
        "serviceTitle" : "Relationship Issues",
        "serviceCategory": "Knee Surgery",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    },
    {
        "serviceImage": generateImgPath("assets/images/service/bipolor-disorder.webp"),
        "serviceIcon": generateImgPath("assets/images/service/spinal-cord.png"),
        "serviceIconAlternate": generateImgPath("assets/images/service/bipolor-disorder.svg"),
        "serviceTitle" : "Bipolar Disorder",
        "serviceCategory": "spinal CORD",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    },
    {
        "serviceImage": generateImgPath("assets/images/service/Depression.webp"),
        "serviceIcon": generateImgPath("assets/images/service/knee-replacement.png"),
        "serviceIconAlternate": generateImgPath("assets/images/service/depression.svg"),
        "serviceTitle" : "Depression",
        "serviceCategory": "KNEE SURGERY",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    },
    {
        "serviceImage": generateImgPath("assets/images/service/Couple-therapy.webp"),
        "serviceIcon": generateImgPath("assets/images/service/couple-therapy.svg"),
        "serviceIconAlternate": generateImgPath("assets/images/service/depression.svg"),
        "serviceTitle": "Couple Therapy",
        "serviceCategory": "KNEE SURGERY",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    },
    {
        "serviceImage": generateImgPath("assets/images/service/Diagonsis.webp"),
        "serviceIcon": generateImgPath("assets/images/service/diagonsis-1.svg"),
        "serviceIconAlternate": generateImgPath("assets/images/service/depression.svg"),
        "serviceTitle": "diagnosis",
        "serviceCategory": "KNEE SURGERY",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    },
    {
        "serviceImage": generateImgPath("assets/images/service/coronary-heart.webp"),
        "serviceIcon": generateImgPath("assets/images/service/coronary-heart.svg"),
        "serviceIconAlternate": generateImgPath("assets/images/service/depression.svg"),
        "serviceTitle": "coronary heart",
        "serviceCategory": "KNEE SURGERY",
        "serviceDescription": "It is a long established fact that reader will be distracted by the readable content of page",
        "btnUrl": "/service/service-detail"
    }
]