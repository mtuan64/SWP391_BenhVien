export const generateImgPath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

export const tesimonialData = [
    {
        "quoteImage": generateImgPath("assets/images/testimonial/quote.svg"),
        "quoteImagePsychiatrist": generateImgPath("assets/images/testimonial/testimonial-quote.svg"),
        "quoteImageCardiac": generateImgPath("assets/images/testimonial/quote-2.svg"),
        "quoteImageLaboratory": generateImgPath("assets/images/testimonial/quote-lab.svg"),
        "quoteImageOrthopedics": generateImgPath("assets/images/testimonial/quote-ortho.svg"),
        "testimonialImage": generateImgPath("assets/images/testimonial/user-1.webp"),
        "testimonialUser": "Moric Horgon",
        "testimonialMeta": "Patient",
        "testimonialContent": `"You can't go wrong here. I receive the best care and attention. The nursing staff and doctors are amazing and take their time with you. I felt better walking out here every time."`,
        "ratting": "5"
    },
    {
        "quoteImage": generateImgPath("assets/images/testimonial/quote.svg"),
        "quoteImagePsychiatrist": generateImgPath("assets/images/testimonial/testimonial-quote.svg"),
        "quoteImageCardiac": generateImgPath("assets/images/testimonial/quote-2.svg"),
        "quoteImageLaboratory": generateImgPath("assets/images/testimonial/quote-lab.svg"),
        "quoteImageOrthopedics": generateImgPath("assets/images/testimonial/quote-ortho.svg"),
        "testimonialImage": generateImgPath("assets/images/testimonial/user-2.webp"),
        "testimonialUser": "Julia Roberts",
        "testimonialMeta": "Healthcare",
        "testimonialContent": `"Still very professional but a much more relaxed atmosphere. This makes for a more comfortable experience which is helpful in dealing with medical issues."`,
        "ratting": "4"
    },
    {
        "quoteImage": generateImgPath("assets/images/testimonial/quote.svg"),
        "quoteImagePsychiatrist": generateImgPath("assets/images/testimonial/testimonial-quote.svg"),
        "quoteImageCardiac": generateImgPath("assets/images/testimonial/quote-2.svg"),
        "quoteImageLaboratory": generateImgPath("assets/images/testimonial/quote-lab.svg"),
        "quoteImageOrthopedics": generateImgPath("assets/images/testimonial/quote-ortho.svg"),
        "testimonialImage": generateImgPath("assets/images/testimonial/user-3.webp"),
        "testimonialUser": "Jack leo",
        "testimonialMeta": "COO company",
        "testimonialContent": `"It has been very effective, in my opinion. It has made everyone more relaxed in a very comfortable atmosphere. We have always felt like family here, even more so now."`,
        "ratting": "2"
    }
]