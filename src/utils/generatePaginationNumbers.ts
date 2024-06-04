//[1,2,3,4,...,7]
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    //Si el # total de paginas es de 7 o menos vamos a mostrar sin números suspensivos...
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1); //[1,2,3,4,5,6,7]
    }

    //Si la página actual esta entre las primeras 3 páginas
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]; //[1,2,3,'...', 49, 50]
    }

    //Si la pagina actual esta entre las ultimas
    //Mostrar las primeras 2 y ultimas 3
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    //Si la pagina actual esta en otro lugar medio
    //Mostrar la primera pagina , ..., pagina actual
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ]

}