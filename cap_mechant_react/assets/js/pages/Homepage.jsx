import React, { useContext, useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductsContext from '../contexts/ProductsContext';
import CategoriesContext from '../contexts/CategoriesContext';
import Select from '../components/forms/Select';

const Homepage = (props) => {

    const { products, navSearch } = useContext(ProductsContext);
    const { categories, selectedCategory, setSelectedCategory } = useContext(CategoriesContext);
    const [displayedProducts, setDisplayedProducts] = useState(products);

    useEffect(() => {
        let productList = products;
        let search = navSearch.toUpperCase().trim();
        if (search.length > 0)
            productList = products.filter(product => product.name.toUpperCase().includes(search) || product.category.name.toUpperCase().includes(search));
        else if (selectedCategory !== undefined && Object.keys(selectedCategory).length > 0 && selectedCategory.name !== "Tous")
            productList = products.filter(product => product.category.id === selectedCategory.id)
        setDisplayedProducts(productList);
    }, [navSearch, products, selectedCategory]);

    const handleChange = ({ currentTarget }) => {
        const newSelection = categories.find(category => parseInt(category.id) === parseInt(currentTarget.value));
        setSelectedCategory(newSelection);
    };

    return (
            <>
                <div className="row pt-5">
                    <div className="col-md-4">
                        <Select className="main-category-selector" name="category" label=" " value={ selectedCategory.id } onChange={ handleChange }>
                            { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
                        </Select>
                    </div>
                </div>
                <div className="row pb-5">
                    { displayedProducts.length === 0 ? <p className="ml-3">Aucun produit à afficher.</p> : displayedProducts.map(product => <ProductCard key={product.id} details={product}/>) }
                </div>
            </>
    );
}
 
export default Homepage;