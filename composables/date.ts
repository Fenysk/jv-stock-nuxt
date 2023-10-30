export const useDate = () => {
    function formattedReverseDate(date) {
        const now = new Date();
        const diff = now - new Date(date);

        const minutes = Math.floor(diff / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return `il y a ${months} mois`;
        } else if (days > 0) {
            return `il y a ${days} jours`;
        } else if (hours > 0) {
            return `il y a  ${hours} heures`;
        } else if (minutes > 0) {
            return `il y a ${minutes} minutes`;
        } else {
            return "à l'instant";
        }
    }

    function formattedDate(date) {
        return new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });
    }

    return {
        formattedReverseDate,
        formattedDate,
    };
};
