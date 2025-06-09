export const generateImgPath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

export const productData = [
    {
        "productImage": generateImgPath("assets/images/shop/product-1.webp"),
        "productTitle": "Electric Toothbrush",
        "priceValue": "$123",
        "ratting": "5",
        "productDesc": "An electric toothbrush is a toothbrush that cleans teeth using quick, automatic bristle movements such as rotational oscillation or back-and-forth oscillation. A motor propels objects at or below sonic speeds.",
        "productCategory": "Home Equipment",
        "isNew": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-2.webp"),
        "productTitle": "Medical Box",
        "priceValue": "$92",
        "ratting": "4",
        "productDesc": "A medical box is a collection of tools and supplies used to provide immediate medical care, primarily for treating minor or moderate illnesses and accidents.",
        "productCategory": "Medical Equipment",
        "isSale": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-3.webp"),
        "productTitle": "Hand Sanitizer Bottle",
        "priceValue": "$90",
        "ratting": "5",
        "productDesc": "Sahyog Wellness Hot Water Bottle is healthcare accessory that helps in providing relief from all kinds of muscular pain and provides the best heat therapy for the strained and tired muscles.",
        "productCategory": "Health Care,Physical"
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-4.webp"),
        "productTitle": "Wheel Chair",
        "priceValue": "$89",
        "ratting": "3",
        "productDesc": "A wheelchair is a chair with wheels, used when walking is difficult or impossible due to illness, injury, old age related problems, or disability.",
        "productCategory": "Medical Equipment",
        "isSale": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-5.webp"),
        "productTitle": "Stethoscope",
        "priceValue": "$72",
        "ratting": "5",
        "productDesc": "The stethoscope is an acoustic medical device for auscultation, or listening to internal sounds of an animal or human body.",
        "productCategory": "Medical Equipment",
        "isNew": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-6.webp"),
        "productTitle": "Farma Medicine",
        "priceValue": "$69",
        "ratting": "5",
        "productDesc": "Oral-B was founded by a dentist, and every product is designed with dentists. No wonder it’s the #1 dentist-recommended brand worldwide.",
        "productCategory": "Physical"
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-7.webp"),
        "productTitle": "Handgloves",
        "priceValue": "$55",
        "ratting": "2",
        "productDesc": "A microscopeis an instrument used to see objects that are too small to be seen by the naked eye.",
        "productCategory": "Medical Equipment",
        "isNew": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-8.webp"),
        "productTitle": "Headache Medicine",
        "priceValue": "$46",
        "ratting": "0",
        "productDesc": "An oral irrigator is a home dental care device which uses a stream of high-pressure pulsating water intended to remove plaque and food debris between teeth and below the gum line.",
        "productCategory": "Medical Equipment"
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-9.webp"),
        "productTitle": "Asthma Inhaler",
        "priceValue": "$45",
        "ratting": "4",
        "productDesc": "An inhaler is a device holding a medicine that you take by breathing in (inhaling). Inhalers are the main treatment for asthma.",
        "productCategory": "Health Care",
        "isSale": true
    },
    {
        "productImage": generateImgPath("assets/images/shop/product-10.webp"),
        "productTitle": "Orange Carrot",
        "priceValue": "$41",
        "ratting": "5",
        "productDesc": "The plaque-removing efficacy when using waxed dental floss and three interdental brushes was compared in an intraindividual clinical trial.",
        "productCategory": "Medical Equipment",
        "isNew": true
    }
]