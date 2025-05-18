function formatDate(isoDate){
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-ES",{
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export default formatDate; 