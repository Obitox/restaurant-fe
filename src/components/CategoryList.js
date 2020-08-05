import React from 'react';

import Category from './Category.js';

function CategoryList({categories, categorySelect}) {
    return (
            categories.map((category) => 
                <Category key={category.categoryId} id={category.categoryId} title={category.title} categorySelect={categorySelect} />
            )
    )
}

export default CategoryList
