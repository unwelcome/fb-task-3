export function Helper_SortCardByCategories(data) {
    const categories = new Map();

    for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data[i].categories.length; j++){
            const current_category = data[i].categories[j];

            if(categories.has(current_category)){
                categories.get(current_category).push(data[i]);
            }
            else{
                categories.set(current_category, [data[i]]);
            }
        }
    }

    return categories;
}

export function Helper_GetCurrentDateTimeString() {
    const now = new Date();
  
    const dateString = now.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    const timeString = now.toLocaleTimeString('ru-RU', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  
    return `${dateString} ${timeString}`;
}
