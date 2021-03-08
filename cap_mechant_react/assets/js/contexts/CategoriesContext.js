import React from 'react';

export default React.createContext({
    categories: [],
    setCategories: (value) => {},
    selectedCategory: {},
    setSelectedCategory: ({}) => {}
});