const apiRoute = "http://localhost:5678/api/";
let worksData = [];
let workIdsSet = new Set(); 

export async function getWorks(clear = false) {
    if (!workIdsSet.size) {
        try {
            const response = await fetch(`${apiRoute}works`);
            const works = await response.json();

            works.forEach((work) => {
                if (!workIdsSet.has(work.id)) {
                    workIdsSet.add(work.id);
                    worksData.push(work);
                } 
            });
        } catch (error) {
            console.error("Error fetching works:", error);
            return;
        }
    }
    return worksData
}

export async function getCategories() {
    try {
        const response = await fetch(`${apiRoute}categories`);
        return await response.json();       
    }      
    catch (error) {
        console.error("Error fetching categories:", error);
    }
}