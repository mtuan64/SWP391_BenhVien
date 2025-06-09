export const generateImgPath = (path) => {
    return window.origin + import.meta.env.BASE_URL + path;
};

export const teamData = [
    {
        "teamImage": generateImgPath("assets/images/team/team-1.webp"),
        "teamMemberName": "Gunner Peha",
        "teamSpecialized": "Cardiologist"
    },
    {
        "teamImage": generateImgPath("assets/images/team/team-2.webp"),
        "teamMemberName": "Ayden Leabow",
        "teamSpecialized": "General Surgeon"
    },
    {
        "teamImage": generateImgPath("assets/images/team/team-3.webp"),
        "teamMemberName": "Jennifer Dumont",
        "teamSpecialized": "General Surgeon"
    },
    {
        "teamImage": generateImgPath("assets/images/team/team-4.webp"),
        "teamMemberName": "Damian Melcher",
        "teamSpecialized": "Gynecologist"
    },
    {
        "teamImage": generateImgPath("assets/images/team/team-5.webp"),
        "teamMemberName": "Lewis Scobee",
        "teamSpecialized": "Cardiologist"
    }
]