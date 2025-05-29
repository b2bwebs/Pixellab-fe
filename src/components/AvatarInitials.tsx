const AvatarInitials = ({ name = 'Avatar', color = '' }) => {
    const randomColorClasses = ['bg-success', 'bg-primary', 'bg-info', 'bg-danger'];

    const getRandomColorClass = () => {
        return color ? color : randomColorClasses[Math.floor(Math.random() * randomColorClasses.length)];
    };

    const breakTextWhileSpace = (name: string) => {
        const nameParts = name.split(' ');
        if (nameParts.length > 1) {
            return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    return (
        <span
            className={`flex justify-center items-center w-10 h-10 text-center rounded-full object-cover ${getRandomColorClass()} text-white text-2xl`}
        >
            {breakTextWhileSpace(name)}
        </span>
    );
};

export default AvatarInitials;
