const capitalizeCategory = (category) => {
    switch (category) {
        case 'facial':
            return 'Facial';
        case 'massage':
            return 'Massage';
        case 'manicure':
            return 'Manicure';
        case 'hair-cut':
            return 'Hair Cut';
        case 'hair-treatment':
            return 'Hair Treatment';
        default:
            return '';
    }
};

export { capitalizeCategory };
