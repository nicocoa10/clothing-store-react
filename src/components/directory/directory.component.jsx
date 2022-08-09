import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss'

const Directory = ({ categories }) => {

    // console.log(categories)
    return (
        <div className="directory-container">
            {categories.map((category) => (
                <CategoryItem key={category.id} props={category}></CategoryItem>
            ))}
        </div>

    );

}

export default Directory;